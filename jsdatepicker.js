'use strict';

var JSDatePicker = function(calendarId, month, year) {
    var exports = {};
    var _onPickedDateCallback;
    var _calendar;
    var _month;
    var _year = year;
    var _weekDays;
    var _months;
    var _lastSelectedDay = -1;
    var _lastSelectedMonth = -1;
    var _lastSelectedYear = -1;
    var _currentDate;
    
    _weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    _months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    _currentDate = new Date();
    _calendar = document.getElementById(calendarId);
    _month = month;
    
    // Setup calendar
    addHeader(_month,_year);
    addWeekDays();
    showMonth(_month,_year);
    
    /**
     * Add the calendar header which includes the 'back', 'title' and 'next' cells.
     *
     * Bind an onclick event to the 'back' and 'next' buttons.
     *
     * @param month the month to display
     * @param year  the year to display
     */
    function addHeader(month, year) {
        var headerElement = document.createElement("div");
        headerElement.className = "header";
        
        var backCellElement = document.createElement("div");
        backCellElement.className = "headerCell backCell";
        var backElement = document.createElement("div");
        backElement.className = "back";
        backElement.addEventListener("click",function() {
            _month--;
            if (_month<0) {
                _month = 11;
                _year--;
            }
            showMonth(_month,_year);
        });
        backCellElement.appendChild(backElement);
        headerElement.appendChild(backCellElement);
        
        var titleCellElement = document.createElement("div");
        titleCellElement.className = "headerCell titleCell";
        
        var titleElement = document.createElement("div");
        titleElement.className = "title";
        titleElement.appendChild(document.createTextNode(_months[month]+', '+year));    
        titleCellElement.appendChild(titleElement);
        headerElement.appendChild(titleCellElement);
        
        var nextCellElement = document.createElement("div");
        nextCellElement.className = "headerCell nextCell";
        
        var nextElement = document.createElement("div");
        nextElement.className = "next";
        nextElement.addEventListener("click",function() {
            _month++;
            if (_month>11) {
                _month = 0;
                _year++;
            }
            showMonth(_month,_year);
        });
        
        nextCellElement.appendChild(nextElement);
        headerElement.appendChild(nextCellElement);
        
        _calendar.appendChild(headerElement);
    }
    
    /**
     * Display the week days (Mon, Tue, etc).
     *
     * 
     *
     */
    function addWeekDays() {
        var weekElement = document.createElement("div");
        weekElement.className = "week";
        
        for (var i=0; i<_weekDays.length; i++) {
            var weekDayWrapperElement = document.createElement("div");
            weekDayWrapperElement.className = "weekDayWrapper";
            
            var weekDayElement = document.createElement("div");
            weekDayElement.className = "weekDay";
            weekDayElement.appendChild(document.createTextNode(_weekDays[i]));
            
            weekDayWrapperElement.appendChild(weekDayElement);
            weekElement.appendChild(weekDayWrapperElement);
        }
        _calendar.appendChild(weekElement);
    }
    
    /**
     * Shows the days of the month (e.g.: 1..31).
     *
     * Bind an onclick event to every 'day' element that triggers the '_onPickedDateCallback' callback function
     *
     * @param month the month to display
     * @param year  the year
     */
    function showMonth(month, year) {
        console.log('Showing month '+month+' of year '+year);
        
        // onclick event handler
        var onclickWrapper = function(day, month, year) {
            return function callback() {
                var d = day;
                var m = month;
                var y = year;
                pickedDate(this, d, m, y);
            }
        }
            
        // Update header title to show correct month
        var title = _calendar.getElementsByClassName('title');
        title[0].innerHTML = _months[month]+', '+year;
        
        // Remove current day elements
		removeDays();
        
        // Find out what day of the week the first of the month is. Sunday is day 0, Monday is day 1, and so on.
        var first = (new Date(year, month, 1)).getDay();
        first = (first + 6)%7;
        var previousYear = year;
        var previousMonth = month - 1;
        if (previousMonth < 0) {
            previousMonth = 11;
            previousYear = previousYear--;
        }  

        // When the 1st of the requested month is day 5, we need to fill days 0-4 with the
        // last 5 days of the previous month.
        var daysPreviousMonth = 32 - new Date(previousYear, previousMonth, 32).getDate();
        for (var i=first-1; i>=0; i--) {
            var dayWrapperElement = document.createElement("div");
            dayWrapperElement.className = "dayWrapper";
            
            var dayElement = document.createElement("div");
            dayElement.className = "day previousMonth";

            var day = daysPreviousMonth - i;
            dayElement.appendChild(document.createTextNode(day));

			// Check if we have selected this date before changing months. If so selected it again.
	        if (day==_lastSelectedDay && previousMonth == _lastSelectedMonth && previousYear == _lastSelectedYear) {
		        dayElement.classList.add('selected');
	        }
        
			if (day==_currentDate.getDate() && previousMonth == _currentDate.getMonth() && previousYear == _currentDate.getFullYear()) {
		        dayElement.classList.add('currentDay');
	        }
	        
            dayElement.addEventListener("click",onclickWrapper(day,previousMonth,previousYear));           
            dayWrapperElement.appendChild(dayElement);
            _calendar.appendChild(dayWrapperElement);
        }
        
		// Fill in the day for the requested month
        var daysCurrentMonth = 32 - new Date(year, month, 32).getDate();
        for (var day=1; day<=daysCurrentMonth; day++) {
            var dayWrapperElement = document.createElement("div");
            dayWrapperElement.className = "dayWrapper";
            
            var dayElement = document.createElement("div");
            dayElement.className = "day";
            dayElement.appendChild(document.createTextNode(day));
            
            if (day==_lastSelectedDay && month == _lastSelectedMonth && year==_lastSelectedYear) {
				dayElement.classList.add('selected');
        	}
        
			if (day==_currentDate.getDate() && month == _currentDate.getMonth() && year == _currentDate.getFullYear()) {
		        dayElement.classList.add('currentDay');
	        }
	        
            dayElement.addEventListener("click",onclickWrapper(day, month, year));
            dayWrapperElement.appendChild(dayElement);
            _calendar.appendChild(dayWrapperElement);
        }
        
        // Fill rest of grid with the days of the next month
        var nextYear = year;
        var nextMonth = month + 1;
        if (nextMonth>11) {
            nextMonth = 0;
            nextYear++;
        }
        var rows = 6; // Number of rows we want to show in our grid 
        var gridSize = rows*_weekDays.length;        
		var rest = gridSize  - (daysCurrentMonth + Math.max(0,first));
        for (var day=1; day<=rest; day++) {
            var dayWrapperElement = document.createElement("div");
            dayWrapperElement.className = "dayWrapper";
            
            var dayElement = document.createElement("div");
            dayElement.className = "day nextMonth";
            
            dayElement.appendChild(document.createTextNode(day));
            
            if (day==_lastSelectedDay && nextYear == _lastSelectedMonth && nextYear==_lastSelectedYear) {
				dayElement.classList.add('selected');
        	}
        	
        	if (day==_currentDate.getDate() && nextMonth == _currentDate.getMonth() && nextYear == _currentDate.getFullYear()) {
		        dayElement.classList.add('currentDay');
	        }
	        
            dayElement.addEventListener("click",onclickWrapper(day,nextMonth,nextYear));  
            dayElement.appendChild(document.createTextNode('')); 
            dayWrapperElement.appendChild(dayElement);
            _calendar.appendChild(dayWrapperElement);
        }
    }
    
    ////////////////////////////////////////////////
    // HELPERS
    ////////////////////////////////////////////////
    
    /**
     * Delete any current 'day' elements in the _calendar
     *
     * 
     *
     */
    function removeDays() {
	    // Remove any existing days
        var days = _calendar.getElementsByClassName('dayWrapper');
        while(days[0]) {
            days[0].parentNode.removeChild(days[0]);
        }

    }
    
    /**
     * Unselectd any current selected 'day' elements in the _calendar
     *
     * 
     *
     */
    function clearSelections() {
        var days = _calendar.getElementsByClassName('day');
        for (var i=0; i<days.length; i++) {
            if (days[i].classList.contains('selected')) {
                days[i].classList.remove('selected');   
            }
        }  
    }
     
    ////////////////////////////////////////////////
    // HANDLERS
    //////////////////////////////////////////////// 

    /**
     * Called in onClick() of a 'day' element.
     *
     * @param element the DOM element
     * @param day the picked day (1,2,3,4, etc)
     * @param month the picked month (0..11)
     * @param year the picked year
     */
    function pickedDate(elem, day, month, year) {
        clearSelections();
        if (day != _lastSelectedDay || month != _lastSelectedMonth || year != _lastSelectedYear) {
	        elem.classList.add('selected');
	        _lastSelectedDay = day;
	        _lastSelectedMonth = month;
	        _lastSelectedYear = year;
        } else {
	    	_lastSelectedDay = -1;
	    	_lastSelectedMonth = -1;
	    	_lastSelectedYear = -1;
	    }
        _onPickedDateCallback(_lastSelectedDay, _lastSelectedMonth, _lastSelectedYear);
    }   
    
    ////////////////////////////////////////////////
    // PUBLIC METHODS
    ////////////////////////////////////////////////
    
    /**
     * Public method used for setting a callback method that should be called when a
     * day gets selected.
     * 
     *
     */
    function onPickedDate(callback) {
        _onPickedDateCallback = callback;
    }   
     
    /**
     * Returns an array ([day, month, year]) representation of the current selected date.
     * 
     * If no date is selected array value is [-1, -1, -1]
     *
     */
    function getSelectedDate() {
	    return [_lastSelectedDay, _lastSelectedMonth, _lastSelectedYear];
    }
    
    ////////////////////////////////////////////////
    // EXPORT PUBLIC METHODS
    ////////////////////////////////////////////////
    
    exports.onPickedDate    = onPickedDate;
    exports.getSelectedDate = getSelectedDate;
    return exports;
}
