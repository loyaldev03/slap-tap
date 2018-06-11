(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('videoLoadElement', videoLoadElement);

    function videoLoadElement() {
        return {
            restrict: 'A',
            link: function(scope,el,attr) {
              el[0].addEventListener("loadeddata", function () {
                amplitude.getInstance().logEvent('SSVIDEOS');
              });                
            }
        }
    }
}());