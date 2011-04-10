describe("Inheritance", function() {

    describe("Standard class", function() {

        beforeEach(function() {
            Mammal = function(name) {
                this.name = name;
            }

            Mammal.prototype.eat = function() { return "I can eat"; }
            Mammal.prototype.drink = function() { return "I can drink"; }

            Cat = function(name) {
                this.name = name;
                this.drink = function() {
                    return "I like milk";
                };
            }

            Cat.inheritsFrom(Mammal);
        });

        it('should have the inheritsFrom method defined', function() {
            expect(Cat.inheritsFrom).toBeDefined();
        });

        it('should provide a new method called inheritsFrom to any "class"', function() {
            expect(new Cat("Garfield").eat).toBeDefined();
        });

        it('should override name from the parent class', function() {
            var cat = new Cat("Felix");
            expect(cat.name).toEqual("Felix");
        });

        it('should inherit "parent" property from base class', function() {
            expect(Cat.prototype.parent).toBeDefined();
        });

        it('should return the base class prototype', function() {
            expect(Cat.prototype.parent).toEqual(Mammal.prototype);
        });

        it('should override the base class drink method, and keep the eat method', function() {
            var cat = new Cat();
            expect(cat.eat()).toEqual("I can eat");
            expect(cat.drink()).toEqual("I like milk");
        });

        it('should have different cat instances', function(){
            var cat = new Cat("cat1");
            var cat2 = new Cat("cat2");

            expect(cat.name).toEqual("cat1");
            expect(cat2.name).toEqual("cat2");
        });
    });

    describe("Static inheritance", function() {

        beforeEach(function() {
            Engine = (function() {
                return {
                    start: function() {
                        return "Vrrroom";
                    },

                    brake: function() {
                        return "Screeech";
                    }
                }
            })();

            Car = function() {
            };

            Boat = function() {
                this.start = function() {
                    return "toot toot";
                };
            };

            Car.inheritsFrom(Engine);
        });

        it('should inherit the start method', function() {
            expect(new Car().start()).toEqual("Vrrroom");
        });

        it('should inherit "parent" property from base class', function() {
            expect(Car.prototype.parent).toBeDefined();
        });

        it('should return the base class prototype', function() {
            expect(Car.prototype.parent).toEqual(Engine);
        });

        it('should override the base class start method, and keep the brake method', function() {
            Boat.inheritsFrom(Engine);
            var boat = new Boat();
            expect(boat.start()).toEqual("toot toot");
            expect(boat.brake()).toEqual("Screeech");
        });
    });
})
