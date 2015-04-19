'use strict'

angular.module('health-e')
	.controller('PrescriptionsCtrl', function($scope, prescriptions){
		$scope.prescriptions = prescriptions;
		console.log(prescriptions)
	});