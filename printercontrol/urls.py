from django.urls import path
from . import views

app_name='printercontrol'
urlpatterns = [
    path('dashboard', views.dashboard, name='dashboard'),
    path('controlpack', views.controlpack, name='controlpack'),
    path('prepare', views.prepare, name='prepare'),
    path('connect_printer', views.connect_printer, name='connect_printer'),
    path('disconnect_printer', views.disconnect, name='disconnect_printer'),
    path('move', views.move, name='move'),
]
