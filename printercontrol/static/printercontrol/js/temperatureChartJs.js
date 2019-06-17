
try {
    // Graph for nozzle
    var ctx = document.getElementById('chartNozzle').getContext('2d');
    var chartNozzle = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['10h', '10h30', '11h', '11h30', '12h', '12h30', '13h'],
            datasets: [{
                label: 'Température de la buse',
                backgroundColor: 'rgba(0, 204, 0, 0.5)',
                borderColor: 'rgb(0, 204, 0)',
                data: [0, 204, 200, 203, 204, 206, 204]
            }]
        },

        // Configuration options go here
        options: {}
    });

    // Graph for bed
    var ctx2 = document.getElementById('chartBed').getContext('2d');
    var chartBed = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['10h', '10h30', '11h', '11h30', '12h', '12h30', '13h'],
            datasets: [{
                label: 'Température du plateau',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 60, 60, 61, 57, 59, 60]
            }]
        },

        options: {}
    });
} catch (error) {
    //pass
}