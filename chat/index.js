function user_name() {
  sendMessage("Hi, How can i help?");
  }

function ai(message) {
  if(user_name.length < 3) {
    user_name = message;
    
    sendMessage("How can i help?");
    }
    if(message.indexOf("how are you") >= 0 || message.indexOf("what about you") >= 0){
      sendMessage("Thanks, I am good!");
    }
    if(message.indexOf("good") >= 0 || message.indexOf("ok") >= 0 || message.indexOf("not bad") >= 0){
      sendMessage("Good! How can i help?");
    }
    if(message.indexOf("train") >= 0 || message.indexOf("Training days") >= 0 || message.indexOf("training") >= 0){
      sendMessage("we train on a Tuesday @ 9:30pm and Thursday @ 9:00pm at perth leisure pool");
    }
    if(message.indexOf("email") >= 0 || message.indexOf("contact email") >= 0){
      sendMessage('yes click <a href="mailto:perthmastersswimming@hotmail.com"> Here</a> to email us');
    }  
  if(message.indexOf("hi") >= 0 || message.indexOf("hiya") >= 0 || message.indexOf("hello") >= 0 || message.indexOf("alright") >= 0 || message.indexOf("Alright") >= 0 || message.indexOf("Evening") >= 0 || message.indexOf("evening") >= 0 || message.indexOf("afternoon") >= 0 || message.indexOf("morning") >= 0){
      sendMessage("Hello, How are you?");
    }
    if(message.indexOf("lottery") >= 0){
      sendMessage('Sorry! I cannot see into the future, could i suggest you try mystic meg?');
    } 
    if(message.indexOf("membership") >= 0 || message.indexOf("member") >= 0){
      sendMessage('Find out more <a href="http://perthmasters.co.uk/membership/index.html"> here</a>');
    }  
    if(message.indexOf("location") >= 0 || message.indexOf("perth") >= 0 || message.indexOf("pool") >= 0){
      sendMessage('Find us <a href="http://perthmasters.co.uk/location/index.html"> here</a>');
    }
    if(message.indexOf("scottish") >= 0 || message.indexOf("register") >= 0 || message.indexOf("sasa") >= 0){
      sendMessage('Visit scottish swimming website <a href="http://www.scottishswimming.com/"> here</a>');
    }
  
    if((message.indexOf("time") >= 0) || (message.indexOf("hours") >= 0) || (message.indexOf("hour") >= 0)){
      var date = new Date();
      var h = date.getHours();
      var m = date.getMinutes();
      sendMessage("The current time is: " + h + ":" + m);
    }
  
}

function sendMessage(message) {
  var prevMessage = $(".container").html();
  if(prevMessage != "") {
      prevMessage = prevMessage + "<p>";
    }
  $('.container').html(prevMessage + "<span class='current_message'>" + "<span class='bot'>Trudles: </span>" + message + "</span>");
  $('.current_message').hide();
  $('.current_message').delay(200).fadeIn();
  $('.current_message').removeClass('current_message');
}
  

$(function() {
  user_name();
  $('.textarea').keypress(function(event) {
    if(event.which == 13) {
      if( $(".enter").prop("checked") ) {
        event.preventDefault();
        
        $('.send').click();
      }
    }
  });
  
  $('.send').on('click', function() {
    var newMessage = $('.textarea').val(),
        container = $('.container'),
        prevMessage = container.html(),
        userName = "<span class='username''>User: </span>"
    
    if(prevMessage != "") {
      prevMessage = prevMessage + "<br>";
    }
        
    $('.textarea').val("");
    container.html(prevMessage + userName + newMessage);
    container.scrollTop(container.prop('scrollHeight'))
    ai(newMessage);
    
  });
});
