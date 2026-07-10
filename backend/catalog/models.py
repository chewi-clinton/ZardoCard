from django.db import models


class Category(models.Model):
    handle = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    banner_image = models.ImageField(upload_to="banners/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["title"]
        verbose_name_plural = "categories"

    def __str__(self):
        return self.title


class Product(models.Model):
    handle = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    vendor = models.CharField(max_length=255, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    compare_at_price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    variant_count = models.PositiveIntegerField(default=1)
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    categories = models.ManyToManyField(Category, related_name="products", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title
