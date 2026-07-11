from decimal import Decimal

from rest_framework import serializers

from .models import Category, Product

DISCOUNT_THRESHOLD = Decimal("200")
DISCOUNT_MULTIPLIER = Decimal("0.4")


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(source="products.count", read_only=True)

    class Meta:
        model = Category
        fields = [
            "id",
            "handle",
            "title",
            "description",
            "banner_image",
            "product_count",
            "created_at",
            "updated_at",
        ]


class ProductSerializer(serializers.ModelSerializer):
    categories = serializers.SlugRelatedField(
        slug_field="handle", queryset=Category.objects.all(), many=True, required=False
    )
    # `price`/`compare_at_price` are the true stored values (what admin
    # reads and writes). `display_price`/`display_compare_at_price` are
    # what the storefront should show: products stored above $200 are
    # discounted to 40% of that price, with the real price shown as the
    # compare-at price — the same rule the frontend applies to its
    # static data, mirrored here so it's authoritative once the
    # storefront is wired to this API.
    display_price = serializers.SerializerMethodField()
    display_compare_at_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "handle",
            "title",
            "description",
            "vendor",
            "price",
            "compare_at_price",
            "display_price",
            "display_compare_at_price",
            "variant_count",
            "image",
            "categories",
            "created_at",
            "updated_at",
        ]

    def get_display_price(self, obj):
        if obj.price and obj.price > DISCOUNT_THRESHOLD:
            return str((obj.price * DISCOUNT_MULTIPLIER).quantize(Decimal("0.01")))
        return str(obj.price)

    def get_display_compare_at_price(self, obj):
        if obj.price and obj.price > DISCOUNT_THRESHOLD:
            return str(obj.price)
        return str(obj.compare_at_price) if obj.compare_at_price else None
