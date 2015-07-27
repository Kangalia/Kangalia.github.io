angular.module("usingServicesApp", [])
    .service("MathService", function(){
        this.add = function(a, b) {
            return a + b;
        };
        this.subtract = function(a , b) {
            return a - b;
        };
        this.multiply = function(a, b) {
            return a * b;
        };
        this.divide = function(a, b) {
            return a / b;
        }
    })
    .service("CalculatorService", function(MathService) {
        this.square = function(a) {
            return MathService.multiply(a,a);
        };
        this.cube = function(a) {
          return MathService.multiply(a, MathService.multiply(a,a));
        };
    })
    .service("ContactService", function () {
        //to create unique contact id
        var uid = 1;

        //contacts array to hold list of all contacts
        var contacts = [{
            id: 0,
            'name': 'Viral',
            'email': 'hello@gmail.com',
            'phone': '123-2343-44'
        }];
        //save method create a new contact if not already exists
        //else update the existing object
        this.save = function (contact) {
            if (contact.id == null) {
                //if this is new contact, add it in contacts array
                contact.id = uid++;
                contacts.push(contact);
            } else {
                //for existing contact, find this contact using id
                //and update it.
                for (i in contacts) {
                    if (contacts[i].id == contact.id) {
                        contacts[i] = contact;
                    }
                }
            }

        };
        //simply search contacts list for given id
        //and returns the contact object if found
        this.get = function (id) {
            for (i in contacts) {
                if (contacts[i].id == id) {
                    return contacts[i];
                }
            }

        };
        //iterate through contacts list and delete
        //contact if found
        this.delete = function (id) {
            for (i in contacts) {
                if (contacts[i].id == id) {
                    contacts.splice(i, 1);
                }
            }
        };
        //simply returns the contacts list
        this.list = function () {
            return contacts;
        }
    })
    .controller("CalculatorController", function($scope, CalculatorService){
        $scope.doSquare = function() {
            $scope.answer = CalculatorService.square($scope.number);
        };
        $scope.doCube = function() {
          $scope.answer = CalculatorService.cube($scope.number);
        };
    })
    .controller("contactController", function($scope, ContactService){
        $scope.contacts = ContactService.list();
        $scope.saveContact = function() {
          ContactService.save($scope.newcontact);
            $scope.newcontact = {};
        };

        $scope.delete = function(id) {
            ContactService.delete(id);
            if ($scope.newcontact.id == id)
                $scope.newcontact = {};
        };

        $scope.edit = function(id) {
            $scope.newcontact = angular.copy(ContactService.$get(id));
        };
    });