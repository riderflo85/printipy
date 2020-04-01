var speed = document.getElementById('speedMotors');
var distance = document.getElementById('distanceMotors');
var type_position = document.getElementById('typePosition');
var btnHome = document.getElementById('btnHome');
var idPrinter = $("#tabPrinters").children().children().attr('data-printer-id');
var spinnerMove = document.getElementById('spinnerMove');
var csrftoken = getCookie('csrftoken');

var btnsMove = [
    document.getElementById('xPlus'),
    document.getElementById('xMinus'),
    document.getElementById('yPlus'),
    document.getElementById('yMinus'),
    document.getElementById('zPlus'),
    document.getElementById('zMinus'),
];

var btnsStepper = [
    document.getElementById('stepperOn'),
    document.getElementById('stepperOff')
];

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


function runSpinner() {
    spinnerMove.classList.remove('d-none');
    setTimeout(stopSpinner, 3000);
}

function stopSpinner() {
    spinnerMove.classList.add('d-none');
}

for (const i of btnsMove) {
    i.addEventListener('click', function() {
        let axe = this.getAttribute('data-axe');
        let type_move = this.getAttribute('data-type');
        let statusPrinter = $("#tabPrinters").children().children().attr('data-printer-status');

        if (statusPrinter === "Connectée") {
            $.ajax({
                url: '/control/move',
                type: 'POST',
                dataType: 'json',
                data: {
                    'id_printer': idPrinter,
                    'speed': "F" + speed.value,
                    'distance': distance.value,
                    'type_pos': type_position.value,
                    'mouv_type': type_move,
                    'axe': axe
                },
                success: function(data) {
                    if (data['status'] === 'ok') {
                        runSpinner();
                    } else {
                        let msg = "Une erreur c'est produite";
                        display_error($('#notificationZone'), msg);
                    }
                },
                error: function(error) {
                    let msg = "Une erreur c'est produite: " + toString(error);
                    display_error($('#notificationZone'), msg);
                }
            });
        } else {
            let msg = "Veuillez d'abord connecter l'imprimante !!";
            display_error($('#notificationZone'), msg, autohide=true);
        }
    });
}

// btnsMove[3].addEventListener('click', function() {
//     let axe = this.getAttribute('data-axe');
//     let type_move = this.getAttribute('data-type');
//     let statusPrinter = $("#tabPrinters").children().children().attr('data-printer-status');
//     console.log('test timer n°1');
    
//     if (statusPrinter === "Connectée") {
//         console.log('test timer n°2');

//         $.ajax({
//             url: '/control/move',
//             type: 'POST',
//             dataType: 'json',
//             data: {
//                 'id_printer': idPrinter,
//                 'speed': "F" + speed.value,
//                 'distance': distance.value,
//                 'type_pos': type_position.value,btnsMove[3].addEventListener('click', function() {
//     let axe = this.getAttribute('data-axe');
//     let type_move = this.getAttribute('data-type');
//     let statusPrinter = $("#tabPrinters").children().children().attr('data-printer-status');
//     console.log('test timer n°1');
    
//     if (statusPrinter === "Connectée") {btnsMove[3].addEventListener('click', function() {
//     let axe = this.getAttribute('data-axe');
//     let type_move = this.getAttribute('data-type');
//     let statusPrinter = $("#tabPrinters").children().children().attr('data-printer-status');
//     console.log('test timer n°1');
    
//     if (statusPrinter === "Connectée") {
//         console.log('test timer n°2');

//         $.ajax({
//             url: '/control/move',
//             type: 'POST',
//             dataType: 'json',
//             data: {
//                 'id_printer': idPrinter,
//                 'speed': "F" + speed.value,
//                 'distance': distance.value,
//                 'type_pos': type_position.value,
//                 'mouv_type': type_move,
//                 'axe': axe
//             },
//             success: function(data) {
//                 if (data['status'] === 'ok') {
//                     // runSpinner();
//                 } else {
//                     let msg = "Une erreur c'est produite";
//                     display_error($('#notificationZone'), msg);
//                 }
//             },
//             error: function(error) {
//                 let msg = "Une erreur c'est produite: " + toString(error);
//                 display_error($('#notificationZone'), msg);
//             }
//         });
//     } else {
//         let msg = "Veuillez d'abord connecter l'imprimante !!";
//         display_error($('#notificationZone'), msg, autohide=true);
//     }
// });
//         console.log('test timer n°2');

//         $.ajax({
//             url: '/control/move',
//             type: 'POST',
//             dataType: 'json',
//             data: {
//                 'id_printer': idPrinter,
//                 'speed': "F" + speed.value,
//                 'distance': distance.value,
//                 'type_pos': type_position.value,
//                 'mouv_type': type_move,
//                 'axe': axe
//             },
//             success: function(data) {
//                 if (data['status'] === 'ok') {
//                     // runSpinner();
//                 } else {
//                     let msg = "Une erreur c'est produite";
//                     display_error($('#notificationZone'), msg);
//                 }
//             },
//             error: function(error) {
//                 let msg = "Une erreur c'est produite: " + toString(error);
//                 display_error($('#notificationZone'), msg);
//             }
//         });
//     } else {
//         let msg = "Veuillez d'abord connecter l'imprimante !!";
//         display_error($('#notificationZone'), msg, autohide=true);
//     }
// });
//             },
//             success: function(data) {
//                 if (data['status'] === 'ok') {
//                     // runSpinner();
//                 } else {
//                     let msg = "Une erreur c'est produite";
//                     display_error($('#notificationZone'), msg);
//                 }
//             },
//             error: function(error) {
//                 let msg = "Une erreur c'est produite: " + toString(error);
//                 display_error($('#notificationZone'), msg);
//             }
//         });
//     } else {
//         let msg = "Veuillez d'abord connecter l'imprimante !!";
//         display_error($('#notificationZone'), msg, autohide=true);
//     }
// });