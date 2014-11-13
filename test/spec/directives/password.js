'use strict';

describe('Directive: password', function () {

    beforeEach(module('validationDirectiveApp'));
    beforeEach(module('views/templates/password.tpl.html'));

    var element,
        scope;

    var findInputElements = function () {
        var inputElements = [];
        var elementsFound = element.find('input');
        for (var i = 0; i < elementsFound.length; i++) {
            inputElements.push(elementsFound.eq(i));
        }
        return inputElements;
    };

    var getPasswordElements = function () {
        return findInputElements().filter(function(element) {
            return element.attr('type') === 'password';
        });
    };

    var getElementsWithName = function (name) {
        return findInputElements().filter(function(element) {
            return element.attr('name') === name;
        });
    };

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        element = $compile('<password></password>')(scope);
        scope.$digest();
    }));

    it('should find two inputs of type password', function () {
        expect(getPasswordElements().length).toBe(2);
    });

    it('should find exactly one input with name password', function () {
        expect(getElementsWithName('password').length).toBe(1);
    });

    it('should init a form called `passwordForm`', function () {
        expect(element.find('form')).toBeDefined();
    });

});
