from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from .forms import LoginForm


def  index(request):
    context = {'error': False}

    if request.method == 'POST':
        form = LoginForm(request.POST)

        if form.is_valid():
            pseudo = form.cleaned_data['pseudo']
            pwd = form.cleaned_data['password']
            user = authenticate(request, username=pseudo, password=pwd)
            context['user'] = user
        
            if user is not None:
                login(request, user)
            else:
                context['error'] =  True

    else:
        form = LoginForm()
    context['form'] = form

    return render(request, 'account/index.html', context)

def sign_up(request):
    return render(request, 'account/sign_up.html')

def mini_dashboard(request):
    return render(request, 'account/mini_dashboard.html')