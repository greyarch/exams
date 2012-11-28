function openModal(title, content, buttons)
{
    $("#add-exam").modal({
        title: title,
//        content: content,
        buttons: buttons,
//        beforeContent: '<div class="carbon">',
//        afterContent: '</div>',
        buttonsAlign: 'center',
        resizable: true
    });
}