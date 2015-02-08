# jsdatepicker
A simple and easy to customise javascript datepicker.

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
