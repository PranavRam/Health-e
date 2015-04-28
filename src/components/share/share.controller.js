/**
 * ionSlider - Controller for data for Ion Slider plugin
 * used in Advanced plugin view
 */
function shareCtrl($scope,ObservationsFactory, HumanAPIActivityFactory) {
    ObservationsFactory.getObservations().then(function(data){
        $scope.fhirObservations = data[0];
        console.log(data[1]);
        $scope.observations = _.rest(data);
    })
    HumanAPIActivityFactory.getActivities().then(function(data){
        $scope.activities = data;
        console.log(data);
    });
    HumanAPIActivityFactory.getActivitySummaries().then(function(data){
        $scope.activitySummaries = data;
        console.log(data);
    });
    $scope.journal = [
        "Have you had any luck?",
        "Free infusion set",
        "Animas gets warning letter from the FDA",
        "Sigh…",
        "Walk For The Cure",
        "Diabetes Camp",
        "The Diagnosis: Type 1 Diabetes"
    ]
}

angular.module('health-e')
            .controller('shareCtrl', shareCtrl)