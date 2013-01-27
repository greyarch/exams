require(['js/libs/knockout-2.2.0.js', '/js/models/exam.js', '../admin/user-menu'], function (ko, Exam, UserMenuVM) {
    umVM = new UserMenuVM();
    ko.applyBindings(umVM, $('#menu')[0]);
});