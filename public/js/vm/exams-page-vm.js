require(['js/libs/knockout-2.2.0.js', 'exams', 'user-menu'], function (ko, ExamsVM, UserMenuVM) {
    examsVM = new ExamsVM();
    ko.applyBindings(examsVM, $('#main')[0]);
    umVM = new UserMenuVM(examsVM.exams);
    ko.applyBindings(umVM, $('#menu')[0]);
});