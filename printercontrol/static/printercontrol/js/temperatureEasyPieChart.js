$(function () {
    $('.chartNozzle').easyPieChart({
        barColor: '#00cc00',
        scaleColor: false,
        scaleLength: 1,
        lineWidth: 10,
        size: 200,
        onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent) + '°C');
        }
    });

    // Update value temperature
    /* var newTemp = 80;
    // setTimeout(function() {
    //     $('.chartNozzle').data('esayPieChart').update(newTemp);
    }); */
});

$(function () {
    $('.chartBed').easyPieChart({
        barColor: '#ff6600',
        scaleColor: false,
        scaleLength: 10,
        lineWidth: 10,
        size: 200,
        onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent) + '°C');
        }
    });

    // Update value temperature
    /* var newTemp = 80;
    // setTimeout(function() {
    //     $('.chartBed').data('esayPieChart').update(newTemp);
    }); */
});