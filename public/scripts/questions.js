var formQ1 = document.querySelector(".form1");
var formQ2 = document.querySelector(".form2");
var formQ3 = document.querySelector(".form3");
var formQ4 = document.querySelector(".form4");
var formQ5 = document.querySelector(".form5");
var Q1 = document.querySelector("#question_1");
var Q2 = document.querySelector("#question_2");
var Q3 = document.querySelector("#question_3");
var Q4 = document.querySelector("#question_4");
var Q5 = document.querySelector("#question_5");
var button_answerQ1 = document.querySelector(".send_answer1");
var button_answerQ2 = document.querySelector(".send_answer2");
var button_answerQ3 = document.querySelector(".send_answer3");
var button_answerQ4 = document.querySelector(".send_answer4");
var button_answerQ5 = document.querySelector(".send_answer5");
var correct_answerQ1 = document.querySelector(".correct_answerQ1");
var correct_answerQ2 = document.querySelector(".correct_answerQ2");
var correct_answerQ3 = document.querySelector(".correct_answerQ3");
var correct_answerQ4 = document.querySelector(".correct_answerQ4");
var correct_answerQ5 = document.querySelector(".correct_answerQ5");
var wrong_answerQ1 = document.querySelector(".wrong_answerQ1");
var wrong_answerQ2 = document.querySelector(".wrong_answerQ2");
var wrong_answerQ3 = document.querySelector(".wrong_answerQ3");
var wrong_answerQ4 = document.querySelector(".wrong_answerQ4");
var wrong_answerQ5 = document.querySelector(".wrong_answerQ5");

//label select
function avaliation_label(choice_label) {
  const options_label = Array.from(choice_label.parentElement.children);

  options_label.map((item) => {
    item.classList.remove("option_selected");
  });
  choice_label.classList.add("option_selected");
}

var label_selected = Array.from(document.querySelectorAll(".option"));
label_selected.map((label) => {
  label.onclick = (event) => avaliation_label(event.target);
});




// radio select Q1
function checkQ1(choice_radioQ1) {
  const brothers = Array.from(choice_radioQ1.parentElement.children);

  brothers.map((item) => {
    item.checked = false;
  });

  choice_radioQ1.checked = true;

  //Feedback Q1
  function feedbackQ1() {
    formQ1.classList.add("form_inative");
    if (choice_radioQ1.classList.contains("true")) {
      correct_answerQ1.classList.remove("hidden");
    } else {
      wrong_answerQ1.classList.remove("hidden");
    }
  }
  button_answerQ1.onclick = function () {
    feedbackQ1();
  };
}
//Declaration Q1
var radiosQ1 = Array.from(document.querySelectorAll(".input_optionQ1"));
radiosQ1.map((radio) => {
  radio.onclick = (event) => checkQ1(event.target);
});




// radio select Q2
function checkQ2(choice_radioQ2) {
  const brothers = Array.from(choice_radioQ2.parentElement.children);

  brothers.map((item) => {
    item.checked = false;
  });

  choice_radioQ2.checked = true;

  //Feedback Q2
  function feedbackQ2() {
    formQ2.classList.add("form_inative");
    if (choice_radioQ2.classList.contains("true")) {
      correct_answerQ2.classList.remove("hidden");
    } else {
      wrong_answerQ2.classList.remove("hidden");
    }
  }
  button_answerQ2.onclick = function () {
    feedbackQ2()}
}
//Declaration Q2
var radiosQ2 = Array.from(document.querySelectorAll(".input_optionQ2"));
radiosQ2.map((radio) => {
  radio.onclick = (event) => checkQ2(event.target);
});



// radio select Q3
function checkQ3(choice_radioQ3) {
  const brothers = Array.from(choice_radioQ3.parentElement.children);

  brothers.map((item) => {
    item.checked = false;
  });

  choice_radioQ3.checked = true;

  //Feedback Q3
  function feedbackQ3() {
    formQ3.classList.add("form_inative");
    if (choice_radioQ3.classList.contains("true")) {
      correct_answerQ3.classList.remove("hidden");
    } else {
      wrong_answerQ3.classList.remove("hidden");
    }
  }
  button_answerQ3.onclick = function () {
    feedbackQ3();
  };
}
//Declaration Q3
var radiosQ3 = Array.from(document.querySelectorAll(".input_optionQ3"));
radiosQ3.map((radio) => {
  radio.onclick = (event) => checkQ3(event.target);
});



// radio select Q4
function checkQ4(choice_radioQ4) {
  const brothers = Array.from(choice_radioQ4.parentElement.children);

  brothers.map((item) => {
    item.checked = false;
  });

  choice_radioQ4.checked = true;

  //Feedback Q4
  function feedbackQ4() {
    formQ4.classList.add("form_inative");
    if (choice_radioQ4.classList.contains("true")) {
      correct_answerQ4.classList.remove("hidden");
    } else {
      wrong_answerQ4.classList.remove("hidden");
    }
  }
  button_answerQ4.onclick = function () {
    feedbackQ4();
  };
}
//Declaration Q4
var radiosQ4 = Array.from(document.querySelectorAll(".input_optionQ4"));
radiosQ4.map((radio) => {
  radio.onclick = (event) => checkQ4(event.target);
});




// radio select Q5
function checkQ5(choice_radioQ5) {
  const brothers = Array.from(choice_radioQ5.parentElement.children);

  brothers.map((item) => {
    item.checked = false;
  });

  choice_radioQ5.checked = true;

  //Feedback Q5
  function feedbackQ5() {
    formQ5.classList.add("form_inative");
    if (choice_radioQ5.classList.contains("true")) {
      correct_answerQ5.classList.remove("hidden");
    } else {
      wrong_answerQ5.classList.remove("hidden");
    }
  }
  button_answerQ5.onclick = function () {
    feedbackQ5();
  };
}
//Declaration Q5
var radiosQ5 = Array.from(document.querySelectorAll(".input_optionQ5"));
radiosQ5.map((radio) => {
  radio.onclick = (event) => checkQ5(event.target);
});