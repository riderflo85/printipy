var btnConnect = document.getElementById('btnConnect');
var statusPrinter = document.getElementById('printerStatus');
var btnSaveConfig = document.getElementById('saveConfig');
var listPort = document.getElementById('selectPort');
let listBaudrate = document.getElementById('selectBaudrate');
var csrftoken = getCookie('csrftoken');

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

btnConnect.addEventListener('click', function() {
    if (statusPrinter.getAttribute('data-status') === 'Dé connectée') {
        $('#modalConnect').modal();
    } else {
        // requet POST pour la déconnexion
    }
});

btnSaveConfig.addEventListener('click', function() {
    let port = listPort.value;
    let baudrate = listBaudrate.value;

    // requet POST pour envoyer les données et connecter l'imprimante
        // si succès de la req, changer le data-status en 'Connectée'
});
// btnSaveConfig.addEventListener('click', function (event) {
//     statusPrinter.textContent = 'Connecter';
//     statusPrinter.classList.replace('badge-noconnect', 'badge-connect');

//     btnConnect.textContent = 'Dé-connexion';
//     btnConnect.classList.replace('btn-primary', 'btn-info');
// });

// btnConnect.addEventListener('click', function (event) {
//     if (this.textContent === 'Dé-connexion') {
//         statusPrinter.textContent = 'Non-connecter';
//         statusPrinter.classList.replace('badge-connect', 'badge-noconnect');

//         this.textContent = 'Connexion';
//         this.classList.replace('btn-info', 'btn-primary');
//     } else {
//         $('#modalConnect').modal();
//     }
// });