(function () {
    'use strict';

    angular
        .module('manage.coupon.module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {
        $stateProvider
            .state('experts', {
                abstract: true,
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/experts',
                parent: 'admin',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }

            })
            .state('experts.list', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '',
                controller: 'expertsManageController',
                templateUrl: 'admin/pages/manage_data/experts/list/experts-manage.html'
            })
            .state('experts.add', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/add',
                controller: 'expertsItemController',
                templateUrl: 'admin/pages/manage_data/experts/item/experts-item.html',
                resolve: {
                    coupons: function (couponService) {
                        return couponService.list()
                            .then(function (response) {
                                return response.data;
                            });
                    }
                }
            })
            .state('experts.item', {
                data: {
                    access: 'admin',
                    isAdminPage: true
                },
                url: '/{partner_id}',
                controller: 'expertsItemController',
                templateUrl: 'admin/pages/manage_data/experts/item/experts-item.html',
                resolve : {
                    coupons: function (couponService) {
                        return couponService.list()
                            .then(function (response) {
                                return response.data;
                            });
                    }
                }
            });
    }
}());