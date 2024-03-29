(function () {
    'use strict';

    angular
        .module('manage.users.module')
        .controller('AdminSlapstersListController', AdminSlapstersListController);

    function AdminSlapstersListController($scope, $state, pageService, adminUserService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService, permissionService, $auth, userService, apiService) {
        angular.extend($scope,  {
            gridData: {
                gridOptions: {data:[]},
                gridActions: {}
            },
            slpasters: [],
            searchKeyword: '',
            dataloaded: false,
            dataReady: false,
            isAdmin: false,
            ROLES: adminUserService.ROLES,
            STATUSES: adminUserService.STATUSES,
            itemPerPage: 50,

            buildGridData: buildGridData,
            getItemPerPage: getItemPerPage,
            deleteItem: deleteItem,
        });

        pageService
            .reset()
            .addCrumb({name: 'SLAPsters', path: 'slapsters.list'})
            .setPageTitle('SLAPsters');


        $timeout(activate);
        function activate() {
            reloadData();
            
        }
        var user = userService.getStoredUser()
        if(user.role == 1 || user.role == 3) $scope.isAdmin = true;


        function getItemPerPage(value) {
            $scope.itemPerPage = value;
        }
        function reloadData() {
            $scope.dataloaded = false;
            return adminUserService.list()
            .then(function (response) {
                var slapsters = response.data.filter(function(user) {
                    user.currentQuarter = user.currentQuater && user.currentQuater.number ? user.currentQuater.number : user.currentQuater
                    return user.role == 4;
                });
                slapsters = permissionService.filterSlapstersByPermission(slapsters);

                var accounts = _.groupBy(slapsters, function(user) { return user.email; });
                $scope.slpasters = [];
                _.each(accounts, function(account){
                    $scope.slpasters.push({
                        current: account[account.length - 1],  //TODO: select appropriate slapsters
                        accounts: account
                    });
                });
                $scope.slapsters = slapsters;
                
                $scope.dataloaded = true;
                buildGridData();
            });
        }

    
        function buildGridData() {
            var data = {}; 
            $scope.dataReady = false;
            $timeout(function(){

                var filtered = $scope.slpasters.filter(function(slapster){
                    var valid = false;
                    var user = slapster.current;
                    if (user.status === 'archived') return valid;
                    if ($scope.searchKeyword.trim() != ''){
                            if (user.businessName.toLowerCase().indexOf($scope.searchKeyword.toLowerCase()) != -1)
                            valid = true;
                            if (user.name.toLowerCase().indexOf($scope.searchKeyword.toLowerCase()) != -1)
                            valid = true;
                            if (user.lastName.toLowerCase().indexOf($scope.searchKeyword.toLowerCase()) != -1)
                            valid = true;
                            if (user.email.toLowerCase().indexOf($scope.searchKeyword.toLowerCase()) != -1)
                            valid = true;
                    } else { valid = true; }
                    return valid;
                })

                data.data =  [];
                _.each(filtered, function(slapster){
                    var user = slapster.current;
                    
                    var role = _.find($scope.ROLES, {id: user.role});
                    user.displayRole = role ? role.name : '';
                    var status = _.find($scope.STATUSES, {id: user.status});
                    user.displayStatus = status ? status.name : '';


                    user.countslapyear = slapster.accounts.length;
                    
                    data.data.push(user);
                });

                data.urlSync = false;
                    $scope.gridData = {
                    gridOptions: data,
                    gridActions: {},
                };
                $scope.dataReady = true;
            })            
        }

        function deleteItem(event, item) {
            var success = function(){

                item.remove().then(function() {
                    reloadData();
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
            commonDialogService.openDeleteItemDialog(event, 'Are you sure you want to remove this account?', 'Archive', success);
        }

        $scope.isNumber = function(str) {
            return !isNaN(+str);
        } 
        
        // function adminBuild(item) {

        //     apiService.adminToken = $auth.getToken();

        //     adminUserService.getToken(item._id).then(function (res){
                
        //         $auth.setToken(res.data.token);
        //         $state.go('home');
        //         document.location.reload(true);
                
        //     });
        // }
        

    }
}());