'use strict';

function SleepCtrl($scope, HumanAPISleepFactory){
	$scope.sleeps = [];
	$scope.sleepsSummaries = [];
	HumanAPISleepFactory.getReadings().then(function(data){
		$scope.sleeps = data.data;
		console.log($scope.sleeps);
	});

	HumanAPISleepFactory.getSummaries().then(function(data){
		$scope.sleepsSummaries = data.data;
	});

	$scope.optionsSummaries = {
      rows: [{
        key: 'timeAwake'
      }, {
        key: 'timeAsleep'
      }],
      type: 'bar',
      groups: [
        ['timeAwake', 'timeAsleep']
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

	/*$scope.$watch('activities', function(){
		var nested_data = d3.nest()
		.key(function(d) { return d.type; })
		.rollup(function(types) { return types.length; })
		.entries($scope.activities);
		var activitiesOpts = [];
		nested_data = _.map(nested_data, function(data){
			var temp = {};
			temp.key = data.key;
			temp.type = 'pie';
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
		type: 'pie'
	}*/
	// $scope.dataset = $scope.sleeps;
	$scope.schema = {
	  day: {
	    type: 'datetime',
	    format: '%Y-%m-%d',
	    name: 'Date'
	  }
	};

	$scope.options = {
	  rows: [{
	    key: 'efficiency',
	    name: 'Efficiency',
	    type: 'bar'
	  }],
	  xAxis: {
	    key: 'day',
	    displayFormat: '%Y-%m-%d'
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

	$scope.optionsSections = {
	  rows: [{
	    key: 'timeAsleep',
	    name: 'Time Asleep'
	  }, {
	  	key: 'timeAwake',
	  	name: 'Time Awake'
	  }, {
	  	key: 'timeToFallAsleep',
	  	name: 'Time To Fall Asleep'
	  }, {
	  	key: 'timeAfterWakeup',
	  	name: 'Time After Wakeup'
	  }, {
	  	key: 'timeInBed',
	  	name: 'Time In Bed'
	  }],
	  xAxis: {
	    key: 'day',
	    displayFormat: '%Y-%m-%d'
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
	.controller('SleepCtrl', SleepCtrl)