# coding: utf-8
from django.urls import path

from . import views

app_name = 'account'
urlpatterns = [
    path('', views.index, name='index'),
    path('signup', views.sign_up, name='sign_up'),
    path('minidashboard', views.mini_dashboard, name='minidashboard'),
]
