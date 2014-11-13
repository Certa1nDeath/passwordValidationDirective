'use strict';

/**
 * @ngdoc directive
 * @name validationDirectiveApp.directive:validateEquals
 * @description
 * # validateEquals
 */
angular.module('validationDirectiveApp')
    .directive('validateEquals', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function postLink(scope, element, attrs, ngModelCtrl) {

                function validateEqual(myValue) {
                    var valid = (myValue === scope.$eval(attrs.validateEquals));
                    ngModelCtrl.$setValidity('equal', valid);
                    return valid ? myValue : undefined;
                }

                ngModelCtrl.$parsers.push(validateEqual);
                ngModelCtrl.$formatters.push(validateEqual);

                // wenn sich das Comparing Model ändert
                scope.$watch(attrs.validateEquals, function() {
                    // führt dazu die $parsers Pipeline zu starten
                   ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
                });
            }
        };
    });
