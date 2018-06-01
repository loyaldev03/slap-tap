(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('monthName', monthName);

    function monthName() {
        return function (date_str) {
	        var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        	var date = new Date(date_str);
        	var monthName = monthNames[date.getMonth()];
        	var monthDate = date.getDate();
        	var year = date.getFullYear();
	        return monthName + " " + monthDate + "," + year;
        }
    }
})();