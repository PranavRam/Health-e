'user strict'

angular.module('health-e')
	.factory('HumanAPIBloodPressureFactory', function($http, $q){
		var data = [];
		function getReadings(){
			var dfd = $q.defer();
			$http.get('https://api.humanapi.co/v1/human/blood_pressure/readings?access_token=demo').then(function(resp){
				data = resp.data
				var temp = {
					name: 'Blood Pressure',
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