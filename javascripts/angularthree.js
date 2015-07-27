angular.module("myApp", [])
.directive("name", function() {
    return {
        scope: true,
        restrict: "AEC",
        link: function (scope, elem, attr) {
            scope.fullname = attr.first + " " + attr.last
        },
        replace: true,
        template: "<h1>{{ fullname }}</h1>"
    }
});