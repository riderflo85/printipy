from django.db import models
from django.contrib.auth.models import User


class Printer(models.Model):
    name = models.CharField(max_length=150)
    model = models.CharField(max_length=150)
    status = models.CharField(max_length=12, default='disconnected')
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
