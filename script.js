
if (document.getElementById("TriviaSubmit") !== null) {
  document.getElementById("TriviaSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    let question = document.getElementById("QuestionInput").value;
    if (question === "")
      question = 1;
    let url = "https://opentdb.com/api.php?amount=" + question;
    const category = document.getElementById("CategoryInput").value;
    if (category !== "any") {
      url += "&category=" + category;
    }
    const difficulty = document.getElementById("DifficultyInput").value;
    if (difficulty !== "any") {
      url += "&difficulty=" + difficulty;
    }
    const type = document.getElementById("TypeInput").value;
    if (type !== "any") {
      url += "&type=" + type;
    }

    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let results = "";
        for (let i = 0; i < json.results.length; i++) {
          results += "<div class=\"trivia\">"
          if (json.results[i].type === "multiple") {

            results += "<h2>Question: " + json.results[i].question + "</h2>";
            results += "<h3>Correct Answer: " + json.results[i].correct_answer + "</h3>";
            results += "<h4>Incorrect Answer 1: " + json.results[i].incorrect_answers[0] + "</h4>";
            results += "<h4>Incorrect Answer 2: " + json.results[i].incorrect_answers[1] + "</h4>";
            results += "<h4>Incorrect Answer 3: " + json.results[i].incorrect_answers[2] + "</h4>";
            results += "<p>Category: " + json.results[i].category + "&nbsp;&nbsp;&nbsp;&nbsp;Difficulty: " + json.results[i].difficulty + "</p>";

          } else {
            results += "<h2>Question: " + json.results[i].question + "</h2>";
            results += "<h3>Correct Answer: " + json.results[i].correct_answer + "</h3>";
            results += "<h4>Incorrect Answer: " + json.results[i].incorrect_answers[0] + "</h4>";
            results += "<p>Category: " + json.results[i].category + "&nbsp;&nbsp;&nbsp;&nbsp;Difficulty: " + json.results[i].difficulty + "</p>";
          }
          results += "</div>"
        }
        document.getElementById("TriviaResults").innerHTML = results;
      });
  });
};
