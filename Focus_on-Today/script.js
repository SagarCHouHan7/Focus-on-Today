const checkBoxList = document.querySelectorAll(".custom-checkbox");
let inputFields = document.querySelectorAll(".goal-input");
let errorLabel = document.querySelector(".error-label");
let progressValue = document.querySelector(".progress-value");
let progressLabel = document.querySelector(".progress-label")

let allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: {
    name: "",
    completed: false,
  },
  second: {
    name: "",
    completed: false,
  },
  third: {
    name: "",
    completed: false,
  },
  forth: {
    name: "",
    completed: false,
  },
};

let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length

progressValue.style.width = `${completedGoalsCount * 100 / Object.values(allGoals).length}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${Object.values(allGoals).length} completed`;


const comments = [
  "Raise the bar by completing your goals!",
  "Well begun is half done",
  "Just half completed, keep going!", 
  "Just a step away, keep going!", 
  "Whao! You just completed all the goals, time for chill."]

progressLabel.innerText = comments[completedGoalsCount];

checkBoxList.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {

    let allInputFieldsFilled = [...inputFields].every((input) => {
      return input.value;
    });

    if (allInputFieldsFilled) {
      errorLabel.style.visibility = "hidden";
      checkBox.parentElement.classList.toggle("completed");

      const inputId = checkBox.nextElementSibling.id;

      allGoals[inputId].completed = !allGoals[inputId].completed;

      completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length

      progressValue.style.width = `${completedGoalsCount * 100 / Object.values(allGoals).length}%`;

      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${Object.values(allGoals).length} completed`;

      progressLabel.innerText = comments[completedGoalsCount];

      localStorage.setItem("allGoals", JSON.stringify(allGoals));

    }
    else {
      errorLabel.style.visibility = "visible";
    }
  });

});

inputFields.forEach((input) => {

  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    errorLabel.style.visibility = "hidden";
  });

  input.addEventListener("input", (e) => {

    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    allGoals[input.id].name = input.value;
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });

})






