(function(window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }

    Truck.prototype.createOrder = function(order) {
        console.log('Adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for ' + customerId);
        this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function() {
        var customerIdArray = Object.keys(this.db.getAll());
        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function(id) {
            console.log(this.db.get(id));
        }.bind(this));
    };


    // a new method is created to to return the orders object since the printOrders doesn't have a return statement
    Truck.prototype.getAllOrders = function() {
        var orders = Object(this.db.getAll());
        return orders;
    };

    App.Truck = Truck;
    window.App = App;

})(window);
