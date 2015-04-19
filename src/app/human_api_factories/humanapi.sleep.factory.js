'user strict'

angular.module('health-e')
	.factory('HumanAPISleepFactory', function($http, $q){
		var data = [];
		function getReadings(){
			var dfd = $q.defer();
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
			$http.get('https://api.humanapi.co/v1/human/sleeps/summaries?access_token=demo').then(function(resp){
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

		var factory = {
			getReadings: getReadings,
			getSummaries: getSummaries
		};

		return factory;
	});