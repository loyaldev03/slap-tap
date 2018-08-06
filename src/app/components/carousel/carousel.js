(function () {
    'use strict';

    var carousel = {
        restrict: 'E',
        scope: {
          links: '='
        },
        templateUrl: 'components/carousel/carousel.html',
        link: function(scope, element) {
          $timeout(function() {
            $('.carousel-indicators li',element).first().addClass('active');
            $('.carousel-inner .item',element).first().addClass('active');
          });
        }
    };

    angular
        .module('app.components')
        .component('carousel', carousel);
}());