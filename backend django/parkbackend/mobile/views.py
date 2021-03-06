from rest_framework import status, viewsets, generics
from .models import Car, ProfileUser, Reservation, User
from .serializers import (
    CarSerializer,
    RegisterSerializer,
    UserProfileSerializer,
    ChangeUserProfileSerializer,
    HasReservationSerializer,
)
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from .serializers import ReservationSerialzer
from web3 import Web3
import json
from datetime import datetime
import os.path
from rest_framework_api_key.permissions import HasAPIKey
from django.core.exceptions import ObjectDoesNotExist


data_folder = os.path.join(
    "D:/projet blockchain/parking_managment_system/smart contract/build/contracts",
    "ParkingLogs.json",
)


url = "https://ropsten.infura.io/v3/651599aa86d444b1b0808d31a98a916a"
private_key = (
    "287f0d46bb54e5d8f3b0bd47947d74e441f0be65713ca75b95f9660e026ac6a0"
)
public_key = "0x9F26005108Ae77D4C59f484Ebc07D45450F4cebE"
jsonFile = open(data_folder)
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
        print(user_id)
        logs = self.get_logs_of_user(user_id)
        responce = []
        for log in logs:
            responce.append(
                {"id":log[0],"date": datetime.fromtimestamp(log[1]), "action": log[2]}
            )
        print(responce)
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
    serializer_class = ReservationSerialzer
    
    def post(self, request):
        reservation_form = ReservationSerialzer(data=request.data, context={'request': request})
        reservation_form.is_valid()
        print(reservation_form.errors)
        reservation_form.is_valid(raise_exception=True)
        start_date = request.data.get("start_date")
        finish_date = request.data.get("finish_date")
        parking_space_number = request.data.get(
            "parking_space_number"
        )
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
            success  = False
        else:
            msg = "Reservation taken."
            reservation_form.save()
            success = True
        print(msg)    
        return Response(
            {"message": msg, "form": reservation_form.data, "success" : success},
        )


class ReservationsListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class = ReservationSerialzer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Reservation.objects.filter(owner=user)


class HasReservation(generics.GenericAPIView):
    permission_classes = [HasAPIKey]
    serializer_class = HasReservationSerializer

    def get(self, request):
        serializer = HasReservationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            car = Car.objects.get(matricule=serializer.data.get("matricule"))
            reservation = Reservation.objects.filter(owner=car.owner)
            now = datetime.datetime.now()
            if reservation.start_date <= now < reservation.end_date:
                return Response(
                    {
                        "status": "success",
                    }
                )
            return Response(
                {
                    "status": "fail",
                }
            )
        except ObjectDoesNotExist:
            return Response(
                {
                    "status": "fail",
                }
            )


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
        serializer.is_valid()
        print(serializer.data)
        serializer.is_valid(raise_exception=True)
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
