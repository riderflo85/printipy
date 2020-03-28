try {
    var btnConnect = document.getElementById('btnConnect');
    var statusPrinter = document.getElementById('printerStatus');
    var btnSaveConfig = document.getElementById('saveConfig');

    btnSaveConfig.addEventListener('click', function (event) {
        statusPrinter.textContent = 'Connecter';
        statusPrinter.classList.replace('badge-noconnect', 'badge-connect');

        btnConnect.textContent = 'Dé-connexion';
        btnConnect.classList.replace('btn-primary', 'btn-info');
    });

    btnConnect.addEventListener('click', function (event) {
        if (this.textContent === 'Dé-connexion') {
            statusPrinter.textContent = 'Non-connecter';
            statusPrinter.classList.replace('badge-connect', 'badge-noconnect');

            this.textContent = 'Connexion';
            this.classList.replace('btn-info', 'btn-primary');
        } else {
            $('#modalConnect').modal();
        }
    });
} catch (error) {
    // pass
}
