(function (angular) {
    'use strict';
    angular.module('FormExample', ["ngMessages"])
        .directive('ngFocus', [function () {
            var FOCUS_CLASS = "ng-focused";
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, element, attrs, ctrl) {
                    ctrl.$focused = false;
                    element.bind('focus', function (evt) {
                        element.addClass(FOCUS_CLASS);
                        scope.$apply(function () {ctrl.$focused = true;});
                    }).bind('blur', function (evt) {
                        element.removeClass(FOCUS_CLASS);
                        scope.$apply(function () {ctrl.$focused = false;});
                    });
                }
            }
        }])

        .controller('FormController', ['$scope', function ($scope) {

            $scope.user = {
                fname: "",
                lname: "",
                username: "",
                email: "",
                password: "",
                secondpass: ""
            };

            $scope.reset = function (form) {
                if (form) {
                    form.$setPristine();
                    form.$setUntouched();
                }
                $scope.user = {};
            };

            $scope.reset();
        }]);
})(window.angular);