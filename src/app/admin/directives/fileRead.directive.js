(function () {
    'use strict';

    angular
        .module('adminapp.directives')
        .directive('fileread', fileread)
        
    function fileread() {
        return {
            scope: {
                fileread: "=",
                originalfile: '=',
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    var validMimeTypes = "[image/png, image/jpeg, image/gif]";
                    console.log('------valid mime types------', validMimeTypes);
                    var type = '';
                    var isTypeValid = function(type) {
                        if (type && ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1)) {
                          return true;
                        } else {
                          alert("Invalid file type.  File must be one of following types " + validMimeTypes);
                          return false;
                        }
                    };

                    reader.onload = function (loadEvent) {
                      if (isTypeValid(type)) {                        
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                      }
                    }
                    scope.originalfile = changeEvent.target.files[0];
                    type = changeEvent.target.files[0].type;
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }        
    }

})(); 