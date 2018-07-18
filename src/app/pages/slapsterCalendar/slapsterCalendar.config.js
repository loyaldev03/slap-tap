(function () {
    'use strict';

    angular
        .module('app.pages.slapsterCalendar')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('slapster-calendar', {
                parent: 'withNavbar',
                url: '/slapster-calendar',
                data: {
                    access: '@'
                },
                views: {
                    content: {
                        controller: 'slapsterCalendarController',
                        templateUrl: 'pages/slapsterCalendar/slapster-calendar.html'
                    }
                }
            })
    }
}());