import time
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Printer
from .printer import PrinterMachine


PRINTERS = {
    'id_printer': [],
    'instance_printer': []
}

@login_required
def dashboard(request):
    printers_user = request.user.printer_set.all()

    try:
        for printer in printers_user:
            index_list = PRINTERS['id_printer'].index(printer.id)
            printer_exists = PRINTERS['instance_printer'][index_list]

    except ValueError:
        for printer in printers_user:
            printer.status = "Non connectée"
            printer.save()

    context = {'printers': request.user.printer_set.all()}

    return render(request, 'printercontrol/dashboard.html', context)

@login_required
def controlpack(request):
    context = {'printers': request.user.printer_set.all()}
    return render(request, 'printercontrol/control.html', context)

@login_required
def prepare(request):
    context = {'printers': request.user.printer_set.all()}
    return render(request, 'printercontrol/prepare.html', context)

def connect_printer(request):
    if request.method == 'POST':
        port = request.POST['port']
        baudrate = int(request.POST['baudrate'])
        printer_num = int(request.POST['id_printer'])
        printer = request.user.printer_set.get(pk=printer_num)
        pr = PrinterMachine()
        printer_exists = PrinterMachine()

        try:
            index_list = PRINTERS['id_printer'].index(printer.id)
            printer_exists = PRINTERS['instance_printer'][index_list]
            printer_exists.open()

        except ValueError:
            pr.port = port
            pr.baudrate = baudrate
            pr.timeout = 2
            pr.open()

            PRINTERS['id_printer'].append(printer.id)
            PRINTERS['instance_printer'].append(pr)

        finally:
            time.sleep(3)

            if pr.is_open or printer_exists.is_open:
                printer.status = 'Connectée'
                printer.save()
                return JsonResponse({"connected": True})
            else:
                return JsonResponse({"connected": False})
    # else:
        # return error 404

def move(request):
    if request.method == 'POST':
        speed = request.POST['speed']
        distance = request.POST['distance']
        type_pos = request.POST['type_pos']
        mouv_type = request.POST['mouv_type']
        axe = request.POST['axe']
        printer_num = int(request.POST['id_printer'])
        printer = request.user.printer_set.get(pk=printer_num)

        index_list = PRINTERS['id_printer'].index(printer.id)
        printer = PRINTERS['instance_printer'][index_list]

        if mouv_type == 'positive':
            distance = f"{distance}"
        elif mouv_type == 'negative':
            distance = f"-{distance}"

        res = printer.set_type_position(type_pos)
        print(res)
        if res == b"ok\r\n":
            res = printer.set_mouv("G1", axe, distance, speed)
            print(res)
            if res == b"ok\r\n":
                return JsonResponse({"status": "ok"})
        else:
            return JsonResponse({"status": "error"})

    # else:
        # return error 404

def disconnect(request):
    if request.method == 'POST':

        printer_num = int(request.POST['id_printer'])
        printer = request.user.printer_set.get(pk=printer_num)

        index_pr = PRINTERS['id_printer'].index(printer.id)
        pr = PRINTERS['instance_printer'][index_pr]
        pr.close()
        printer.status = 'Non connectée'
        printer.save()

        if pr.is_open:
            return JsonResponse({"disconnected": False})
        else:
            return JsonResponse({"disconnected": True})
