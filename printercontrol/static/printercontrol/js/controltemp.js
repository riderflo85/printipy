function checkValue(btn, elem) {
    if (elem.value === '0') {
        btn.prop('disabled', true);
    }else {
        btn.removeAttr('disabled');
    }
}


var btnPlusNozzle = $("#btnPlusNozzle");
var btnPlusBed = $("#btnPlusBed");
var btnMoinsNozzle = $("#btnMoinsNozzle");
var btnMoinsBed = $("#btnMoinsBed");
var tempsNozzle = $("#ajustTempNozzle")[0];
var tempsBed = $("#ajustTempBed")[0];
var rangeNozzle = $("#rangeTempNozzle")[0];
var rangeBed = $("#rangeTempBed")[0];

tempsBed.value = "0";
tempsNozzle.value = "0";
rangeNozzle.value = 0;
rangeBed.value = 0;

checkValue(btnMoinsBed, tempsBed);
checkValue(btnMoinsNozzle, tempsNozzle);

btnPlusNozzle.click(function() {
    tempNum = parseInt(tempsNozzle.value);
    tempNum ++;
    tempsNozzle.value = tempNum.toString();
    checkValue(btnMoinsNozzle, tempsNozzle);
    rangeNozzle.value = tempNum;
});

btnPlusBed.click(function () {
    tempNum = parseInt(tempsBed.value);
    tempNum++;
    tempsBed.value = tempNum.toString();
    checkValue(btnMoinsBed, tempsBed);
    rangeBed.value = tempNum;
});

btnMoinsNozzle.click(function () {
    tempNum = parseInt(tempsNozzle.value);
    tempNum--;
    tempsNozzle.value = tempNum.toString();
    checkValue(btnMoinsNozzle, tempsNozzle);
    rangeNozzle.value = tempNum;
});

btnMoinsBed.click(function () {
    tempNum = parseInt(tempsBed.value);
    tempNum--;
    tempsBed.value = tempNum.toString();
    checkValue(btnMoinsBed, tempsBed);
    rangeBed.value = tempNum;
});

$("#rangeTempNozzle").change(function () {
    tempsNozzle.value = rangeNozzle.value.toString();
    checkValue(btnMoinsNozzle, tempsNozzle);
});

$("#rangeTempBed").change(function () {
    tempsBed.value = rangeBed.value.toString();
    checkValue(btnMoinsBed, tempsBed);
});

$("#ajustTempNozzle").blur(function () {
    rangeNozzle.value = parseInt(tempsNozzle.value);
    checkValue(btnMoinsNozzle, tempsNozzle);
});

$("#ajustTempBed").blur(function () {
    rangeBed.value = parseInt(tempsBed.value);
    checkValue(btnMoinsBed, tempsBed);
});

$("#ajustTempNozzle").keypress(function (event) {
    if (event.which === 13) {
        rangeNozzle.value = parseInt(tempsNozzle.value);
        checkValue(btnMoinsNozzle, tempsNozzle);
    }
});

$("#ajustTempBed").keypress(function (event) {
    if (event.which === 13) {
        rangeBed.value = parseInt(tempsBed.value);
        checkValue(btnMoinsBed, tempsBed);
    }
});