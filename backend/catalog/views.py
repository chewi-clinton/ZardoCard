from rest_framework import filters, viewsets

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "handle"
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "handle"]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().prefetch_related("categories")
    serializer_class = ProductSerializer
    lookup_field = "handle"
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "handle", "vendor"]

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(categories__handle=category)
        return queryset
