from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .forms import LoginForm, SignupForm, CreatePrinter
from printercontrol.models import Printer


def index(request):
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
                return redirect(reverse('account:minidashboard'))

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

@login_required
def mini_dashboard(request):
    form = CreatePrinter()
    context = {"printer_user": False, "form": form}

    if len(request.user.printer_set.all()) >= 1:
        context["printer_user"] = True

    return render(request, 'account/mini_dashboard.html', context)

@login_required
def create_printer(request):
    if request.method == 'POST':
        form = CreatePrinter(request.POST)

        if form.is_valid():
            name = form.cleaned_data['name']
            model = form.cleaned_data['model']
            new_printer = Printer()
            new_printer.name = name
            new_printer.model = model
            new_printer.id_user = request.user
            new_printer.save()

    return redirect(reverse('account:minidashboard'))