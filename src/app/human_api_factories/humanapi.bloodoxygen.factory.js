'user strict'

angular.module('health-e')
	.factory('HumanAPIBloodOxygenFactory', function($http, $q){
		var data = [];
		function getReadings(){
			var dfd = $q.defer();
			$http.get('https://api.humanapi.co/v1/human/blood_oxygen/readings?access_token=demo').then(function(resp){
				data = resp.data
				var temp = {
					name: 'Blood Oxygen',
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