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
  		
    	this.available_dates = [
    		{
    			time: '07/30/2018'
    		},
    		{
    			time: '08/01/2018'
    		},
    		{
    			time: '08/02/2018'
    		},
    		{
    			time: '08/03/2018'
    		},
    		{
    			time: '08/04/2018'
    		},
    		{
    			time: '08/05/2018'
    		},
    		{
    			time: '08/06/2018'
    		},
    		{
    			time: '08/07/2018'
    		},
    		{
    			time: '08/08/2018'
    		},
    		{
    			time: '08/09/2018'
    		}
    	];
  		this.getSchedules = function(_id) {
  			var deferred = $q.defer();
  			deferred.resolve(this.test_schedules);
  			return deferred.promise;
  		}  	

  		this.getAvailableDates = function(_id) {
  			var deferred = $q.defer();
  			deferred.resolve(this.available_dates);
  			return deferred.promise;
  		}

        this.getAvailableSlots = function(slapster_id, slapexpert_id) {
            return apiService.rest.all('getAvailableSlots').post({slapexpert_id: slapexpert_id, slapster_id: slapster_id});
        }
    }
})