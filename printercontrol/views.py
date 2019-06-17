from django.shortcuts import render

# Create your views here.
def dashboard(request):
    return render(request, 'printercontrol/dashboard.html')

def controlpack(request):
    return render(request, 'printercontrol/control.html')