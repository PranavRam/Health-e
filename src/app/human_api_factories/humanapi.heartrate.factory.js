'user strict'

angular.module('health-e')
	.factory('HumanAPIHeartRateFactory', function($http, $q){
		var data = [];
		function getReadings(){
			var dfd = $q.defer();
			if(data.length > 0){
				var temp = {
					name: 'Heart Rate',
					data: data
				}
				dfd.resolve(temp);
				return dfd.promise;
			}
			$http.get('https://api.humanapi.co/v1/human/heart_rate/readings?access_token=demo').then(function(resp){
				data = resp.data
				var temp = {
					name: 'Heart Rate',
					data: data
				}
				dfd.resolve(temp);
			}, function(err){
				console.error('ERR', err);
			});
			return dfd.promise;
		}

		var factory = {
			getReadings: getReadings
		};

		return factory;
	});