$(document).ready(function(){
  var isRunning = false;
  var resetClicked = true;
  
  function timeConvert(timeInSecond) {
    let hour, min, sec;
      min = Math.floor(timeInSecond/60000)%60;
      sec = Math.ceil(timeInSecond/1000)%60;
      hour = Math.floor(timeInSecond/3600000);
    return {hour,min,sec}
  }
  
  function run(input){
    let start;
    start = Date.now();
    input = input*60*1000;

    intervalID = setInterval(function(){
      let delta,newInput;
      delta= Date.now()-start;
      newInput = input - delta;
      let {hour,min,sec} = timeConvert(newInput);

      if((input-delta) < 0){
        sec=0
        min =0;
        hour =0;
        if(isRunning){
          clearInterval(intervalID);
          $(".time-text").text("Break");
          run(parseInt($('#break-value').text()));
          isRunning = false;
        }else{
          clearInterval(intervalID);
          $('#time').text('00:00:00');
          $(".time-text").text("Done");
        }
      }

      $("#time").text(`
${hour>=10 ? hour : "0" + hour}:${min>=10 ? min : "0" + min}:${sec>=10 ?sec:"0"+ sec}`);
    },1000);
  }


  var Breaktime = (function(){
    var breakVal=5;

    $('#break-sub').click(function(){
      breakVal--;
      if(breakVal < 1){
        breakVal=1;
      }
      $('#break-value').text(breakVal);

    });

    $('#break-add').click(function(){
      breakVal++;
      $('#break-value').text(breakVal);
    });



  })(); //Break zonee------------------------


  var Session = (function(){
    var sessionVal=25;
    $('#session-sub').click(function(){
      sessionVal--;
      if(sessionVal < 1){
        sessionVal=1;
      }
      $('#session-value').text(sessionVal);
    });

    $('#session-add').click(function(){
      sessionVal++;
      $('#session-value').text(sessionVal);
    });

  })(); //Session zone---------------------


  $('#start').click(function(){
    if(resetClicked){
      let sessionVal;
      sessionVal = parseInt($('#session-value').text());
      run(sessionVal);
      $(".time-text").text("Session").show("slow");
      isRunning = true;
      resetClicked = false;
    }
  });

  $('#reset').click(function(){
    resetClicked = true;
    clearInterval(intervalID);
    $('#time').text('00:00:00');
    $(".time-text").hide("slow");
  });

});