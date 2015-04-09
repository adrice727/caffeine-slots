$(function(){

var reelsSpinning = false;
$('#spin').on('click', function() {
  if ( !reelsSpinning ) { 
    play();
    // setTimeout(stopReels, 3000);
  }
})

function play(){
  reelsSpinning = true;
  window.requestAnimationFrame(spinReels);
  // var spinning = setInterval(spinReels, 17);
  // setTimeout(stopReels(spinning), 3000);
  // var reels = $('.reels');
  // var currentPositions = currentReelPositions();
  // console.log(currentPositions);
  // while ( reelsSpinning ) {
  //   $('#reel').css('background-position-y', )
  // }
  // var reel1bg = $('#reel-1').css('background-position-y');
  // console.log(reel1bg);
}

$('#stop').on('click', function(){
  window.cancelAnimationFrame(animation);
  reelsSpinning = false;
})

var animation;
function spinReels() {
  var current = currentReelPositions();
  animation = window.requestAnimationFrame(spinReels);
  $('#reel-1').css('background-position-y', parseInt(current['1'].slice(0,-2)) + 10 + 'px');
  $('#reel-2').css('background-position-y', parseInt(current['2'].slice(0,-2)) + 10 + 'px');
  $('#reel-3').css('background-position-y', parseInt(current['3'].slice(0,-2)) + 10 + 'px');
}

function stopReels(interval){
  reelsSpinning = false;
  // stopReel(1);
  // setTimeout(stopReel(2), 500);
  // setTimeout(stopReel(3), 1000);
}

function stopReel(id) {
  var stop = getFinalPosition();
  var stop = Math.floor(Math.random() * 6) + 1;
  var reel = $('#reel-' + id);

}

function getFinalPosition(){
  var positions = {
    1: 100,
    2: 300,
    3: 500,
  }
  var stop = Math.floor(Math.random() * 6) + 1;
  return positions[stop];
}

function currentReelPositions(){
  var positions = {};
  positions['1'] = $('#reel-1').css('background-position-y');
  positions['2']= $('#reel-2').css('background-position-y');
  positions['3'] = $('#reel-3').css('background-position-y');
  return positions;
}
















})