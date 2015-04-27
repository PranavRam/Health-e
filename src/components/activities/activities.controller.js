'use strict';

function ActivityCtrl($scope, HumanAPIActivityFactory){
	$scope.activities = [];
	$scope.activitySummaries = [];
	HumanAPIActivityFactory.getActivities().then(function(data){
		$scope.activities = data;
	});

	HumanAPIActivityFactory.getActivitySummaries().then(function(data){
		$scope.activitySummaries = data;
		console.log(data);
	});

	$scope.optionsSummaries = {
      rows: [{
        key: 'vigorous'
      }, {
        key: 'moderate'
      }, {
        key: 'light'
      }, {
        key: 'sedentary'
      }],
      type: 'bar',
      groups: [
        ['vigorous', 'moderate', 'light', 'sedentary']
      ],
      xAxis: {
        key: 'date',
        displayFormat: '%m-%d'
      },
  	  "subchart": {
        "selector": true,
        "show": true
      },
      "zoom": {
        "range": [
          1.1,
          3.9
        ]
      }
    };

   $scope.schemaSummaries = {
     date: {
       type: 'datetime',
       format: '%Y-%m-%d',
       name: 'Date'
     }
   };

	$scope.$watch('activities', function(){
		var nested_data = d3.nest()
		.key(function(d) { return d.type; })
		.rollup(function(types) { return types.length; })
		.entries($scope.activities);
		var activitiesOpts = [];
		nested_data = _.map(nested_data, function(data){
			var temp = {};
			temp.key = data.key;
			temp.type = 'donut';
			temp.name = _.capitalize(data.key);
			activitiesOpts.push(temp);
			data[data.key] = data.values;
			return data;
		});
		$scope.datasetActivities = nested_data;
		$scope.activitiesOptions.rows = activitiesOpts;
		console.log(activitiesOpts, nested_data);

		$scope.dataset = $scope.activities;
	});

	$scope.datasetActivities = [];

	$scope.activitiesOptions = {
		type: 'donut'
	}
	$scope.dataset = [];
	$scope.schema = {
	  createdAt: {
	    type: 'datetime',
	    format: '%Y-%m-%dT%H:%M:%S.%LZ',
	    name: 'Date'
	  }
	};

	$scope.options = {
	  rows: [{
	    key: 'duration',
	    type: 'bar'
	  }, {
	    key: 'distance'
	  }, {
	  	key: 'steps'
	  }, {
	  	key: 'calories'
	  }],
	  xAxis: {
	    key: 'createdAt',
	    displayFormat: '%Y-%m-%d %H:%M:%S.%LZ'
	  },
	  "subchart": {
      "selector": true,
      "show": true
    },
    "zoom": {
      "range": [
        1.1,
        3.9
      ]
    }
	};
}

angular.module('health-e')
	.controller('ActivityCtrl', ActivityCtrl)