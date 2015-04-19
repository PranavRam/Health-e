'user strict'

angular.module('health-e')
	.factory('HumanAPIActivityFactory', function($http, $q){
		var data = [];
		var activitySummaries = []
		function getActivities(){
			var dfd = $q.defer();
			$http.get('https://api.humanapi.co/v1/human/activities?access_token=demo').then(function(resp){
				data = resp.data
				dfd.resolve(resp.data);
			}, function(err){
				console.error('ERR', err);
			});
			return dfd.promise;
		}

		function getActivitySummaries(){
			var dfd = $q.defer();
			$http.get('https://api.humanapi.co/v1/human/activities/summaries?access_token=demo').then(function(resp){
				activitySummaries = resp.data
				dfd.resolve(resp.data);
			}, function(err){
				console.error('ERR', err);
			});
			return dfd.promise;
		}

		var factory = {
			getActivities: getActivities,
			getActivitySummaries: getActivitySummaries
		};

		return factory;
	});