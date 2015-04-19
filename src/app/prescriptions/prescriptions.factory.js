'user strict'

angular.module('health-e')
	.factory('PrescriptionFactory', function($http, $q){
		function getPrescriptions(){
			var dfd = $q.defer();
			$http.get('app/data/prescription.json').then(function(resp){
				dfd.resolve(resp.data.entry);
			}, function(err){
				console.error('ERR', err);
			});
			return dfd.promise;
		}

		var factory = {
			getPrescriptions: getPrescriptions
		};

		return factory;
	});