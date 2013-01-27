require(['js/libs/knockout-2.2.0.js', 'models/exam', 'user-menu'], function (ko, Exam, UserMenuVM) {
    umVM = new UserMenuVM();
    ko.applyBindings(umVM, $('#menu')[0]);
});