

// Variable that stores which answer is currently selected by the user, defaults with first answer selected
var selectedAnswer = "0"

//Series of event listeners for the radio buttons in the HTML file that store the letter corresponding to the user's selected in the selected answer variable.
var aButton = document.getElementById("aButton")
aButton.addEventListener("click", function(){ 
    selectedAnswer = "0"
})  
var bButton = document.getElementById("bButton")
bButton.addEventListener("click", function(){ 
    selectedAnswer = "1"
})  
var cButton = document.getElementById("cButton")
cButton.addEventListener("click", function(){ 
    selectedAnswer = "2"
})  
var dButton = document.getElementById("dButton")
dButton.addEventListener("click", function(){ 
    selectedAnswer = "3"
})  

// Series of variables for as keys for manipulating inner text of question answers
var questionDisplayText = document.getElementById("questionText")
var answerDisplayTextA = document.getElementById("answerA")
var answerDisplayTextB = document.getElementById("answerB")
var answerDisplayTextC = document.getElementById("answerC")
var answerDisplayTextD = document.getElementById("answerD")

// An array to store all possible answers to current question
var answerArray = []

// Takes a question's index then places all answers, wrong and correct into an array
function grabAnswers(index) {
    answerArray = Object.values(questionsObject[index].wrongAnswers)
    answerArray.push(questionsObject[index].correctAnswer)
}

//Generates a random integer from 0 up to the value of randomMax.
function randomUpTo(randomMax) {
    return ((Math.floor(Math.random() * (randomMax + 1))))
}

//An array to store all possible answers to question, shuffled
var shuffledArray = []

//Removes a random member of an array and places it into shuffledArray
function shuffle(array) {
var randomIndex = randomUpTo(answerArray.length - 1)
shuffledArray.push(answerArray[randomIndex])
answerArray.splice(randomIndex, 1)
}

//Shuffles all values in answerArray into shuffledArray, empties answerArray
function shuffleAll(array) {
    for (i=1; i=array.length; i++) {
    shuffle(array)
    }
}


// Prompts user to input initials, if user input is not length 3, alerts them of the mistake and calls itself again for correction, stores initials in local storage
function storeInitials(){
playerInitials = prompt("Enter initials!")
    if (playerInitials.length !== 3) {
      alert("Password length must be between 3 characters in length.")
      return storeInitials()}
     playerInitialsArray = [playerInitials]
     playerInitialsArray.push(localStorage.getItem("storedPlayerInitialsArray"))
     localStorage.setItem("storedPlayerInitialsArray", playerInitialsArray)
}


//Terminates quiz and sends user to scorepage
function terminate(){
    //Stores user score, prompts user to supply name
    playerScoreArray = [score]
    playerScoreArray.push(localStorage.getItem("storedPlayerScoreArray"))
    localStorage.setItem("storedPlayerScoreArray", playerScoreArray)
    storeInitials()
    //Redirects to scorecard page
    window.location.href = "scorecard.html"    
}
/* I want to store user score and initials as an array and then sort them with the following: 

function swapWithNext(array, index){
    var storage = array[index]
    array.splice(index, 1)
    array.splice(index + 1, 0, storage)
    }
    
    function isRevNumSorted (array){
      for (w=0; w < array.length; w++){
        if(array[w] < array[w + 1]){
        return false
        }
      }
     return true
    }
    
    function revNumSort(numberArray, stringArray, index){
      if(isRevNumSorted(numberArray)) {
        console.log(numberArray)
        console.log(stringArray)
        return
      }
      else if (numberArray[index] < numberArray[index+1]){
      swapWithNext(numberArray, index)
      swapWithNext(stringArray, index)
      return revNumSort(numberArray, stringArray, 0)
      }
      else{
        return revNumSort(numberArray, stringArray, index + 1)
      }
    }
*/    

//Renders new randomly selected question with shuffled answers to screen
function renderRandomQuestion(){
    // Resets shuffled array
    shuffledArray = []
    //If there are no remaining novel questions, terminates and sends user to scorecard
    if(questionsObject.length == 0) {
        terminate()
    }
    // Selects a question at random from questionsObject
    var randomIndex = randomUpTo(questionsObject.length - 1)
    //Grabs all possible answers and shuffles their order
    grabAnswers(randomIndex)
    shuffleAll(answerArray)
    //Writes question possible answers into the correct spot in the document
    questionDisplayText.innerHTML = questionsObject[randomIndex].question
    answerDisplayTextA.innerHTML = shuffledArray[0]
    answerDisplayTextB.innerHTML = shuffledArray[1]
    answerDisplayTextC.innerHTML = shuffledArray[2]
    answerDisplayTextD.innerHTML = shuffledArray[3]
    // Stores the correct answer in a varialbe
    currentCorrectAnswer = questionsObject[randomIndex].correctAnswer
    // Removes question from questionsObject to ensure questions are novel
    questionsObject.splice(randomIndex, 1)
}

//Checks if selected answer is correct
function userCorrect(){
    return currentCorrectAnswer == shuffledArray[selectedAnswer]
}

//Stores player score as a variable, writes it to document. Score defaults to 0
displayedScore = document.getElementById("playerScore")
score = 0
playerScore.innerHTML = "Player Score: " + score


//Event listener for when the user has clicked the submit button
var submitButton = document.getElementById("submitButton")
submitButton.addEventListener("click", function(){ 
   //Checks if user is correct and adds score if so
   if (userCorrect()){
    score++
   }
   //Renders a new question and user's updated score to the document
   playerScore.innerHTML = "Player Score: " + score
   renderRandomQuestion()
}
)

//Sets the timer from the document to a variable for easier access, sets minutes remaining and seconds remaining as global variables
timeLeft = document.getElementById("timer")
var minutesRemaining = 0
var secondsRemaining = 0


//Timer takes minutes and seconds as arguments
function timer(minutes, seconds){
minutesRemaining = minutes
secondsRemaining = seconds
setInterval(timeCount, 1000)}

//Second counter, draws from minutes when seconds reaches 0
function timeCount(){

    //Terminates and sends user to scorecard when clock reaches 0 minutes and 0 seconds
    if(secondsRemaining == 0 && minutesRemaining == 0){
    terminate()
    }

    if(secondsRemaining == 0){
    secondsRemaining = 60
    minutesRemaining = minutesRemaining - 1
    }

  secondsRemaining = secondsRemaining - 1
  timeLeft.innerHTML = "Time Remaining: " + minutesRemaining + " min " + secondsRemaining + " sec"
}


//Renders a random question on start up and sets timer to 2 minutes.
renderRandomQuestion()
timer (0, 5)