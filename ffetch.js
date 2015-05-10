var init = function () {
    var timer = '',
        prevResult;

    $('.q').on('keyup', function (e) {
        clearTimeout(timer);
        var query = $(this).val();
        if (query !== prevResult) {
            timer = (query.length >= 3) && setTimeout(function () {

                clearPreviousResults();
                fetchResults(query);

            }, 400);
        }
        prevResult = query;
    });


};

function fetchResults( query ) {

    $.getJSON('http://api.flickr.com/services/feeds/photos_public.gne?tags=' + query + '&tagmode=all&format=json&jsoncallback=?',
        // Using ? just means call the callback function provided
        function (data) { // Data is the JSON object from Flickr
            $.each(data.items, function (i, item) {
                    if (i == 10) return false;

                    var description = item.description.replace(/(http:[^\s]+)/, '<a href="$1">$1</a>');
                    var userInfo = description.substring(0, description.indexOf('</p>'));

                tempDiv = $('<div />').addClass('imageBox');
                $('<p />').html(userInfo).appendTo(tempDiv);
                $('<img />').attr("src", item.media.m).appendTo(tempDiv);
                tempDiv.appendTo('.images').slideDown('slow');
            });
    });
}

function clearPreviousResults() {

    $('div.imageBox').each(function () {
        this.remove();
    });
}

$.ready(init());