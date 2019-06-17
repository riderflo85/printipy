from django.urls import path
from . import views

app_name='printercontrol'
urlpatterns = [
    path('dashboard', views.dashboard, name='dashboard'),
    path('controlpack', views.controlpack, name='controlpack'),
]
