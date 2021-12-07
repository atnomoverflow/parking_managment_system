from rest_framework import serializers
from .models import Car, User, ProfileUser, Reservation
import datetime


class CarSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Car
        fields = ["matricule", "model", "mark", "owner","id"]
        extra_kwargs = {'id': {'read_only': True}}



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


class ReservationSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = "__all__"

    # Additional custom validator for start_date / finish_date fields
    def clean(self):
        data = self.cleaned_data
        start_date = data["start_date"]
        finish_date = data["finish_date"]

        if start_date > finish_date:
            raise serializers.ValidationError("Wrong start and finish dates.")

        if start_date < datetime.date.today():
            raise serializers.ValidationError("Start date in the past.")

        return data


class ChangeUserProfileSerializer(serializers.Serializer):
    model = User
    """
    Serializer for password change endpoint.
    """
    password = serializers.CharField()
    email = serializers.EmailField()
    username = serializers.CharField()
