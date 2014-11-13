'use strict';

describe('Directive: validateEquals', function () {

    beforeEach(module('validationDirectiveApp'));

    var element;
    var scope;
    var modelValue;
    var modelCtrl;
    var TestData;

    beforeEach(inject(function ($rootScope, $compile, Constants) {
        scope = $rootScope.$new();
        TestData = Constants;
        element = angular.element('<form name="testForm"><input name="testInput" ng-model="model.testValue" validate-equals="model.compareTo"></form>');
        element = $compile(element)(scope);
        scope.$digest();
        modelValue = scope.model = {};
        modelCtrl = scope.testForm.testInput;
    }));

    var setCompareTo = function () {
        modelValue.compareTo = TestData.TEXT;
        scope.$digest();
    };

    var setTestValue = function () {
        modelValue.testValue = TestData.TEXT;
        scope.$digest();
    };

    describe('model value changes', function () {

        it('should be invalid if the model changes', function () {
            setTestValue();
            expect(modelCtrl.$valid).toBeFalsy();
            expect(modelCtrl.$viewValue).toBeUndefined();
        });

        it('should be invalid if the reference model changes', function () {
            setCompareTo();
            expect(modelCtrl.$valid).toBeFalsy();
            expect(modelCtrl.$viewValue).toBeUndefined();
        });

        it('should be valid if the modelValue changes to be the same as the reference', function () {
            setCompareTo();
            expect(modelCtrl.$valid).toBeFalsy();

            setTestValue();
            expect(modelCtrl.$valid).toBeTruthy();
            expect(modelCtrl.$viewValue).toBe('different');
        });

    });

    describe('input value changes', function () {

        it('should be invalid if the input value changes', function () {
            // simuliert Eingabe eines Users in Feld
            modelCtrl.$setViewValue(TestData.TEXT);
            expect(modelCtrl.$valid).toBeFalsy();
            expect(modelValue.testValue).toBeUndefined();
        });

        it('should be valid if the input value changes to be the same as the reference', function () {
            setCompareTo();
            expect(modelCtrl.$valid).toBeFalsy();

            modelCtrl.$setViewValue(TestData.TEXT);
            expect(modelCtrl.$viewValue).toBe(TestData.TEXT);
            expect(modelCtrl.$valid).toBeTruthy();
        });

    });
});

angular.module('validationDirectiveApp').constant('Constants', {

    TEXT: 'different'

});
