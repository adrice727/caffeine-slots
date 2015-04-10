$(function(){

  var roundInProgress = false;
  $('#spin').on('click', function() {
    if ( !roundInProgress ) { 
      play();
    }
  })

  function play(){
    roundInProgress = true;
    updateDisplay('play', true);
    setStops();
    startAnimation();
  }

  // Set random ending positions for reels
  var finalPositions = {};
  function setStops(){
    var options = {
      1: {drink: 'coffee', adjustment: 100},
      2: {drink: 'tea', adjustment: 300},
      3: {drink: 'espresso', adjustment: 500}
    };
    finalPositions['1'] = options[Math.floor(Math.random() * 3) + 1];
    finalPositions['2'] = options[Math.floor(Math.random() * 3) + 1];
    finalPositions['3'] = options[Math.floor(Math.random() * 3) + 1];
  }

  var reelsSpinning;
  var spins = {}; // animation frame ids
  var stopReels = false;
  function startAnimation(){
    reelsSpinning = 3;
    spins['1'] = window.requestAnimationFrame(spinReel.bind('1'));
    spins['2'] = window.requestAnimationFrame(spinReel.bind('2'));
    spins['3'] = window.requestAnimationFrame(spinReel.bind('3'));
    setTimeout(function(){stopReels = true;}, 3000);
  }

  function spinReel() {
    var reel = this[0];
    var currentPosition = parseInt(currentReelPosition(reel));
    if ( stopReels ) {
      if ( (currentPosition - finalPositions[reel].adjustment) % 600 === 0 ) {
        window.cancelAnimationFrame(spins[reel]);
        reelsSpinning--;
        if ( !!reelsSpinning ) { finishRound(); }
      } else {
        spins[reel] = window.requestAnimationFrame(spinReel.bind(reel));
        moveReel(reel, currentPosition);
      }
    } else {
      spins[reel] = window.requestAnimationFrame(spinReel.bind(reel));
      moveReel(reel, currentPosition);
    }
  }

  function moveReel(id, position) {
    var reel = $('#reel-' + id);
    reel.css('background-position-y', position + 20 + 'px');
  }

  function currentReelPosition(reel){
    return $('#reel-' + reel).css('background-position-y');
  }

  function finishRound(){
    var reels = finalPositions;
    if ( reels[1].drink === reels[2].drink && reels[2].drink === reels[3].drink ) {
      updateDisplay(reels[1].drink);
    } else {
      updateDisplay('lose');
    }
    setTimeout(reset, 3000);
  }

  function reset(){
    updateDisplay('new', true);
    $('.prize-container').removeClass('prize-coffee prize-tea prize-espresso');
    roundInProgress = false;
    stopReels = false;
    drinks = {};
  }

  function updateDisplay(status, immediate) {
    var messages = {
      'new'     : {id: 0, text: 'hit spin to play again'},
      'play'    : {id: 0, text: 'game in progress' },
      'coffee'  : {id: 1, text: 'you won a cup of coffee'},
      'espresso': {id: 2, text: 'you won an espresso'},
      'tea'     : {id: 3, text: 'you won a cup of tea'},
      'lose'    : {id: 0, text: 'sorry, you didn\'t win this round'}
    };
    if ( immediate ) { 
      $('.message-container').text(messages[status].text);
    } else {
      setTimeout(function(){
        $('.message-container').text(messages[status].text);
        if ( !!messages[status].id ) {
          $('.prize-container').addClass('prize-' + status);
        } 
      }, 750);
    }
  }

});