(function() {
    'use strict';

    angular
        .module('manage.emailtemplates.module')
        .controller('EmailtemplatesItemController', EmailtemplatesItemController);

    /* @ngInject */
    function EmailtemplatesItemController($scope, pageService ,toaster,$stateParams,$state, emailTemplateService, commonDialogService) {

        $scope.emailTemplate = {
            
        };

        $scope.froalaOptions = {
            toolbarButtons : ["bold", "italic", "underline", "|", "align", "formatOL", "formatUL"]
        }
        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'Email Template', path: 'emailtemplates.list'});

        if (!$stateParams.emailtemplate_name) {
            pageService
                .addCrumb({name: 'Add', path: 'emailtemplates.add'})
                .setPageTitle('New Email Temaplate');
        } else {
            emailTemplateService.get($stateParams.emailtemplate_name).then(function (response) {
                $scope.emailTemplate = response.data;

                pageService
                    .addCrumb({name: $stateParams.emailtemplate_name, path: 'emailtemplates.list'})
                    .setPageTitle('Edit "' + $stateParams.emailtemplate_name + '"');
            });
        }

        $scope.save = function() {
            var send_test_yes = function(){
                $scope.apply().then(function () {
                    emailTemplateService.sendTestEmail($scope.emailTemplate.templateName)
                    .then(function(){
                        toaster.pop({type: 'success', body: 'Success'});
                        $state.go('emailtemplates.list');                    
                    });
                });
            }
            var send_test_no = function() {
                $scope.apply().then(function () {
                    toaster.pop({type: 'success', body: 'Success'});
                    $state.go('emailtemplates.list');                    
                });
            }
            commonDialogService.openSendTestEmailDialog(event, 'Do you want to send test emails?', 'Yes', send_test_yes, send_test_no);
        };

        $scope.apply = function() {
            return $scope.update().then(
                function () {
                },
                function (err) {
                    console.log(err);
                })
        };

        $scope.activate = function() {
            $scope.emailTemplate.state = true;
            $scope.apply().then(function () {
                toaster.pop({type: 'success', body: 'Successfully Activated'});
                
            });            
        }

        $scope.deactivate = function() {
            $scope.emailTemplate.state = false;
            $scope.apply().then(function () {
                toaster.pop({type: 'success', body: 'Successfully Deactivated'});
            });            
        }

        $scope.update = function () {
            return ($stateParams.emailtemplate_name) ? emailTemplateService.update($scope.emailTemplate) : emailTemplateService.add($scope.emailTemplate);
        };

    }
}());