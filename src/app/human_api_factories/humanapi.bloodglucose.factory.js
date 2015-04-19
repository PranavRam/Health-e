'user strict'

angular.module('health-e')
	.factory('HumanAPIBloodGlucoseFactory', function($http, $q){
		var data = [];
		function getReadings(){
			var dfd = $q.defer();
			$http.get('https://api.humanapi.co/v1/human/blood_glucose/readings?access_token=demo').then(function(resp){
				data = resp.data
				var temp = {
					name: 'Blood Glucose',
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