from django.contrib import admin
from .models import User, Car, ProfileUser
# Register your models here.
admin.site.register(User)
admin.site.register(Car)
admin.site.register(ProfileUser)
