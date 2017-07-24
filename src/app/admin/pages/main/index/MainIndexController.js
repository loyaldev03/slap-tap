(function() {
    'use strict';

    angular
        .module('adminapp.pages.main')
        .controller('AdminMainIndexController', AdminMainIndexController);

    AdminMainIndexController.$inject = ['pageService'];

    function AdminMainIndexController(pageService, allUsers) {
        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Dashboard');
    }
}());