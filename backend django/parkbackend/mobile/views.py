from rest_framework import viewsets, generics
from .models import Car, ProfileUser
from .serializers import (
    CarSerializer,
    RegisterSerializer,
    UserProfileSerializer,
)
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class CarViewSet(viewsets.ModelViewSet):

    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": RegisterSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "message": (
                    "User Created Successfully!. ",
                    " Now perform Login to get your token",
                ),
            }
        )


class Userdetail(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return ProfileUser.objects.get(user=self.request.user)
