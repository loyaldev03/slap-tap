(function () {
    'use strict';

    angular
        .module('adminapp.components')
        .controller('SlapManagerExecuteDialogController', SlapManagerExecuteDialogController);

    /* @ngInject */
    function SlapManagerExecuteDialogController($scope, $state) {
        $scope.formData.journey = {name: 'Execute Call Set', section: 'excute'}
    }
}());