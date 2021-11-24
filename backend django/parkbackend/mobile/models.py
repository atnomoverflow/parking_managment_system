from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser

# Create your models here.


class ProfileUser(models.Model):
    pass


class User(AbstractBaseUser):
    user_detail = models.ForeignKey(ProfileUser, on_delete=models.CASCADE)


class Car(models.Model):

    matricule = models.CharField(max_length=50)
    model = models.IntegerField()
    mark = models.CharField(max_length=50)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
