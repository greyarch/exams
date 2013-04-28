require(['/js/require-config.js'], function () {
    require(['knockout', '/js/collections/exams.js', '/js/vm/admin/user-menu-vm.js'],
        function (ko, AllExams, UserMenuVM) {
            AllExams.fetch();
            ko.applyBindings(new UserMenuVM(AllExams));
        }
    );
});