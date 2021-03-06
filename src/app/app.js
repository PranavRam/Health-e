'use strict';

angular.module('health-e', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 
    'ngResource', 'ui.router', 'mwl.calendar', 'ui.bootstrap', 'summernote', 'angular-peity', 'datePicker', 
    'isteven-multi-select', 'angularChart', 'ui.sortable'])
  .run(function ($state, $rootScope, $log) {
     $rootScope.$state = $state;
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "components/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "app/main/main.html",
            resolve: {
                observations: function(ObservationsFactory){
                    return ObservationsFactory.getObservations();
                }
            },
            controller: function($scope, observations, $modal){
                function ModalInstanceCtrl ($scope, $modalInstance, data) {
                    console.log(data)
                    $scope.title = data.title;
                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };


                    $scope.dataset = data.originalData;
                    $scope.schema = {
                      createdAt: {
                        type: 'datetime',
                        format: '%Y-%m-%dT%H:%M:%S.%LZ',
                        name: 'Date'
                      }
                    };
                    $scope.options = {
                      rows: [{
                        key: 'value',
                        name: 'Value',
                        type: 'bar'
                      }],
                      xAxis: {
                        key: 'createdAt',
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

                };
                $scope.open3 = function (size, observation) {
                    var modalInstance = $modal.open({
                        templateUrl: 'components/modals/modal_example3.html',
                        size: size,
                        controller: ModalInstanceCtrl,
                        resolve: {
                          data: function () {
                            return observation;
                          }
                        }
                    });
                };
                $scope.outputBrowsers = ['Type 1 Diabetes'];
                $scope.selectedProvider = "";
                function filterOutliers(someArray) {  

                    // Copy the values, rather than operating on references to existing values
                    var values = someArray.concat();

                    // Then sort
                    values.sort( function(a, b) {
                            return a - b;
                         });

                    /* Then find a generous IQR. This is generous because if (values.length / 4) 
                     * is not an int, then really you should average the two elements on either 
                     * side to find q1.
                     */     
                    var q1 = values[Math.floor((values.length / 4))];
                    // Likewise for q3. 
                    var q3 = values[Math.ceil((values.length * (3 / 4)))];
                    var iqr = q3 - q1;

                    // Then find min and max values
                    var maxValue = q3 + iqr*1.5;
                    var minValue = q1 - iqr*1.5;

                    // Then filter anything beyond or beneath these values.
                    var filteredValues = someArray.filter(function(x) {
                        return (x < maxValue) && (x > minValue);
                    });

                    // Then return
                    return filteredValues;
                }
                var humanAPIReadings = _.rest(observations);
                $scope.humanAPIReadings = _.map(humanAPIReadings, function(readings){
                    return {
                        title: readings.name,
                        data: filterOutliers(_.pluck(readings.data, function(){
                            if(readings.name === "Blood Pressure") return 'heartRate'
                            return 'value';
                        }())),
                        unit: readings.data[0].unit,
                        latest: readings.data[0].updatedAt,
                        originalData: readings.data,
                        options: {
                            fill: ["#1ab394", "#d7d7d7"],
                            width: 100
                        }
                    }
                });
                // $scope.humanAPIReadingChunkcs = _.chunk(humanAPIReadings, 2);
                // console.log($scope.humanAPIReadings);
                /*$scope.bloodGlucoseReadings = observations[1];
                console.log(filterOutliers(_.pluck($scope.bloodGlucoseReadings, 'value')));
                $scope.bloodGlucoseReadingsChartData = {
                    data: filterOutliers(_.pluck($scope.bloodGlucoseReadings, 'value')),
                    options: {
                        fill: ["#1ab394", "#d7d7d7"],
                        width: 100
                    }
                }*/
                $scope.modernBrowsers = [
                  { name: 'Type 1 Diabetes',  ticked: true  },
                  { name: 'Chronic Renal Failure', ticked: false }
                ];

                $scope.toggleInputFor = function(observation){
                  observation.showInput = !observation.showInput;
                }

                observations = _.groupBy(_(observations[0].data.entry)
                                    .reverse().value(), function(n) {
                                      return n.content.name.coding[0].display;
                                    });
                var temp = [];
                _.forIn(observations, function(value, key) {
                    function getChartData(){
                      return _.compact(_.map(value, function(n){
                        // console.log(n.content);
                        if(typeof n.content.valueQuantity === 'undefined') 
                          return undefined;
                        return n.content.valueQuantity.value;
                      }));
                    }

                    var obj = {};
                    obj['showInput'] = false;
                    obj['title'] = _.capitalize(key);
                    obj['values'] = value;
                    obj['chart'] = {
                      data: getChartData(),
                      options: {
                          fill: ["#1ab394", "#d7d7d7"],
                          width: 100
                      }
                    }
                    temp.push(obj);
                });
                // console.log(_.values(temp));
                // $scope.observationChunks = _.chunk(temp, 2);
                $scope.observations = temp;
                // $scope.observations = temp;
                // console.log($scope.observationChunks);
                /*$scope.barChart = {
                    data: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2, 4, 7, 3, 2, 7, 9, 6, 4, 5, 7, 3, 2, 1, 0, 9, 5, 6, 8, 3, 2, 1],
                    options: {
                        fill: ["#1ab394", "#d7d7d7"],
                        width: 100
                    }
                };*/
                $scope.fSelectNone = function(){
                    $scope.outputBrowsers = []
                }
                $scope.shouldShowCard = function(observation){
                    if(observation.chart.data.length === 0 && $scope.outputBrowsers.length > 0) return false;
                    return true;
                }
            }
        })
        .state('index.related', {
            url: "/forums",
            abstract: true,
            templateUrl: "app/minor/minor.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.related.forum', {
            // parent: 'index.related',
            url: "/:type",
            templateUrl: "app/minor/forum_detail.html",
            data: { pageTitle: 'Type 1 Diabetes' }
        })
        .state('index.related.forums', {
            url: "",
            templateUrl: "app/minor/minor2.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.providers', {
            url: "/providers",
            templateUrl: "app/providers/providers.html",
            data: { pageTitle: 'Primary Care Providers' }
        })
        .state('index.provider', {
            url: "/providers/:provider",
            templateUrl: "app/minor/minor.html",
            data: { pageTitle: 'Primary Care Providers' }
        })
        .state('index.prescriptions', {
            url: "/prescriptions",
            templateUrl: "app/prescriptions/prescriptions.html",
            controller: 'PrescriptionsCtrl',
            resolve: {
                prescriptions: function(PrescriptionFactory){
                    return PrescriptionFactory.getPrescriptions();
                }
            }
        })
        .state('index.journal', {
            url: "/journal",
            abstract: true,
            templateUrl: "components/journal/journal_index.html"
        })
        .state('index.journal.all', {
            url: "",
            templateUrl: "components/journal/journal.html",
            controller: function($rootScope, $state){
                $rootScope.$state = $state;
            }
        })
        .state('index.journal.entry', {
            url: "/:article",
            templateUrl: "components/journal/journal_entry.html"
        })
        .state('index.chat', {
            url: "/chat",
            templateUrl: "app/chat/chat.html"
        })
        .state('index.share', {
            url: "/share",
            templateUrl: "components/share/share_index.html"
        })
        .state('index.share_data', {
            url: "/share-data",
            templateUrl: "components/share/share_data.html"
        })

    $urlRouterProvider.otherwise('/index/main');
  })
;
