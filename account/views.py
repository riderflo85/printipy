from django.shortcuts import render


def  index(request):
    return render(request, 'account/index.html')

def sign_up(request):
    return render(request, 'account/sign_up.html')