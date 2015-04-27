'user strict'

angular.module('health-e')
	.factory('HumanAPISleepFactory', function($http, $q){
		var data = [];
		var sleepSummaries = [];
		function getReadings(){
			var dfd = $q.defer();
			if(data.length > 0){
				var temp = {
					name: 'Sleep',
					data: data
				}
				dfd.resolve(temp);
				return dfd.promise;
			}
			$http.get('https://api.humanapi.co/v1/human/sleeps?access_token=demo').then(function(resp){
				data = resp.data
				var temp = {
					name: 'Sleep',
					data: data
				}
				dfd.resolve(temp);
			}, function(err){
				console.error('ERR', err);
			});
			return dfd.promise;
		}

		function getSummaries(){
			var dfd = $q.defer();
			if(sleepSummaries.length > 0){
				var temp = {
					name: 'Sleep',
					data: sleepSummaries
				}
				dfd.resolve(temp);
				return dfd.promise;
			}
			$http.get('https://api.humanapi.co/v1/human/sleeps/summaries?access_token=demo').then(function(resp){
				sleepSummaries = resp.data
				var temp = {
					name: 'Sleep',
					data: sleepSummaries
				}
				dfd.resolve(temp);
			}, function(err){
				console.error('ERR', err);
			});
			return dfd.promise;
		}

		var factory = {
			getReadings: getReadings,
			getSummaries: getSummaries
		};

		return factory;
	});