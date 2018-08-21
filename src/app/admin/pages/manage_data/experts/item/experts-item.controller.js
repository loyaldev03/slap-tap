(function () {
    'use strict';

    angular
        .module('manage.experts.module')
        .controller('expertsItemController', expertsItemController);

    /* @ngInject */
    function expertsItemController($scope, expertService, coupons, pageService, productsService, couponService, toaster, $stateParams, $state, Upload, CONFIG) {

        angular.extend($scope, {
            expert: {},
            personalities: [
                "Listening Ear",
                "A Friend Who Gets Me",
                "Someone to brainstorm with",
                "Really good advice",
                "Lots of experience sharing",
                "Structure",
                "Clear strategic guidance",
                "Tough Love",
                "Accountability that won't let me get away with my crap"
            ],
            expertId: $stateParams.expert_id,
            coupons: coupons,
            //deleteItem: deleteItem,
            createOrSave: createOrSave,
            fileUpload: fileUpload,
            image: null,
            imageFileName: null,
            avatar_file: null,
            Upload: Upload,
            isValid: isValid,
        });
        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({ name: 'Experts', path: 'experts.list' });
        if (!$scope.expertId) {
            pageService
                .addCrumb({ name: 'Add', path: 'experts.item' })
                .setPageTitle('Create Expert');
            $scope.expert = {
            };
        } else {
            expertService.get($scope.expertId).then(function (response) {
                $scope.expert = response.data;
                pageService
                    .addCrumb({ name: $scope.expert.name + ' ' + $scope.expert.lastName, path: 'experts.list' })
                    .setPageTitle('Edit Expert');
            });
        }
        function createOrSave(event) {
            if (!$scope.isValid()) {
                return;
            }
            $scope.Upload.upload({
                url: CONFIG.api + '/admin/uploadAvatar',
                data: { avatar: $scope.avatar_file }
            }).then(function (resp) {
                $scope.expert.avatarId = resp.data;
                update().then(function () {
                    toaster.pop({ type: 'success', body: 'Expert Saved!', timeout: 1000 });
                    $state.go('experts.list');
                }).catch(function (err) {
                    toaster.pop({ type: 'error', body: err.data.message });
                });

                }, function (response) {
                }, function (evt) {
            }).then(function(){
            });

        }

        function isValid() {
            if ($scope.expert.personality1 == $scope.expert.personality2 || $scope.expert.personality1 == $scope.expert.personality3 || $scope.expert.personality2 == $scope.expert.personality3) {
                toaster.pop({type: 'error', body: 'You must choose 3 different Personality/Expert Style Words.  Please go back and update your choices.'});                
                return false;
            }
            return true;
        }

        function fileUpload(event) {
            $('.avatar-file').click();
        }
        function update() {
            if ($scope.expertId) {
                return expertService.update($scope.expert);
            } else {
                return expertService.add($scope.expert);
            }
        }

    }
}());