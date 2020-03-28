from django.db import models
from django.contrib.auth.models import User


class Printer(models.Model):
    name = models.CharField(max_length=150)
    model = models.CharField(max_length=150)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
