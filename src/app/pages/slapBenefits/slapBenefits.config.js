(function () {
    'use strict';

    angular
        .module('app.pages.slapBenefits')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('slapBenefits', {
                data: {
                    access: '@'
                },
                parent: 'withNavbar',
                url: '/benefits',
                views: {
                    content: {
                        controller: 'SlapBenefitsController',
                        templateUrl: 'pages/slapBenefits/slapBenefits.html'
                    }
                }
            })
    }
}());