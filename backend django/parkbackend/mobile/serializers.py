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


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = ProfileUser
        fields = "__all__"

    def create(self, validated_data):
        """
        Make necessary modifications as per your requirements
        """
        user_data = validated_data.pop("user")
        print(validated_data)
        user = UserSerializer.create(UserSerializer(), user_data)
        profile = ProfileUser.objects.create(user=user)
        return profile
