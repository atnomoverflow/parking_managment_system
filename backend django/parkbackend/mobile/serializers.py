from rest_framework import serializers
from .models import Car, User, ProfileUser


class CarSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Car
        fields = ["matricule", "model", "mark", "owner"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
        )
        return user


class RegisterSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = ProfileUser
        fields = "__all__"

    def create(self, validated_data):
        """
        Make necessary modifications as per your requirements
        """
        user_data = validated_data.pop("user")
        user = UserSerializer.create(UserSerializer(), user_data)
        profile = ProfileUser.objects.create(user=user)
        return profile


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = ProfileUser
        fields = "__all__"
