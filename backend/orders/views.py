from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Order
from .serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().prefetch_related("items")
    serializer_class = OrderSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["order_number", "customer_name", "customer_email"]

    def get_permissions(self):
        # Anyone can place an order (guest checkout) or look one up by
        # number + email. Listing/reading/editing orders in general is
        # admin-only — orders contain customer names, emails, and totals.
        if self.action in ("create", "lookup"):
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=False, methods=["get"])
    def lookup(self, request):
        order_number = request.query_params.get("order_number", "").strip()
        email = request.query_params.get("email", "").strip()
        if not order_number or not email:
            return Response(
                {"detail": "order_number and email are both required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        order = Order.objects.filter(
            order_number__iexact=order_number, customer_email__iexact=email
        ).first()
        if not order:
            return Response(
                {"detail": "No order found matching that order number and email."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(OrderSerializer(order).data)
