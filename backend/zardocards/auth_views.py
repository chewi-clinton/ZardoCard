from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

User = get_user_model()


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Logs in with email + password instead of username + password.

    SimpleJWT's username_field stays "username" internally (that's what
    Django's auth backend expects), we just swap the client-facing field
    to "email" and resolve it to the real username before validating.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        del self.fields[self.username_field]
        self.fields["email"] = serializers.EmailField()

    def validate(self, attrs):
        email = attrs.pop("email")
        user = User.objects.filter(email__iexact=email).first()
        if user is None:
            raise serializers.ValidationError(
                {"detail": "No account found with that email."}
            )
        attrs[self.username_field] = user.get_username()
        return super().validate(attrs)


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer
