# jsdatepicker
A simple and easy to customise javascript datepicker.

<a href="http://lucaslouca.github.io/jsdatepicker/">Demo</a>

<img src="https://cloud.githubusercontent.com/assets/10542894/6098126/5b1ea5d4-afd5-11e4-8665-53b481bab334.png" width="450"/>

## How to use it:

Include the neccesary stylesheet and javascript files:
```
<link rel="stylesheet" type="text/css" href="calendar.css" media="screen" />
<script src='calendar.js'></script>
```

Include a simple div to hold your datepicker:
```
<div id="calendar" class="calendarBox"></div>
```

Initialise the calendar (e.g. with the current date):
```
<script>
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	
    var calendarFrom = new Calendar('calendar',month,year);
    calendarFrom.onPickedDate(function(day,month,year) {
			console.log('Picked day '+day+'/'+month+'/'+year);
    });	
</script>
```
