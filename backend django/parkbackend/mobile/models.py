from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class ProfileUser(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)


class Car(models.Model):

    matricule = models.CharField(max_length=50)
    model = models.IntegerField()
    mark = models.CharField(max_length=50)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
