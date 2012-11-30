function openModal(title, saveFunction) {
    $("#add-exam").modal({
        title:title,
        buttons:{
            'Cancel':{
                click: function(modal) {
                    modal.closeModal();
                },
                classes:"icon-cross glossy red-gradient"
            },
            'Save':{
                click: function(modal) {
                    modal.closeModal();
                    saveFunction();
                },
                classes: "icon-tick glossy green-gradient"
            }
        },
        buttonsAlign:'center',
        resizable:true
    });
};