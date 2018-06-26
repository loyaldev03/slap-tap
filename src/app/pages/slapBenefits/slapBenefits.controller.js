(function() {
    'use strict';

    angular
        .module('app.pages.slapWorld')
        .controller('SlapBenefitsController', SlapBenefitsController);

    /* @ngInject */
    function SlapBenefitsController($scope, $state, pageService, $window) {
        pageService
        .setPageTitle('SLAPbenefits');

    }
}());