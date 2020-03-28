from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required


@login_required
def dashboard(request):
    return render(request, 'printercontrol/dashboard.html')

@login_required
def controlpack(request):
    return render(request, 'printercontrol/control.html')

@login_required
def prepare(request):
    return render(request, 'printercontrol/prepare.html')

def mouv(request):
    if request.method == 'POST':
        speed = request.POST['speed']
        distance = request.POST['distance']
        type_pos = request.POST['type_pos']
        mouv_type = request.POST['mouv_type']
        axe = request.POST['axe']

        if mouv_type == 'positive':
            distance = f"{distance}"
        elif mouv_type == 'negative':
            distance = f"-{distance}"