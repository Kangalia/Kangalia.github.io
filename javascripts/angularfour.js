angular.module("signUpApp", [])
    .controller("signUpController", ["$scope", "$q", "setFormErrors",
        function ($scope, $q, setFormErrors) {
            var serverErrors = this.serverErrors = {};

            this.signup = function (user) {
                fakeUserCreate(user).then(function () {
                    // success
                }, function (errors) {
                    // failure
                    setFormErrors ({
                        formName: "signUpForm",
                        fieldErrors: errors
                    });
                });
            };

            function fakeUserCreate() {
                return $q.reject({username: ["This name is taken!"]});
            }
        }])
    .factory("setFormErrors", function () {
        var withErrorControls = [];
        var setFormErrors = function (opts) {
            var fieldErrors = opts.fieldErrors;
            var ctrl = withErrorControls[opts.formName];

            Object.keys(fieldErrors).forEach(function (fieldName) {
                ctrl.setErrorsFor(fieldName, fieldErrors[fieldName]);
            });
        };

        setFormErrors._register = function (formName, ctrl) {
            withErrorControls[formName] = ctrl;
        };

        return setFormErrors;
    })
    .directive("withErrors", ["setFormErrors", function (setFormErrors) {
        return {
            restrict: "A",
            require: "withErrors",
            controller: ["$scope", "$element", function ($scope, $element) {
                var controls = {};
                this.addControl = function (fieldName, ctrl) {
                    controls[fieldName] = ctrl;
                };
                this.setErrorsFor = function (fieldName, errors) {
                    if (!(fieldName in controls)) return;
                    return controls[fieldName].setErrorsFor(errors);
                };
                this.clearErrorsFor = function (fieldName, errors) {
                    if (!(fieldName in controls)) return;
                    return controls[fieldName].clearErrorsFor(errors);
                };
            }],
            link: function (scope, element, attrs, ctrl) {
                setFormErrors._register(attrs.name, ctrl);
            }
        };
    }])
    .directive("input", function () {
        return {
            restrict: "E",
            require: ["?ngModel", "?^withErrors"],
            scope: true,
            link: function (scope, element, attrs, ctrls) {
                var ngModelCtrl = ctrls[0];
                var withErrorsCtrl = ctrls[1];
                var fieldName = attrs.name;

                if (!ngModelCtrl || !withErrorsCtrl) return;

                scope.$watch(attrs.ngModel, function () {
                    if (ngModelCtrl.$dirty && ngModelCtrl.$invalid) {
                        withErrorsCtrl.setErrorsFor(fieldName, errorMessagesFor(ngModelCtrl));
                    } else if (ngModelCtrl.$valid) {
                        withErrorsCtrl.clearErrorsFor(fieldName);
                    }
                });
                var errorMessages = {
                    required: "This field is required",
                    pattern: "This field does not match pattern",
                    minlength: "This field is too long",
                    maxlength: "This field is too short"
                };

                function errorMessagesFor(ngModelCtrl) {
                    return Object.keys(ngModelCtrl.$error).map(function (key) {
                        if (ngModelCtrl.$error[key]) return errorMessages[key];
                        else return null;
                    }).filter(function (msg) {
                        return msg !== null;
                    });
                }
            }
        }
    })
    .directive("fielderrors", function () {
        return {
            restrict: "E",
            replace: true,
            scope: true,
            require: ["fielderrors", "^withErrors"],
            template:
            "<div ng-repeat='error in errors'>" +
                "<small class='error'>{{ error }}</small>" +
            "</div>",
            controller: ["$scope", function ($scope) {
                $scope.errors = [];
                this.setErrors = function (errors) {
                    $scope.errors = errors;
                };
                this.clearErrors = function () {
                    $scope.errors = []
                };
            }],
            link: function (scope, element, attrs, ctrls) {
                var fieldErrorsCtrl = ctrls[0];
                var withErrorsCtrl = ctrls[1];

                withErrorsCtrl.addControl(attrs.for, fieldErrorsCtrl);
            }
        };
    });