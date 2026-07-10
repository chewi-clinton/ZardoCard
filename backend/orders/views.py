from rest_framework import filters, viewsets

from .models import Order
from .serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().prefetch_related("items")
    serializer_class = OrderSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["order_number", "customer_name", "customer_email"]
