$(function(){

var reelsSpinning = false;
$('#spin').on('click', function() {
  if ( !reelsSpinning ) { 
    spinReels();
    setTimeout(stopReels, 3000);
  }
})

function spinReels(){
  reelsSpinning = true;

}

function stopReels(){


  reelsSpinning = false;
}
















})