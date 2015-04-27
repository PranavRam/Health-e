'use strict';

angular.module('health-e')
  .controller('MainCtrl', function ($scope) {

        this.userName = 'Pranav Ram';
        this.helloText = 'Welcome To Health-e';
        this.descriptionText = 'Take charge of your own data!';

        this.LineChart = {
            data: [5, 9, 7, 3, 5, 2, 5, 3, 9, 6, 5, 9, 4, 7, 3, 2, 9, 8, 7, 4, 5, 1, 2, 9, 5, 4, 7],
            options: {
                fill: '#1ab394',
                stroke: '#169c81',
                width: 64
            }
        };

        this.BarChart = {
            data: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2, 4, 7, 3, 2, 7, 9, 6, 4, 5, 7, 3, 2, 1, 0, 9, 5, 6, 8, 3, 2, 1],
            options: {
                fill: ["#1ab394", "#d7d7d7"],
                width: 100
            }
        };

        this.BarChart2 = {
            data: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2],
            options: {
                fill: ["#1ab394", "#d7d7d7"],
            }
        };

        $scope.todoList = [
            {
                content: 'Check your blood sugar levels since your last visit and review your target range.',
                date: '12.10.2015',
                statusClass: 'warning',
                tagName: 'assets/images/profile_small.jpg',
                provider: 'doom'
            },
            {
                content: 'The Pancreas and Blood Tests',
                date: '05.04.2015',
                statusClass: 'success',
                tagName: 'assets/images/a1.jpg',
                provider: 'dolittle'
            },
            {
                content: 'Check your blood pressure and start or adjust treatment, if needed. Nerve and blood vessel damage can result from high blood pressure, leading to heart problems and strokes.',
                date: '16.11.2015',
                statusClass: 'info',
                tagName: 'assets/images/profile_small.jpg',
                provider: 'doom'
            },
            {
                content: 'Check your feet for signs of problems, especially if you have had diabetes for a few years. Nerve damage in your feet makes it hard to feel an injury or infection. Take off your socks each time you see the doctor to be sure you both remember to check your feet. ',
                date: '06.10.2015',
                statusClass: 'danger',
                tagName: 'assets/images/profile_small.jpg',
                provider: 'doom'
            },
            {
                content: 'Secretin Stimulation Test',
                date: '09.12.2015',
                statusClass: 'warning',
                tagName: 'assets/images/a1.jpg',
                provider: 'dolittle'
            },
            {
                content: 'Have a hemoglobin A1c test. This blood test shows how steady your blood sugar levels have been over time.',
                date: '08.04.2015',
                statusClass: 'warning',
                tagName: 'assets/images/profile_small.jpg',
                provider: 'doom'
            },
            {
                content: 'Fecal Elastase Test',
                date: '05.04.2015',
                statusClass: 'success',
                tagName: 'assets/images/a1.jpg',
                provider: 'dolittle'
            },
            {
                content: 'Computed Tomography (CT) Scan With Contrast Dye',
                date: '16.11.2015',
                statusClass: 'info',
                tagName: 'assets/images/a1.jpg',
                provider: 'dolittle'
            }
        ];
        $scope.sortableOptions = {
            connectWith: ".connectList"
        };


        $scope.getOpacity = function(task){
            if(!$scope.selectedProvider) return "show-full-opacity";
            if($scope.selectedProvider === task.provider) return "show-full-opacity";
            return "show-lower-opacity";
        }

        $scope.selectProvider = function(provider){
            $scope.selectedProvider = provider;
        }
    });
