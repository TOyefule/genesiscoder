var debug = false;
var log = { //Sets the logging functions to blank to avoid breaks
    trace: function () { },
    debug: function () { },
    info: function () { },
    error: function () { },
    fatal: function () { },
    warn: function () { }
}

function formatMoney(number) {
    return number.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && ((a.length - i) % 3 == 0) ? ',' + c : c;
    })
}
function resetWidth(id, width) {
    $('#' + id).css('width', width);
    log.debug('Resized: ' + id + ' successfully to ' + width);
}

function slideElement(elementId, direction, amount) { //move content in a certain direction at a certain amount
    var ele = elementId;
    var dir = direction;
    var amt = amount;
    if (dir == 'left') { //forward - next
        $('#' + elementId).animate({'left': '-=' + amt}, function () {
        });
    }
    if (dir == 'right') { //back - previous
        $('#' + elementId).animate({'left': '+=' + amt}, function () {
        });
    }
}

function scrollToView(target) { //scroll to an ID on the page //example: scrollToView('showNav');
    if ($('#' + target).length > 0) {
        $("html, body").animate({ scrollTop: $('#' + target).offset().top }, 1000);
    } else {  // defaults to top of page
        $('html, body').animate({scrollTop: 0}, 1000);
    }
}

function setCookieForBalance() {
    document.cookie = "GWURRefresh=true;path=/;secure=secure;domain=.chase.com";
}
