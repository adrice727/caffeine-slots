$(function(){

  var roundProgress = 'new';
  $('#spin').on('click', function() {
    if ( roundProgress === 'new' ) { 
      play();
    }
  })

  function play(){
    reelsSpinning = true;
    updateDisplay('spinning');
    setStops();
    console.log(finalPositions);
    spinReels();
  }

  $('#stop').on('click', function(){
    console.log('calling stop');
    stopReels = true;
  })

  var reelsSpinning;
  function spinReels(){
    reelsSpinning = 3;
    window.requestAnimationFrame(spinReel.bind('1'));
    window.requestAnimationFrame(spinReel.bind('2'));
    window.requestAnimationFrame(spinReel.bind('3'));
    setTimeout(function(){stopReels = true;}, 3000);
  }

  var stopReels = false;
  var spins = {}; // animation frames
  var finalPositions;
  function spinReel() {
    var reel = this[0];
    var currentPosition = parseInt(currentReelPositions(reel));
    if ( stopReels ) {
      if ( (currentPosition - finalPositions[reel].adjustment) % 600 === 0 ) {
        window.cancelAnimationFrame(spins[reel]);
        if ( reelsSpinning-- === 0 ) { finishRound(); }
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

  // Get random ending position for reel
  function setStops(){
    finalPositions = {};
    var options = {
      1: {drink: 'coffee', adjustment: 100},
      2: {drink: 'tea', adjustment: 300},
      3: {drink: 'espresso', adjustment: 500}
    }
    finalPositions['1'] = options[Math.floor(Math.random() * 3) + 1]
    finalPositions['2'] = options[Math.floor(Math.random() * 3) + 1]
    finalPositions['3'] = options[Math.floor(Math.random() * 3) + 1]
  }

  function currentReelPositions(reel){
    var positions = {};
    positions['1'] = $('#reel-1').css('background-position-y');
    positions['2']= $('#reel-2').css('background-position-y');
    positions['3'] = $('#reel-3').css('background-position-y');
    return positions[reel];
  }

  function finishRound(){
    console.log('drinks', drinks);
    if ( drinks[1] === drinks[2] && drinks[2] === drinks[3] ) {
      updateDisplay(drinks[1]);
    } else {
      updateDisplay('lose');
    }
    setTimeout(reset, 3000);
  }

  function reset(){
    updateDisplay('new');
    roundInProgress = false;
    stopReels = false;
    drinks = {};
  }

  function updateDisplay(status) {
    var messages = {
      'new'     : {id: 0, text: 'hit spin to play'},
      'spinning': {id: 0, text: 'spinning' },
      'coffee'  : {id: 1, text: 'you won a cup of coffee'},
      'espresso': {id: 2, text: 'you won an espresso'},
      'tea'     : {id: 3, text: 'you won a cup of tea'},
      'lose'    : {id: 0, text: 'sorry, you didn\'t win this round'}
    };
    $('.message-container').text(messages[status].text);
    return messages[status].id;
  }
})