(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }

        $('.powerUP').hide();

        var slider = document.getElementById('strengthLevel');
        var sliderOutput = document.getElementById('strengthOutput');
        var sliderLabel = document.getElementById('strengthLabel');

        // set initial color due to default 30 value
        sliderOutput.style.color = 'green';
        sliderLabel.style.color = 'green';

        slider.addEventListener('input', function() {
            sliderOutput.value = slider.value;
            // change the color of the label and number based on intensity
            var intensityColor;
            if (slider.value < 33) {
                sliderOutput.style.color = 'green';
                sliderLabel.style.color = 'green';
            } else if (slider.value < 67) {
                sliderOutput.style.color = 'orange';
                sliderLabel.style.color = 'orange';
            } else {
                sliderOutput.style.color = 'red';
                sliderLabel.style.color = 'red';
            }
            sliderOutput.style.color = intensityColor;
            sliderLabel.style.color = intensityColor;
        });


    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);

            if (data['size'] == 'Coffee-zilla' && data['flavor'] != '' && data['strength'] == 100) {
                $('#myModal').modal();
                $('.powerUP').show();
            }

            fn(data);

            this.reset();
            this.elements[0].focus();

        });

    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
