let currentScore = 0;
let totalQuestions = 0;
let correctAns = 0;

function checkCorrect() {
  switch (correctAns) {
    case 0:
      if (document.getElementById("choice1b").checked === true) {
        currentScore++;
      }
      break;
    case 1:
      if (document.getElementById("choice2b").checked === true) {
        currentScore++;
      }
      break;
    case 2:
      if (document.getElementById("choice3b").checked === true) {
        currentScore++;
      }
      break;
    case 3:
      if (document.getElementById("choice4b").checked === true) {
        currentScore++;
      }
      break;
    default:
  }
  return;
}

function clearAnswer() {
  var ele = document.getElementsByName("answer");
  for (var i = 0; i < ele.length; i++)
    ele[i].checked = false;
}

function updateUI() {
  let url = "https://opentdb.com/api.php?amount=1";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      document.getElementById("questionHeader").innerHTML = json.results[0].question;
      if (json.results[0].type === "multiple") {
        document.getElementById("choice3").style.visibility = "visible";
        document.getElementById("choice3b").style.visibility = "visible";
        document.getElementById("choice4").style.visibility = "visible";
        document.getElementById("choice4b").style.visibility = "visible";
        let correct = Math.round(Math.random() * 3);
        switch (correct) {
          case 0:
            document.getElementById("choice1").innerHTML = json.results[0].correct_answer;
            document.getElementById("choice2").innerHTML = json.results[0].incorrect_answers[0];
            document.getElementById("choice3").innerHTML = json.results[0].incorrect_answers[1];
            document.getElementById("choice4").innerHTML = json.results[0].incorrect_answers[2];
            correctAns = 0;
            break;
          case 1:
            document.getElementById("choice2").innerHTML = json.results[0].correct_answer;
            document.getElementById("choice1").innerHTML = json.results[0].incorrect_answers[0];
            document.getElementById("choice3").innerHTML = json.results[0].incorrect_answers[1];
            document.getElementById("choice4").innerHTML = json.results[0].incorrect_answers[2];
            correctAns = 1;
            break;
          case 2:
            document.getElementById("choice3").innerHTML = json.results[0].correct_answer;
            document.getElementById("choice2").innerHTML = json.results[0].incorrect_answers[0];
            document.getElementById("choice1").innerHTML = json.results[0].incorrect_answers[1];
            document.getElementById("choice4").innerHTML = json.results[0].incorrect_answers[2];
            correctAns = 2;
            break;
          case 3:
            document.getElementById("choice4").innerHTML = json.results[0].correct_answer;
            document.getElementById("choice2").innerHTML = json.results[0].incorrect_answers[0];
            document.getElementById("choice3").innerHTML = json.results[0].incorrect_answers[1];
            document.getElementById("choice1").innerHTML = json.results[0].incorrect_answers[2];
            correctAns = 3;
            break;
          default:

        }
      } else {
        document.getElementById("choice3").style.visibility = "collapse";
        document.getElementById("choice3b").style.visibility = "collapse";
        document.getElementById("choice4").style.visibility = "collapse";
        document.getElementById("choice4b").style.visibility = "collapse";
        let correct = Math.round(Math.random());
        switch (correct) {
          case 0:
            document.getElementById("choice1").innerHTML = json.results[0].correct_answer;
            document.getElementById("choice2").innerHTML = json.results[0].incorrect_answers[0];
            correctAns = 1;
            break;
          case 1:
            document.getElementById("choice2").innerHTML = json.results[0].correct_answer;
            document.getElementById("choice1").innerHTML = json.results[0].incorrect_answers[0];
            correctAns = 1;
            break;
          default:

        }
      }
    });
}

document.getElementById("submitButton").addEventListener("click", function(event) {
  event.preventDefault();
  checkCorrect();
  clearAnswer();
  updateUI();
  totalQuestions++;
  let myScore = "Score: " + currentScore + "/" + totalQuestions;
  document.getElementById("score").innerHTML = myScore;
});
