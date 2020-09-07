//adding DOM selectors to attach to HTML
const cardsContainerEl = document.querySelector("#cards-container");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const currentEl = document.querySelector("#current");
const showBtn = document.querySelector("#show-btn");
const hideBtn = document.querySelector("#hide-btn");
const questionEl = document.querySelector("#question");
const answerEl = document.querySelector("#answer");
const addCardBtn = document.querySelector("#add-card-btn");
const clearBtn = document.querySelector("#clear-btn");
const addContainerEl = document.querySelector("#add-card-container");

//keep track of current card
let currentActiveCard = 0;

//store DOM cards
const cardsEl = [];

//store card data
const cardsData = getCardsData();

// [
//   {
//     question: "what must a variable begin with?",
//     answer: "a letter, $, or _",
//   },
//   {
//     question: "what is a variable?",
//     answer: "conatiner for a piece of data",
//   },
//   {
//     question: "example of a case sensitive variable",
//     answer: "thisIsAVariable",
//   },
// ];

//create DOM card for each element of data
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

//create a single card in DOM
function createCard(data, index) {
  //creating div element
  const card = document.createElement("div");
  //giving the div element the class of card
  card.classList.add("card");

  //making the first data element of the array into the card with the active class
  if (index === 0) {
    //adding the class active
    card.classList.add("active");
  }
  //setting the inner HTML of the div created in the variable card
  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>
        ${data.question}
      </p>
    </div>
    <div class="inner-card-back">
      <p>
        ${data.answer}
      </p>
    </div>
  </div>
  `;

  //adding an event listener on the card for the flip animation to see the answer/question
  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  //putting the new card into the cards array
  cardsEl.push(card);
  //appending the card onto the card container in the HTML
  cardsContainerEl.appendChild(card);

  //updating number of cards
  updateCurrentText();
}

//show number of cards
function updateCurrentText() {
  //setting the HTML in the current div to display the current card and number of cards
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

//get cards information from local storage
function getCardsData() {
  //parsing the string from local storage into json and putting it into cards variable
  const cards = JSON.parse(localStorage.getItem("cards"));

  //ternary operator to check if local storage is null and returning the local storage data
  return cards === null ? [] : cards;
}

//set cards data in local storage
function setCardsData(cards) {
  //setting local storage with the passed in value
  localStorage.setItem("cards", JSON.stringify(cards));
  //reloading the page with new local storage info
  window.location.reload();
}

//calling function to create the cards and display them in the DOM
createCards();

//event listeners
//show add container
showBtn.addEventListener("click", () => addContainerEl.classList.add("show"));

//hide add container
hideBtn.addEventListener("click", () =>
  addContainerEl.classList.remove("show")
);

//add new card
addCardBtn.addEventListener("click", () => {
  event.preventDefault();
  //variables to hold the question and the answer
  const question = questionEl.value;
  const answer = answerEl.value;
  // console.log(question, answer);

  //if there are values in question/answer
  if (question.trim() && answer.trim()) {
    //creating new card object
    const newCard = { question, answer };

    //passing new card object into the createCard function
    createCard(newCard);

    //setting value of inputs for question/answer text area to empty string
    questionEl.value = "";
    answerEl.value = "";

    //replacing the placeholder strings into question/answer textareas
    questionEl.placeholder = "Enter question for front of card here...";
    answerEl.placeholder = "Enter answer for back of card here..";

    //removing the show class from the add container div
    addContainerEl.classList.remove("show");

    //putting the new card information into the cardsData variable that saves it into local storage
    cardsData.push(newCard);

    //saving cards data, with new card information
    setCardsData(cardsData);
  } else {
    //error message to enter in question and answer values
    //TODO - make this an html element with setTimeout to remove.  No alerts!!
    alert("please enter a value for both question AND answer!");
  }
});

//next card button
nextBtn.addEventListener("click", () => {
  //putting the "left" class on current card to make it do the appropriate CSS animation
  cardsEl[currentActiveCard].className = "card left";

  //incrementing the index variable for the cards
  currentActiveCard++;

  //logic to not allow the cards to progress past the last one
  if (currentActiveCard > cardsEl.length - 1) {
    //setting index variable to last index value
    currentActiveCard = cardsEl.length - 1;
  }

  //setting the next card in the index with the "active" class so that it displays on screen
  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

//previous card button
prevBtn.addEventListener("click", () => {
  //putting the "right " class on current care to make it do the appropriate CSS animation
  cardsEl[currentActiveCard].className = "card right";

  //decrementing the index variable for the cards
  currentActiveCard--;

  //logic to not allow the cards to progress past the first element in the index
  if (currentActiveCard < 0) {
    //setting the index variable to 0 when it is on the last(or first) card
    currentActiveCard = 0;
  }

  //setting next card in the index with the "active" class so that it displays on screen
  cardsEl[currentActiveCard].className = "card active";

  //update the current card information
  updateCurrentText();
});

//clear cards button
clearBtn.addEventListener("click", () => {
  //clear local storage
  localStorage.clear();
  //setting the card container html to empty string
  cardsContainerEl.innerHTML = "";
  //reloading the page
  window.location.reload();
});
