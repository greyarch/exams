var onErr = function (model, err) {
    console.log('an error occurred', err);
    $('#main-title').message('<span class="icon-warning"><b>What are you doing, Dave? Server says:   </b></span>' + err.responseText, {
        classes:['red-gradient'],
        autoClose:5000
    });
};