'use strict';

/**
 * @ngdoc directive
 * @name validationDirectiveApp.directive:password
 * @description
 * # password
 */
angular.module('validationDirectiveApp')
    .directive('password', function () {
        return {
            templateUrl: 'views/templates/password.tpl.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    });
