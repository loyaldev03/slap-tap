(function () {
    'use strict';

    angular
        .module('app.services')
        .service('commonDialogService', commonDialogService);

    /* @ngInject */
    function commonDialogService($mdDialog) {
        var service = this;
        service.openDeleteItemDialog = openDeleteItemDialog;
        service.openSendTestEmailDialog = openSendTestEmailDialog;

        function openDeleteItemDialog($event, title, ok, success, fail) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title(title)
                .ariaLabel(title)
                .targetEvent($event)
                .ok(ok)
                .cancel('No');

            $mdDialog.show(confirm).then(success, function() {
                
            });
        }

        function openSendTestEmailDialog($event, title, ok, success, fail) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title(title)
                .ariaLabel(title)
                .targetEvent($event)
                .ok(ok)
                .cancel('No');

            $mdDialog.show(confirm).then(success, fail);
        }

        return service;
    }
})();