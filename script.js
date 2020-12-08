

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

// Prompts user to input initials, if user input is not length 3, alerts them of the mistake and calls itself again for correction
function storeInitials(){
playerInitials = prompt("Enter initials!")
    if (playerInitials.length !== 3) {
      alert("Password length must be between 3 characters in length.")
      return storeInitials()}
     playerInitialsArray = [playerInitials]
     //Pushes stored player initials into playerInitialsArray
     playerInitialsArray.push(localStorage.getItem("storedPlayerInitialsArray"))
     //Stores the new array
     localStorage.setItem("storedPlayerInitialsArray", playerInitialsArray)
}

function storeScore(){
    //Stores user score, prompts user to supply name
    playerScoreArray = [score]
    //Pushes stored player score into playerScoreArray
    playerScoreArray.push(localStorage.getItem("storedPlayerScoreArray"))
    //Stores the new score array
    localStorage.setItem("storedPlayerScoreArray", playerScoreArray)
}

//Stores user initials and score and then terminates the quiz by redirecting user to scorepage
function terminate(){
    //Runs storeInitials
    storeInitials()
    //Runs storeScore
    storeScore()
    //Redirects to scorecard page
    window.location.href = "scorecard.html" 
}


// Funtion that swaps a member of an array at an index with its neighbor at that index + 1 
function swapWithNext(array, index){
    var storage = array[index]
    array.splice(index, 1)
    array.splice(index + 1, 0, storage)
}
// Function that returns true if an array is in reverse numerical order
function isRevNumSorted (array){
    for (w=0; w < array.length; w++){
        if(array[w] < array[w + 1]){
        return false
        }
    }
    return true
}

//Function that takes two arrays, one with numbers and one with strings that are assosciated with one another in order. It then rearranges the number array into reverse numerical order, making the same changes to the corresponding string array, keeping the values in the arrays assosciated with one another.
function revNumSort(numberArray, stringArray, index){
      //If the number array is in reverse numerical order, the function stops.
    if(isRevNumSorted(numberArray)) {
        return
      }
      //If not, it checks if the number at the current index is less than its neighbor of index + 1
      else if (numberArray[index] < numberArray[index+1]){
      swapWithNext(numberArray, index)
      swapWithNext(stringArray, index)
      //If so, it swaps their positions and passes the new arrays back to itself and starts over from index 0
      return revNumSort(numberArray, stringArray, 0)
      }
      //If the number at the current index is greater than or equal to its neighbor, it advances through the array
      else{
        return revNumSort(numberArray, stringArray, index + 1)
      }
    }

function sortHighScores(){
    //Converts stored strings back into arrays
    initialsToSortArray = localStorage.getItem("storedPlayerInitialsArray").split(',')
    scoresToSortArray = localStorage.getItem("storedPlayerScoreArray").split(',')
    // Arranges arrays into reverse numerical order by score
    revNumSort(scoresToSortArray, initialsToSortArray, 0)
}

function renderScores(){
    //Runs sortHighScores()
    sortHighScores()
    //Grabs table element from Scorecard
    var scoreTable = document.getElementById("scoreTable");
    for (i=0;i<initialsToSortArray.length;i++) {  
    //Adds row to table
    var row = scoreTable.insertRow(1)
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var initialsCell = row.insertCell(0);
    var scoreCell = row.insertCell(1);
    // Add some text to the new cells:
    initialsCell.innerHTML = initialsToSortArray[i]
    scoreCell.innerHTML = scoresToSortArray[i]
}
}   

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
timer (2, 0)