
//List of all the cards

let cards = [
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb'
]

cards = cards.concat(cards)

const cardsContainer = document.querySelector('.deck')
  
  let openedCards = []
  let matchedCards = []
  let timer = setInterval(timerFunction, 1000) 
  let time = 0

  let timerSpan = document.querySelector(".timer")

  function timerFunction() {
      time = time + 1
      timerSpan.innerHTML = time
  }

  // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

  
  //Create the Cards
  function init() {
     cards = shuffle(cards)
    for (let i = 0; i < 16; i++) {
      const card = document.createElement('li')
      card.classList.add('card')
      card.innerHTML = `<i class="fa ${cards[i]}"></i>`
      cardsContainer.appendChild(card)
      
      click(card)
    }
    
  }
  
  
  let firstClick = true
  
  function click(card) {
    
    // Cards Click Event
    card.addEventListener('click', function() {
      if (firstClick) {
        startTimer()
        firstClick = false
      }
  
      const currentCard = this
      const previousCard = openedCards[0]
  
      //We have an existing opened card
      if (openedCards.length === 1) {
        card.classList.add('open', 'show', 'disable')
        openedCards.push(this)

      //Compare the opened cards
        
        compare(currentCard, previousCard)
      } else {

       //We don't have an existing opened card
        currentCard.classList.add('open', 'show', 'disable')
        openedCards.push(this)
      }
    })
  }
  
       //Compare out two opened cards

  function compare(currentCard, previousCard) {
    
    if (currentCard.innerHTML === previousCard.innerHTML) {
     
      //Matched
      currentCard.classList.add('match')
      previousCard.classList.add('match')
  
      matchedCards.push(currentCard, previousCard)
  
      openedCards = []
  
      //Check to see if the game is over
      isOver()

    } else {
      
      //Wait 500ms, then do this
      setTimeout(function() {
        currentCard.classList.remove('open', 'show', 'disable')
        previousCard.classList.remove('open', 'show', 'disable')
      }, 500)
  
      openedCards = []
    }
    
    
    addMove()
  }
  
//Let me know if the game is over

  function isOver() {
    if (matchedCards.length === cards.length) {    
      stopTimer()
      alert('CONGRATULATIONS!, Play again?')
    }
  }
  
  //Add a move
  const movesContainer = document.querySelector('.moves')
    let moves = 0
    movesContainer.innerHTML = 0
    function addMove() {
      moves++
      movesContainer.innerHTML = moves
  
    rating()
  }
  
  //Star rating
  const starsContainer = document.querySelector('.stars')
  const star = `<li><i class="fa fa-star"></i></li>`
  starsContainer.innerHTML = star + star + star
  function rating() {
    if (moves < 10) {
      starsContainer.innerHTML = star + star + star
    } else if (moves < 15) {
      starsContainer.innerHTML = star + star
    } else {
      starsContainer.innerHTML = star
    }
  }
  
  let timerContainer = document.querySelector('.timer')
  let liveTimer,
    totalSeconds = 0
  
  //Start time
  function startTimer() {
    liveTimer = setInterval(function() {
      totalSeconds++
    }, 1000)
  }
  
  function stopTimer() {
    clearInterval(liveTimer)
  }
  
  //Restart button
  const restartBtn = document.querySelector('.restart')
  restartBtn.addEventListener('click', function() {
    
    cardsContainer.innerHTML = ''
  
    
    init()
  
    reset()
  })

  
  function reset() {
    openedCards = []
    matchedCards = []
    moves = 0
    movesContainer.innerHTML = moves
    starsContainer.innerHTML = star + star + star
  
    stopTimer()
    isFirstClick = true
    totalSeconds = 0
    timerContainer.innerHTML = totalSeconds + 's'
    location.reload();
  }
  
  //Start the game for the first time
  init()


