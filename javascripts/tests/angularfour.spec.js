(function() {
    describe("withErrors", function() {
        var scope, form, input, _setFormErrors;
        beforeEach(inject(function($compile, $rootScope, setFormErrors) {
            scope = $rootScope.$new();
            _setFormErrors = setFormErrors;

            form = $compile(
                '<form with-errors name="testForm">' +
                '<input name="foo" ng-model="foo" value="bar" required />' +
                '<fielderrors for="foo"></fielderrors>' +
                '</form>'
            )(scope);

            input = form.find('input');

            scope.$apply();
        }));

        it('displays form errors', function() {
            input.val('').trigger('input');
            expectErrorsFor(form).toEqual('This field is required');
        });

        it('displays errors set via setFormErrors service', function() {
            _setFormErrors({
                formName: 'testForm',
                fieldErrors: {
                    foo: ['foo is bar']
                }
            });
            expectErrorsFor(form).toEqual('foo is bar');
        });

        function expectErrorsFor(form) {
            var errorElement = form.find('.fielderror');
            expect(errorElement.length).toEqual(1);
            return expect(errorElement.text().trim());
        }
    })
}());