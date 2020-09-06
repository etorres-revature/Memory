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
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

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

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  //add to DOM cards
  cardsEl.push(card);
  cardsContainerEl.appendChild(card);

  updateCurrentText();
}

//show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

//get cards information from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));

  return cards === null ? [] : cards;
}

//set cards data in local storage
function setCardsData(cards) {
    localStorage.setItem("cards", JSON.stringify(cards));

    window.location.reload();
}

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
  const question = questionEl.value;
  const answer = answerEl.value;
  // console.log(question, answer);

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    questionEl.placeholder = "Enter question for front of card here...";
    answerEl.placeholder = "Enter answer for back of card here..";

    addContainerEl.classList.remove("show");

    cardsData.push(newCard);

    setCardsData(cardsData);
  } else {
    alert("please enter a value for both question AND answer!");
  }
});

//next card button
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard++;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

//previous card button
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard--;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});
