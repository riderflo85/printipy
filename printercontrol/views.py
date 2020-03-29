import time
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Printer
from .printer import PrinterMachine
from .instance import printers


@login_required
def dashboard(request):
    return render(request, 'printercontrol/dashboard.html')

@login_required
def controlpack(request):
    return render(request, 'printercontrol/control.html')

@login_required
def prepare(request):
    return render(request, 'printercontrol/prepare.html')

def connect_printer(request):
    if request.method == 'POST':
        port = request.POST['port']
        baudrate = int(request.POST['baudrate'])
        print_num = int(request.POST['id_printer'])
        id_printer = request.user.printer_set.get(pk=print_num).id

        pr = PrinterMachine()
        pr.port = port
        pr.baudrate = baudrate
        pr.timeout = 2
        pr.open()
        time.sleep(3)

        if pr.is_open():
            printers['id_printer'].append(id_printer)
            printers['instance_printer'].append(pr)
            return JsonResponse({"connected": True})
        else:
            return JsonResponse({"connected": False})
    # else:
        # return error 404

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

        # res = object.set_mouv(all_params)
        # if res == "ok":
            # return JsonREsponse({"state": "ok"})
        # else:
            # return JsonResponse({"state": "error"})
    # else:
        # return error 404

def disconnect(request):
    if request.method == 'POST':
        print_num = int(request.POST['id_printer'])
        id_printer = request.user.printer_set.get(pk=print_num).id

        index_pr = printers['id_printer'].index(id_printer)
        pr = printers['instance_printer'][index_pr]
        pr.close()

        if pr.is_open():
            return JsonResponse({"disconnected": False})
        else:
            return JsonResponse({"disconnected": True})
