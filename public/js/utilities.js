function showNotification(message) {
    $('#notificationText').text(message);
    $('#notification').show();
    setTimeout(() => {
        setTimeout(() => {
            $('#notification').addClass('right-slide');
        }, 10);
    }, 10);
    setTimeout(() => {
        $('#notification').removeClass('right-slide'); 
        setTimeout(() => {
            $('#notification').hide(); 
        }, 500);
    }, 3000); 
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

function formatNumber(input) {
    var number = input.replace(/\D/g, '');

    var formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return formattedNumber;
}

function numterToString (num) {
    if (typeof(num) == 'number' || num.includes('000')) {
        return num.toString().replace(/[,. ]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    return num
}