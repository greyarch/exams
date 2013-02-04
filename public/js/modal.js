function openModal(selector, title) {
    $(selector).modal({
        title:title,
        buttons:{},
        buttonsAlign:'center',
        resizable:false
    });

    $(".datepicker").glDatePicker({
        zIndex:100,
        onChange:function (target, newDate) {
            target.val(
                newDate.getFullYear() + "-" +
                    (newDate.getMonth() + 1) + "-" +
                    newDate.getDate()
            );
        }
    });
};


function confirm(title, onConfirm) {
    $.modal.confirm(title, onConfirm, function () {});
};
