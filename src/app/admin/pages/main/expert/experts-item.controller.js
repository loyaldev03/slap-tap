(function () {
    'use strict';

    angular
        .module('manage.experts.module')
        .controller('expertsItemController', expertsItemController);

    /* @ngInject */
    function expertsItemController($scope, expertService, coupons, pageService, productsService, couponService, toaster, $stateParams, $state, Upload, CONFIG, userService) {

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
            originalImage: null,
            imageFileName: null,
            avatar_file: null,
            Upload: Upload
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
        activate();
        function activate() {
            userService.getUser()
            .then(function(user){
                expertService.getExpertWithUserId(user._id)
                .then(function(res) {
                    $scope.expert = res.data;
                    $scope.originalImage = CONFIG.api + "/v1/user/avatar/" + $scope.expert.avatarId; 
                    $scope.image = CONFIG.api + "/v1/user/avatar/" + $scope.expert.avatarId;
                })    
            })
        }
        function createOrSave(event) {
            if ($scope.image != $scope.originalImage) {
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
                });                
            }
            else {
                update().then(function () {
                    toaster.pop({ type: 'success', body: 'Expert Saved!', timeout: 1000 });
                    $state.go('experts.list');
                }).catch(function (err) {
                    toaster.pop({ type: 'error', body: err.data.message });
                });
            }

        }

        function fileUpload(event) {
            $('.avatar-file').click();
        }
        function update() {
            if ($scope.expert._id) {
                return expertService.update($scope.expert);
            } else {
                return expertService.add($scope.expert);
            }
        }

    }
}());