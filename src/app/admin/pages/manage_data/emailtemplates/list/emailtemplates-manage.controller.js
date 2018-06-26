(function() {
    'use strict';

    angular
        .module('manage.emailtemplates.module')
        .controller('EmailtemplatesManageController', EmailtemplatesManageController);

    /* @ngInject */
    function EmailtemplatesManageController($scope, $state, $filter, pageService, NgTableParams, emailTemplateService) {
        angular.extend($scope, {
            gridData: {
                gridOptions: {data:[]},
                gridActions: {}
            },
            dataReady: false            
        })
        activate();
        function activate() {
            return emailTemplateService.list()
            .then(function(response) {
                $scope.gridData.gridOptions.data = response.data;
                $scope.dataReady = true;
            }) 

        }
        pageService
            .reset()
            .addCrumb({name: 'Email Templates', path: 'emailtemplates.list'})
            .setPageTitle('Manage Email Templates');
    }
}());