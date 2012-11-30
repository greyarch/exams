function openModal(selector, title) {
    $(selector).modal({
        title:title,
        buttons: {},
        buttonsAlign:'center',
        resizable:false
    });
};