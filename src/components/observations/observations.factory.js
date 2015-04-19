'user strict'

angular.module('health-e')
	.factory('ObservationsFactory', function($http, $q, 
		HumanAPIBloodGlucoseFactory, 
		HumanAPIBloodOxygenFactory,
		HumanAPIBloodPressureFactory,
		HumanAPIBMIFactory,
		HumanAPIBodyFatFactory,
		HumanAPIHeightFactory,
		HumanAPIHeartRateFactory){
		function getObservations(){
			var dfd = $q.defer();
			var local_observations = $http.get("app/data/observation.json"),
		      blood_glucose_readings = HumanAPIBloodGlucoseFactory.getReadings(),
		      blood_oxygen_readings = HumanAPIBloodOxygenFactory.getReadings(),
		      blood_pressure_readings = HumanAPIBloodPressureFactory.getReadings(),
		      bmi_readings = HumanAPIBMIFactory.getReadings(),
		      body_fat_readings = HumanAPIBodyFatFactory.getReadings(),
		      height_readings = HumanAPIHeightFactory.getReadings(),
		      heart_rate_readings = HumanAPIHeartRateFactory.getReadings();

		  $q.all([local_observations, blood_glucose_readings, 
		  	blood_oxygen_readings, blood_pressure_readings,
		  	bmi_readings, body_fat_readings,
		  	height_readings, heart_rate_readings]).then(function(arrayOfResults) { 
		      // console.log(arrayOfResults);
		      dfd.resolve(arrayOfResults);
	    });
			/*$http.get('app/data/observation.json').then(function(resp){
				// dfd.resolve(resp.data.entry);
				dfd.resolve(resp.data.entry);
			}, function(err){
				console.error('ERR', err);
			});*/
			return dfd.promise;
		}

		var factory = {
			getObservations: getObservations
		};

		return factory;
	});