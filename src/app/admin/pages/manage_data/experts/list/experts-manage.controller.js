(function () {
    'use strict';

    angular
        .module('manage.experts.module')
        .controller('expertsManageController', expertsManageController);

    /* @ngInject */
    function expertsManageController($timeout, couponService, $scope, adminUserService, $state, pageService, expertService, NgTableParams, CONFIG) {

        angular.extend($scope, {
            gridData: {
                gridOptions: { data: [] },
                gridActions: {}
            },
            // users: [],
            // searchKeyword: '',
            // dataloaded: false,
            // dataReady: false,
            // ROLES: adminUserService.ROLES,
            // STATUSES: adminUserService.STATUSES,
            // itemPerPage: 5,

            // buildGridData: buildGridData,
            // getItemPerPage: getItemPerPage,
            //deleteItem: deleteItem
        });
        $scope.cols = [
            {
                field: 'avatar',
                title: 'avatar',
                show: true,
                format: 'raw',
                getValue: getAvatar
            },
            {
                field: "name",
                title: "Name",
                show: true,
                format: 'raw',
                getValue: getValue
            }, 
            {
                field: "location",
                title: "Location",
                show: true,
                getValue: getLocation
            }, 
            {
                field: "brief_bio",
                title: "Brief Bio",
                show: true,
                getValue: getValue
            },
             {
                field: "personality1",
                title: "Personality1",
                show: true,
                format: 'raw',
                getValue: getValue
            }, {
                field: "personality2",
                title: "Personality2",
                show: true,
                getValue: getValue
            }, {
                field: "personality3",
                title: "Personality3",
                show: true,
                getValue: getValue
            }, {
                field: "why_slapexpert",
                title: "Why a SLAPexpert",
                show: true,
                getValue: getValue
            }, {
                field: "video_introduction",
                title: "Video Introduction",
                show: true,
                getValue: getValue
            }, 
            {
                field: "action",
                title: "",
                format: 'compile',
                getValue: function (row) {
                    return '<button class="btn btn-danger btn-sm" ng-click="delete(row)"><span class="glyphicon glyphicon-trash"></span></button>';
                }
            }
        ];
        $scope.delete = function (row) {
            console.log(row);
            expertService.delete(row).then(function () {
                $scope.list.reload();
            });
        };
        function getValue(row) {
            return row[this.field];
        }
        function getLocation(row) {
            return row['city'] + ' ' + row['state'] + ' ' + row['country'];
        }
        function getAvatar(row) {
            return "<img src='" + CONFIG.api + "/v1/user/avatar/" + row['avatarId'] + "'";
        }
        pageService
            .reset()
            .addCrumb({ name: 'Experts', path: 'patrners.list' })
            .setPageTitle('Manage Experts');
       // $timeout(activate);
        $scope.list = new NgTableParams({},
            {
                getData: function (params) {
                    return expertService.list()
                        .then(function (response) {
                            // console.log(response.data);
                            console.log(response.data);
                            return response.data;
                        });
                }
            }
        );
        // function activate() {
        //     reloadData();
        // }
        // function getItemPerPage(value) {
        //     $scope.itemPerPage = value;
        // }
        // function reloadData() {
        //     $scope.dataloaded = false;
        //     adminUserService.list()
        //         .then(function (response) {
        //             $scope.experts = response.data.filter(function (user) {
        //                 return user.role == 5;
        //             });
        //             console.log($scope.experts);
        //             // var accounts = 
        //             // $scope.experts = _.groupBy(experts, function (user) { return user.businessName; });
        //             // console.log($scope.experts);

        //             $scope.dataloaded = true;
        //             $scope.dataReady = true;
        //             buildGridData();
        //         });
        // }
        // function buildGridData() {
        //     var data = {};

        //     $scope.dataReady = false;
        //     $timeout(function () {

        //         var filtered = $scope.experts.filter(function (user) {
        //             var valid = false;
        //             if (user.status === 'archived') return valid;
        //             if ($scope.searchKeyword.trim() != '') {
        //                 if (user.businessName.toLowerCase().indexOf($scope.searchKeyword) != -1)
        //                     valid = true;
        //                 if (user.name.toLowerCase().indexOf($scope.searchKeyword) != -1)
        //                     valid = true;
        //                 if (user.lastName.toLowerCase().indexOf($scope.searchKeyword) != -1)
        //                     valid = true;
        //                 if (user.email.toLowerCase().indexOf($scope.searchKeyword) != -1)
        //                     valid = true;
        //             } else { valid = true; }
        //             return valid;
        //         })

        //         data.data = filtered.map(function (user) {
        //             var role = _.find($scope.ROLES, { id: user.role });
        //             user.displayRole = role ? role.name : '';
        //             var status = _.find($scope.STATUSES, { id: user.status });
        //             user.displayStatus = status ? status.name : '';
        //             return user;
        //         });

        //         data.urlSync = false;
        //         $scope.gridData = {
        //             gridOptions: data,
        //             gridActions: {},
        //         };
        //         $scope.dataReady = true;
        //     })
        //     // $scope.$apply(function () {
        //     // });
        // }
        // function deleteItem(){

        // }
    }
}());