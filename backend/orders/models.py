from django.db import models

from catalog.models import Product


class Order(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        PAID = "paid", "Paid"
        FULFILLED = "fulfilled", "Fulfilled"
        CANCELLED = "cancelled", "Cancelled"

    class PaymentMethod(models.TextChoices):
        ZELLE = "zelle", "Zelle"
        CHIME = "chime", "Chime"
        APPLE_PAY = "apple_pay", "Apple Pay"
        CASH_APP = "cash_app", "Cash App"
        E_TRANSFER = "e_transfer", "E-Transfer"
        VENMO = "venmo", "Venmo"
        CRYPTO = "crypto", "Crypto"

    order_number = models.CharField(max_length=32, unique=True)
    customer_name = models.CharField(max_length=255)
    customer_email = models.EmailField()
    phone = models.CharField(max_length=32, blank=True)
    address_line1 = models.CharField(max_length=255, blank=True)
    address_line2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    zip_code = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, blank=True)
    payment_method = models.CharField(max_length=20, choices=PaymentMethod.choices)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.order_number


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, related_name="order_items", on_delete=models.SET_NULL, null=True
    )
    product_title = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product_title}"
