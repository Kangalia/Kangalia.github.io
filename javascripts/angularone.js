/* global angular */
angular.module("myApp", [])
    .controller("MyController", function ($scope) {
        $scope.person = {
            fname: "",
            lname: "",
            email: ""
        };
    });