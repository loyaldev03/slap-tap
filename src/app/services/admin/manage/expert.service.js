(function () {
    'use strict';

    angular
        .module('app.services')
        .service('expertService', expertService);

    /* @ngInject */
    function expertService(adminApiService, apiService) {
    

        this.add = function (expert) {
            return adminApiService.rest.all('expert').post(expert);
        };

        this.list = function () {
            return adminApiService.rest.all('expert').getList();
        };

        this.get = function (id) {
            return adminApiService.rest.all('expert').one(id).get();
        };

        this.update = function (expert) {
            return adminApiService.rest.all('expert').one(expert._id).customPUT(expert);
        };

        this.delete = function (expert) {
            return expert.remove();
        }

        this.getExpertWithUserId = function(user_id) {
            return adminApiService.rest.all('getExpertWithUserId').get(user_id);
        }
    }
}());