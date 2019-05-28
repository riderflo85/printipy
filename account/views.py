from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .forms import LoginForm, SignupForm


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
    context = {'errors': False}

    if request.method == 'POST':
        form = SignupForm(request.POST)

        if form.is_valid():
            nom = form.cleaned_data['last_name']
            prenom = form.cleaned_data['first_name']
            pseudo = form.cleaned_data['pseudo']
            email = form.cleaned_data['email']
            pwd = form.cleaned_data['password']

            new_user = User.objects.create_user(pseudo, email, pwd)
            new_user.last_name = nom
            new_user.first_name = prenom
            new_user.save()
            context['new_user'] = new_user

        else:
            context['errors'] = form.errors.items()

    else:
        form = SignupForm()
    context['form'] = form

    return render(request, 'account/sign_up.html', context)

def sign_out(request):
    logout(request)
    return render(request, 'account/sign_out.html')

def mini_dashboard(request):
    return render(request, 'account/mini_dashboard.html')