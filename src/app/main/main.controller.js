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
                content: 'Simply dummy text of the printing and typesetting industry.',
                date: '12.10.2015',
                statusClass: 'warning',
                tagName: 'Mark'
            },
            {
                content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.',
                date: '05.04.2015',
                statusClass: 'success',
                tagName: 'Tag'
            },
            {
                content: 'Sometimes by accident, sometimes on purpose (injected humour and the like).',
                date: '16.11.2015',
                statusClass: 'info',
                tagName: 'Mark'
            },
            {
                content: 'All the Lorem Ipsum generators',
                date: '06.10.2015',
                statusClass: 'danger',
                tagName: 'Tag'
            },
            {
                content: 'Which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
                date: '09.12.2015',
                statusClass: 'warning',
                tagName: 'Mark'
            },
            {
                content: 'Packages and web page editors now use Lorem Ipsum as',
                date: '08.04.2015',
                statusClass: 'warning',
                tagName: 'Mark'
            },
            {
                content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.',
                date: '05.04.2015',
                statusClass: 'success',
                tagName: 'Tag'
            },
            {
                content: 'Sometimes by accident, sometimes on purpose (injected humour and the like).',
                date: '16.11.2015',
                statusClass: 'info',
                tagName: 'Tag'
            }
        ];
        $scope.sortableOptions = {
            connectWith: ".connectList"
        };
    });
