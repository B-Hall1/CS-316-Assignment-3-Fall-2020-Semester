
// Initialize all events on loading of document
$( document ).ready(function() {
   console.log("running");
   
   //Mouse over 
   $("#insertDiv").mouseover(function() {
		insertBg();
   });
   
   //Mouse over 
   $("#retrieveDiv").mouseover(function() {
		retrieveBg();
   });
   
   //Mouse over 
   $("#clearDiv").mouseover(function() {
		clearBg();
   });
   
   //Mouse over 
   $("#digestDiv").mouseover(function() {
		digestBg();
   });
   //Mouse over 
   $("#inspectDiv").mouseover(function() {
		digestBg();
   });
     
   //keypress 

   $("#insert-text").keypress(function() {
		 $("#insert").prop("checked", true);
   });
   
   //keypress 
   $("#value-text").keypress(function() {
		  $("#insert").prop("checked", true);
   });
   
   //keypress 
   $("#retrieve-text").keypress(function() {
		$("#retrieve").prop("checked", true);
   });
   //keypress 
   $("#password-text").keypress(function() {
		$("#clear").prop("checked", true);
   });
   //keypress 
   $("#digest-text").keypress(function() {
		$("#digest").prop("checked", true);
   });
   
  //Submit button click 
  $("#submitBtn" ).click(function( e ) {
	  e.stopImmediatePropagation();
	  e.preventDefault();
      console.log( "Handler for .submit() called." );
	  var command = $('input[name=command]:checked').val();
	  var data="";
	  //Process th commands
	  if('insert'===command){
		var name=$("#insert-text").val();
		var value=$("#value-text").val();
		data={'name':name,'value':value,'command':command};
		sendRequest(data);     
	  }else if('retrieve'===command){		  
		  var name=$("#retrieve-text").val();
		  data={'retrieve-name':name,'command':command};
		  sendRequest(data);     
	  }else if('clear'===command){		  
		  var passwd=$("#password-text").val();
		  data={'password':passwd,'command':command};
		  sendRequest(data);     
	  }else if('digest'===command){		  
		  var filename=$("#digest-text").val();
		  data={'filename':filename,'command':command};
		   sendRequest(data);     
	   }else if('inspect'===command){		  
		  var fd = new FormData(); 
          var files = $('#inspect-text')[0].files[0]; 
          fd.append('file', files); 
		  $.ajax({ 
                    url: 'bonus.php', 
                    type: 'post', 
                    data: fd, 
                    contentType: false, 
                    processData: false, 
                    success: function(resp){ 
						resp=JSON.parse(resp)
                       	$('#status_line').html(resp['message']);
                    }, 
                }); 
	   }
     
  });


});

function sendRequest(data){
$.ajax({
        type: "POST",
        url: "asg.CGI.cgi",
        data: data,
        error: function(resp) { 
             console.log(resp);
        }, 
        success: function(resp){
			$('#status_line').html(resp['message']);
        }
    });   

}
var bgColors=["yellow", "lightblue", "lightgreen", "pink"]

var insertBgCounter=0;
function insertBg(){
    document.getElementById('insert-div').style.backgroundColor = bgColors[insertBgCounter];
    if(insertBgCounter<3){
        insertBgCounter++;
    }else{
        insertBgCounter = 0;
    }
}

var retrieveBgCounter=0;
function retrieveBg(){
    document.getElementById('retrieve-div').style.backgroundColor = bgColors[retrieveBgCounter];
    if(retrieveBgCounter<3){
        retrieveBgCounter++;
    }else{
        retrieveBgCounter = 0;
    }
}

var clearBgCounter=0;
function clearBg(){
    document.getElementById('clear-div').style.backgroundColor = bgColors[clearBgCounter];
    if(clearBgCounter<3){
        clearBgCounter++;
    }else{
        clearBgCounter = 0;
    }
}

var digestBgCounter=0;
function digestBg(){
    document.getElementById('digest-div').style.backgroundColor = bgColors[digestBgCounter];
    if(digestBgCounter<3){
        digestBgCounter++;
    }else{
        digestBgCounter = 0;
    }
}

var inspectBgCounter=0;
function inspectBg(){
    document.getElementById('inspect-div').style.backgroundColor = bgColors[inspectBgCounter];
    if(inspectBgCounter<3){
        inspectBgCounter++;
    }else{
        inspectBgCounter = 0;
    }
}
