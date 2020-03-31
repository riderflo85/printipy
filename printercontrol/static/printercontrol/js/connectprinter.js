var btnConnect = document.getElementById('btnConnect');
var statusPrinter = document.getElementById('printerStatus');
var btnSaveConfig = document.getElementById('saveConfig');
var listPort = document.getElementById('selectPort');
var listBaudrate = document.getElementById('selectBaudrate');
var divProgressBar = document.getElementById('connectingProgress');
var progressBar = divProgressBar.children[0];
var csrftoken = getCookie('csrftoken');

var width = 1;
function frame() {
    width++;
    progressBar.style.width = `${width}%`;
}
function inProgress() {
    var id = setInterval(frame, 33);
    return id;
}

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

btnConnect.addEventListener('click', function() {
    if (statusPrinter.getAttribute('data-status') === 'Non connectée') {
        $('#modalConnect').modal();
    } else {
        $.ajax({
            url: '/control/disconnect_printer',
            type: 'POST',
            dataType: 'json',
            data: {
                'id_printer': document.getElementById('printerId').getAttribute('data-id'),
            },
            success: function(data) {
                if (data['disconnected']) {
                    statusPrinter.setAttribute('data-status', 'Non connectée');
                    if (statusPrinter.classList.contains('badge-connecting')){
                        statusPrinter.classList.replace('badge-connecting', 'badge-noconnect');
                    } else {
                        statusPrinter.classList.replace('badge-connect', 'badge-noconnect');
                    }
                    statusPrinter.textContent = 'Non-connectée';
                    btnConnect.textContent = 'Connexion';
                    btnConnect.classList.replace('btn-info', 'btn-primary');
                    let msg = "Imprimante déconnectée !";
                    display_info($('#notificationZone'), msg, autohide=true);
                } else {
                   let msg = "Impoŝsible de déconnecter correctement l'imprimante.";
                   display_error($('#notificationZone'), msg);
                }
            },
            error: function(error) {
                let msg = "Une erreur c'est produite: " + toString(error);
                display_error($('#notificationZone'), msg);
            }
        });
    }
});

btnSaveConfig.addEventListener('click', function() {
    let port = listPort.value;
    let baudrate = listBaudrate.value;

    btnConnect.setAttribute('disabled', 'true');
    statusPrinter.classList.replace('badge-noconnect', 'badge-connecting');
    statusPrinter.textContent = 'Connexion en cours...';
    divProgressBar.classList.remove('d-none');

    idInterval = inProgress();
    setTimeout(function() {
        $.ajax({
                url: '/control/connect_printer',
                type: 'POST',
                dataType: 'json',
                data: {
                    'port': port,
                    'baudrate': baudrate,
                    'id_printer': document.getElementById('printerId').getAttribute('data-id'),
                },
                success: function(data) {
                    clearInterval(idInterval);
                    progressBar.style.width = '0%';
                    if (data['connected']) {
                        statusPrinter.setAttribute('data-status', 'Connectée');
                        statusPrinter.classList.replace('badge-connecting', 'badge-connect');
                        statusPrinter.textContent = 'Connectée';
                        btnConnect.textContent = 'Dé-connexion';
                        btnConnect.classList.replace('btn-primary', 'btn-info');
                        let msg = "Connection avec l'imprimante établie avec succès !";
                        display_info($('#notificationZone'), msg, autohide=true);
                    } else {
                        let msg = "Impoŝsible d'établir le connection avec l'imprimante.";
                        display_error($('#notificationZone'), msg);
                        statusPrinter.classList.replace('badge-connecting', 'badge-noconnect');
                        statusPrinter.textContent = 'Non-connectée';
                    }
                    btnConnect.removeAttribute('disabled');
                    divProgressBar.classList.add('d-none');
                },
                error: function(error) {
                    clearInterval(idInterval);
                    progressBar.style.width = '0%';
                    let msg = "Une erreur c'est produite: " + toString(error);
                    display_error($('#notificationZone'), msg);
                }
            });
    }, 10);
    
});
