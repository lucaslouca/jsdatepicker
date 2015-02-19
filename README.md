# jsdatepicker
A simple and easy to customise javascript datepicker.

<a href="http://lucaslouca.github.io/jsdatepicker/" target="_blank">Demo</a>

<img src="https://cloud.githubusercontent.com/assets/10542894/6098126/5b1ea5d4-afd5-11e4-8665-53b481bab334.png" width="450"/>

## How to use it

Include the neccesary stylesheet and javascript files:
```
<link rel="stylesheet" type="text/css" href="jsdatepicker.css" media="screen" />
<script src='jsdatepicker.js'></script>
```

Include a simple div to hold your datepicker:
```
<div id="myDatePicker" class="jsDatePicker"></div>
```

Initialise the date picker (e.g. with the current date):
```
<script>
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	
    var datePicker = new JSDatePicker('myDatePicker',month,year);
    datePicker.onPickedDate(function(day,month,year) {
			console.log('Picked day '+day+'/'+month+'/'+year);
    });	
</script>
```

## Public methods

> `onPickedDate(handler)`

>**handler**

>Type: Function(element, day, month, year)

>A function to execute when a date is picked. The `element` is the day element clicked. `day`, `month` and `year` is the selected date. 

<br>

> `getSelectedDate()`

>Returns an array (`[day, month, year]`) representation of the current selected date. If no date is selected array value is `[-1, -1, -1]`.
