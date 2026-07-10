from rest_framework import serializers

from .models import Category, Product


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
            "variant_count",
            "image",
            "categories",
            "created_at",
            "updated_at",
        ]
