/*
 *
 * Copyright (c) 2007 Sam Collett (http://www.texotela.co.uk)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Version 1.0a
 * Demo: http://www.texotela.co.uk/code/jquery/countdown/
 *
 * $LastChangedDate$
 * $Rev$
 *
 */
 
(function($) {
/*
 * Count down to an event
 *
 * @name     countdown
 * @param    eventDate      When the event occurs
 * @param    options Hash with the following options:
 *  precision: 'd' - to the day, 'h' - to the hour, 'm' - to the minute, 's' (default) - to the second
 *  prefix: text to go before the countdown
 *  suffix: text to go after the countdown
 *  passed: text to show when the event has passed
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @example  $("#newYear").countdown(new Date(2008,0,1));
 *
 */
 
$.fn.countdown = function(eventDate, options)
{
  console.log('Timer on!');
  
	options = jQuery.extend( { precision:'s', prefix:'', suffix:'', passed:'', ongoing:'', nextup:'' }, options);
	// day, hour, minute and second in milliseconds
	var dMs = 864E5; var hMs = 36E5; var mMs = 6E4; var sMs = 1E3;
	doCountDown = function(el)
	{
	  
	  
		var now = new Date();
		var diff = el.dt - now;
		if(diff <= 0)
		{
			$(el).html(el.o.passed);
			
			console.log('Time is up');
			$("#timeout").fadeIn();
			setTimeout('$("#timeout").fadeOut()', 10000);
			
			//This one is done
			$.ajax({
			  url: '/jsonapi/presentations/update/',
			  type: 'POST',
        dataType: 'json',
       data: {presentation_id: el.o.ongoing, status_id: '2'},
        complete: function(xhr, textStatus) {
          //called when complete
        },
        success: function(data, textStatus, xhr) {
          //called when successful
          console.log('Presentation ' + el.o.ongoing + ' is done!');
        },
        error: function(xhr, textStatus, errorThrown) {
          //called when there is an error
			  }
     });
     
     	//This one is up next
			$.ajax({
			  url: '/jsonapi/presentations/update/',
			  type: 'POST',
        dataType: 'json',
       data: {presentation_id: el.o.nextup, status_id: '3'},
        complete: function(xhr, textStatus) {
          //called when complete
        },
        success: function(data, textStatus, xhr) {
          //called when successful
          console.log('Presentation ' + el.o.nextup + ' is cued!');
        },
        error: function(xhr, textStatus, errorThrown) {
          //called when there is an error
			  }
     });
			
			
			clearInterval(el.countdown);
			return;
		}
		var output = [];
		var days = Math.floor(diff/dMs);
		diff -= days * dMs;
		var hours = Math.floor(diff/hMs);
		diff -= hours * hMs;
		var minutes = Math.floor(diff/mMs);
		diff -= minutes * mMs;
		var seconds = Math.floor(diff/sMs);
		diff -= seconds * sMs;
		// how precise does it have to be?
		switch (el.o.precision)
		{
			case 'd':
				output = [days," day",(days != 1 ? "s": "")];
				break;
			case 'h':
				output = [days," day",(days != 1 ? "s": "")," and ",hours," hour",(hours != 1 ? "s": "")];
				break;
			case 'm':
				output = [days," day",(days != 1 ? "s": ""),", ",hours," hour",(hours != 1 ? "s": "")," and ",minutes," minute",(minutes != 1 ? "s": "")];
				break;
			case 's':
				output = [days," day",(days != 1 ? "s": ""),", ",hours," hour",(hours != 1 ? "s": ""),", ",minutes," minute",(minutes != 1 ? "s": "")," and ",seconds," second",(seconds != 1 ? "s": "")];
				break;
			case 'simple':
        // output = [ (minutes < 10 ? "0" : ""), minutes, ":", (seconds < 10  ? "0" : ""), seconds ];
				output = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10  ? "0" : "") + seconds;
				break;
			default:
				break;
		}
		if(output.length !== 0)
		{
			$(el).html(output);
		}
	};
	this.each(
		function()
		{
			var el = this;
			el.o = options;
			el.dt = eventDate;
			// run now
			doCountDown(el);
			// get date details
			var now = new Date();
			var year = now.getFullYear(); var month = now.getMonth(); var day = now.getDate();
			var hour = now.getHours(); var minute = now.getMinutes(); var second = now.getSeconds();
			// determine how often to run
			switch (el.o.precision)
			{
				case 'h':
					// first run on the next hour
					var nextHour = new Date(year, month, day, hour + 1);
					setTimeout(
						function()
						{
							doCountDown(el);
							// then every hour from then
							el.countdown = setInterval(function(){doCountDown(el);},hMs);
						},
						(nextHour - now)
					);
					break;
				case 'm':
					// first run on the next minute
					var nextMinute = new Date(year, month, day, hour, minute + 1);
					setTimeout(
						function()
						{
							doCountDown(el);
							// then every minute from then
							el.countdown = setInterval(function(){doCountDown(el);},mMs);
						},
						(nextMinute - now)
					);
					break;
				case 's':
					// first run on the next second
					var nextSecond = new Date(year, month, day, hour, minute, second + 1);
					setTimeout(
						function()
						{
							doCountDown(el);
							// then every second from then
							el.countdown = setInterval(function(){doCountDown(el);},sMs);
						},
						(nextSecond - now)
					);
					break;
				case 'simple':
					// first run on the next second
					var nextSecond = new Date(minute, second + 1);
					setTimeout(
						function()
						{
							doCountDown(el);
							// then every second from then
							el.countdown = setInterval(function(){doCountDown(el);},sMs);
						},
						(nextSecond - now)
					);
					break;
				default:
					break;
			}
		}
	);
	return this;
};

})(jQuery);