(function () {
    'use strict';

    angular
        .module('adminapp.directives')
        .directive('fileread', fileread)
        
    function fileread() {
        return {
            scope: {
                fileread: "=",
                originalfile: '='
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    scope.originalfile = changeEvent.target.files[0];
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }        
    }

})(); 