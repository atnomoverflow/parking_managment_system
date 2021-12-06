from rest_framework import serializers, viewsets, generics
from .models import Car, ProfileUser, Reservation, User
from .serializers import (
    CarSerializer,
    RegisterSerializer,
    UserProfileSerializer,
    ChangeUserProfileSerializer,
)
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.views import View
from django.db.models import Q
from .serializers import ReservationSerialzer
from web3 import Web3
import json
from datetime import datetime
from rest_framework import status


url = "https://ropsten.infura.io/v3/651599aa86d444b1b0808d31a98a916a"
private_key = (
    "287f0d46bb54e5d8f3b0bd47947d74e441f0be65713ca75b95f9660e026ac6a0"
)
public_key = "0x9F26005108Ae77D4C59f484Ebc07D45450F4cebE"
jsonFile = open(
    "/home/atnomoverflow/Desktop/blockchain_parking_loat/smart contract/build/contracts/ParkingLogs.json"
)
abi = json.load(jsonFile)
web3 = Web3(Web3.HTTPProvider(url))
address = web3.toChecksumAddress("0xDE51c072918dBaF3912EB12eA34d8758e01ace4d")
contract = web3.eth.contract(address=address, abi=abi["abi"])

"""
def checkIn(user_id):
    try:
        nonce = web3.eth.getTransactionCount(public_key)
        tx = contract.functions.checkOn(user_id).buildTransaction(
            {
                "chainId": 3,
                "gas": 3000000,
                "gasPrice": web3.toWei("40", "gwei"),
                "nonce": nonce,
            }
        )
        signed_tx = web3.eth.account.signTransaction(tx, private_key)
        tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
        web3.eth.waitForTransactionReceipt(tx_hash)
        return True
    except Exception():
        return False


def checkOut(user_id):
    try:
        nonce = web3.eth.getTransactionCount(public_key)
        tx = contract.functions.checkOut(user_id).buildTransaction(
            {
                "chainId": 3,
                "gas": 3000000,
                "gasPrice": web3.toWei("40", "gwei"),
                "nonce": nonce,
            }
        )
        signed_tx = web3.eth.account.signTransaction(tx, private_key)
        tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
        web3.eth.waitForTransactionReceipt(tx_hash)
        return True
    except Exception():
        return False
"""


class GetLogsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = str(request.user.id)
        logs = self.get_logs_of_user(user_id)
        responce = {}
        for log in logs:
            responce.update(
                {"date": datetime.fromtimestamp(log[1]), "action": log[2]}
            )
        return Response(responce)

    def get_logs_of_user(self, user_id):
        logs_count = contract.functions.getCarLogsCount(str(user_id)).call()
        logs = [
            contract.functions.getCarLogs(str(user_id), index).call()
            for index in range(logs_count)
        ]
        return logs


class CarViewSet(viewsets.ModelViewSet):
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Car.objects.filter(owner=user)


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


class ReservationView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        reservation_form = ReservationSerialzer(data=request.data)
        reservation_form.is_valid(raise_exception=True)
        start_date = reservation_form.cleaned_data["start_date"]
        finish_date = reservation_form.cleaned_data["finish_date"]
        parking_space_number = reservation_form.cleaned_data[
            "parking_space_number"
        ]
        if Reservation.objects.filter(
            Q(
                parking_space_number=parking_space_number,
                start_date__range=[start_date, finish_date],
            )
            | Q(
                parking_space_number=parking_space_number,
                finish_date__range=[start_date, finish_date],
            )
        ).exists():
            msg = "Dates overlaps. Try other dates and / or parking space."
        else:
            msg = "Reservation taken."
            reservation_form.save()
        return Response(
            {"message": msg, "form": reservation_form},
        )


class ReservationsListView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializers = ReservationSerialzer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Reservation.objects.filter(oner=user)


class ChangeProfileView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangeUserProfileSerializer
    model = User

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # set_password also hashes the password that the user will get
        self.object.set_password(serializer.data.get("password"))
        self.object.username = serializer.data.get("username")
        self.object.email = serializer.data.get("email")
        self.object.save()
        response = {
            "status": "success",
            "code": status.HTTP_200_OK,
            "message": "Profile updated successfully",
            "data": [],
        }
        return Response(response)
