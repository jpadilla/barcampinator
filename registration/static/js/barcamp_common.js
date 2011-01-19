$(document).ready(function(){
  
  if(thanks){
    var old_text = $("#error_pane").html();
    $("#error_pane").html("<span style='font-size:200%;color:green'>☺</span> Thanks for coming, have fun!");
    $("#error_pane").fadeIn('fast', function(){
      setTimeout(function(){
        $("#error_pane").fadeOut('fast', function(){
          $("#error_pane").html(old_text);
        });
      }, 2000);
    });
  }
  
  
  $("#name").focus();
  $("#register_button").hide();
  $("#optional_form_items").hide();
  
  $("#yes_label, #no_label").click(function(){
    if($(this).attr('for') === 'yes'){
      $(this).addClass("selected");
      $("#no_label").removeClass("selected");
      $("#optional_form_items").slideDown('fast', function(){
        var win = $(window)._scrollable();
        win.scrollTo('max', 1000);
      });
      $("#register_button").show();
      $("#horizontal_clear").html("<br /><br /><br /><br />");
      $("#presentation_title").focus();
      
    } else {
      $(this).addClass("selected");
      $("#yes_label").removeClass("selected");
      $("#register_button").show();
      $("#optional_form_items").slideUp('fast');
      $("#horizontal_clear").html("<br /><br /><br /><br />");
    }
  });
  
  $("#register_form form").submit(function(){
	
	$('input:text, select').each(function(index) {
		$(this).removeClass("error");
	});
	
	$('input:text[value=""], select').each(function(index) {
		$(this).addClass("error");
	});
	
	var optional_form_items = true;
	if($("#optional_form_items").is(":visible")){
		if($("#presentation_title").val()===""||$("#category").val()===""){
			var optional_form_items = false;
		}
	}
	
	if($("#name").val()===""||$("#email").val()===""||optional_form_items === false){
		$("#error_pane").html("<span class='error_face'>☹</span> Ups! All fields are required");
		$("#error_pane").fadeIn('fast', function(){
			setTimeout(function(){
				$("#error_pane").fadeOut('fast');
			}, 1000);
		});
		return false;
	} else {
		if(!isValidEmail($("#email").val())) {
			$("#email").addClass("error");
			$("#error_pane").html("<span class='error_face'>☹</span> Ups! Invalid Email");
			$("#error_pane").fadeIn('fast', function(){
				setTimeout(function(){
					$("#error_pane").fadeOut('fast');
				}, 1000);
			});
			return false;
		}
		return true;
	}
      
  });

	function isValidEmail(email){
		var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		return filter.test(email);
	}
	
});

//Time
function clock() {
	d = new Date();
	nhour  = d.getHours();
	nmin   = d.getMinutes();
	if(nhour ==  0) {ap = " AM";nhour = 12;} 
	else if(nhour >= 13) {nhour -= 12;}

	if(nmin <= 9) {nmin = "0" +nmin;}
	
	$(".time").html(nhour+":"+nmin);
	
	setTimeout("clock()", 1000);
}

//Attendance
function attendance() {
	$.ajax({
	  url: '/jsonapi/users/',
	  type: 'POST',
	  dataType: 'json',
	  complete: function(xhr, textStatus) {
	    setTimeout("attendance()", 5000);
	  },
	  success: function(data, textStatus, xhr) {
		console.log('checking attendance');
		$(".attendance").html(data.length);
	  },
	  error: function(xhr, textStatus, errorThrown) {
	    //called when there is an error
	  }
	});
}

//Presentations
var old_hash = "";
function presentations()
{
	$.ajax({
	  url: '/jsonapi/presentations/',
	  type: 'POST',
	  dataType: 'json',
	  complete: function(xhr, textStatus) {
	    setTimeout("presentations()", 5000);
	  },
	  success: function(data, textStatus, xhr) {
		
		if(old_hash == "")
		{
			console.log('First Run!');
			var first_run = true;
		}
		else
		{
			console.log('Already ran!');
			var first_run = false;
		}
		
		if(data[0].hash == old_hash) {
			console.log('Same hash ' + data[0].hash + " and " + old_hash);
			var change = false;
		}else {
			
			old_hash = data[0].hash;
			console.log('Diff hash ' + data[0].hash + " and " + old_hash);
			var change = true;
		}
		
		data.shift();	
		
    // $(".presentation").html(data.length);

		console.log('Checking presentations');
		var item_list = '';
		for (var i=0; i < data.length; i++) {
			
			var avatar = "/static/img/default_avatar.png";
			if(data[i].twitter_name != "") {
				avatar = "http://api.twitter.com/1/users/profile_image/" + data[i].twitter_name + ".json";
			}

			var thumbnail = '<div class="thumbnail"><img src="' + avatar + '" /></div>';
			var title = '<span class="title">' + data[i].name + '</span>';
			var author = '<span class="author">' + data[i].user + '</span>';
			
			var at = "@";
			if(data[i].twitter_name == "") {
			  var at = "";
			}
			
			var twitter_name = '<span class="twitter_username">' + at + '' + data[i].twitter_name + '</span>';
			var content = '<div class="content">'+ title + author + twitter_name + '</div>';
			
			var countdown = '';
			
			if(data[i].status == 'ongoing') {
				
				countdown = '<div class="countdown">10:00</div>';
				
			} else if(data[i].status == 'cued') {
				
				countdown = '<div class="countdown">10:00</div>';
				
			}
			
			var item = '<li id="' + data[i].presentation_id + '" class="'+ data[i].status +'">'+ thumbnail + content + countdown + '</li>';
			
			item_list += item;
			
		};
		
		if(first_run)
		{
			$("#presentations ul").html(item_list);
		}
		
		if(change) {
			
			console.log('Hay cambio!!!!!');
			
			$("#presentations ul").html(item_list);
			
			console.log("First element Presentation_id = " + $("#presentations ul li:first").attr("id"));
			console.log("Second element Presentation_id = " + $("#presentations ul li:eq(1)").attr("id"));
			
			var now = new Date();
			var endingSoon = new Date(now);
			endingSoon.setMinutes(now.getMinutes() + 10);
			$(".ongoing .countdown").countdown(endingSoon,
			{
				precision: "simple",
				ongoing: $("#presentations ul li:first").attr("id"),
				nextup: $("#presentations ul li:eq(1)").attr("id")
			});
			
		} else {
			console.log('No hay cambio!!!!!');
		}
		
	  },
	  error: function(xhr, textStatus, errorThrown) {
	    //called when there is an error
	  }
	});
}

function presentation_counts() {
  $.ajax({
	  url: '/jsonapi/presentation_count/',
	  type: 'POST',
	  dataType: 'json',
	  complete: function(xhr, textStatus) {
	    setTimeout("presentation_counts()", 5000);
	  },
	  success: function(data, textStatus, xhr) {
		console.log('checking presentation_counts');
		$(".presentation").html(data.length);
	  },
	  error: function(xhr, textStatus, errorThrown) {
	    //called when there is an error
	  }
	});
}


//Tweets
function tweets() {
	var twitterName = 'barcampsj'; 
	$.ajax({
	  url: 'http://search.twitter.com/search.json?q=barcampsj&callback=?',
	  type: 'GET',
	  dataType: 'json',
	  complete: function(xhr, textStatus) {
	    setTimeout("tweets()", 5000);
	  },
	  success: function(data, textStatus, xhr) {
		
		console.log('Checking tweets');
		
		$.each(data, function(i, tweets) {  
			if (tweets.length != undefined) {
				if (tweets[0].created_at != undefined) {
					$(".tweets").html(tweets.length);
				}
			}
		});
	  },
	  error: function(xhr, textStatus, errorThrown) {
	    //called when there is an error
	  }
	});
}