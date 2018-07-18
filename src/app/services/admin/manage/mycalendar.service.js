(function() {
    'use strict';

    angular
        .module('app.services')
        .service('myCalendarService', myCalendarService);

    /* @ngInject */
    function myCalendarService($q, adminApiService, apiService) {
    	this.test_schedules = [
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "09/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "09/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "09/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "09/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "09/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "09/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "09/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "09/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "07/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "07/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "07/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "07/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "07/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "07/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "07/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "07/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		},
    		{
    			name: "frederick",
    			lastName: "schjang",
    			productName: "monthlySLAP",
    			lengthOfCall: 45,
    			date: "07/30/2018",
    			timeOfCall: '10:00 AM',
    			roomLink: 'https://zoom.us',
    			slapsterId: '59c0637bdcb3a054d970d665',
    			adminId: '5ada06983c2bcd1d9d6083b4'
    		}
    	]
  		this.getSchedules = function(_id) {
  			var deferred = $q.defer();
  			deferred.resolve(this.test_schedules);
  			return deferred.promise;
  		}  	
    }
})