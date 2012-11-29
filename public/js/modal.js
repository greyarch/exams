function openModal(title, buttons) {
    $("#add-exam").modal({
        title: title,
        buttons: buttons,
        buttonsAlign: 'center',
        resizable: true
    });
}