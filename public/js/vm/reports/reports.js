require(['js/libs/knockout-2.2.0.js', '../admin/user-menu'], function (ko, UserMenuVM) {
    umVM = new UserMenuVM();
    ko.applyBindings(umVM, $('#menu')[0]);
});