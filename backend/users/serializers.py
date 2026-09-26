from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    fullName = serializers.CharField(source="first_name", write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ["email", "password", "fullName"]

    def validate_email(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        email = validated_data.pop("email")
        first_name = validated_data.pop("first_name", "")
        user = User(username=email, email=email, first_name=first_name)
        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "date_joined"]
