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
