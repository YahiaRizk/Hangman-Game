let letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
// console.log(lettersArray)
let lettersContainer = document.querySelector(".row .letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let letterText = document.createTextNode(letter);
  span.append(letterText);
  span.classList.add("letter-box");
  lettersContainer.append(span);
});

// let words = {
//   movies: [
//     "Avatar",
//     "Titanic",
//     "Logan",
//     "The Godfather",
//     "Inception",
//     "Seven",
//     "Interstellar",
//     "Parasite",
//     "Gladiator",
//     "The Prestige",
//     "Oppenheimer",
//     "Memento",
//     "Heat",
//     "Dangal",
//   ],
//   people: [
//     "Nelson Mandela",
//     "Albert Einstein",
//     "Mahatma Gandhi",
//     "Thomas Edison",
//     "Pele",
//     "Angelina Jolie",
//     "Bill Gates ",
//     "Muhammad Ali",
//     "George Clooney",
//     "Brad Pitt",
//     "Mohammed Salah",
//     "Johnny Depp",
//     "Jim Carrey",
//   ],
//   countries: [
//     "Egypt",
//     "Bahrain",
//     "Iraq",
//     "Lebanon",
//     "Qatar",
//     "Saudi",
//     "Syria",
//     "Palestine",
//     "Algeria",
//     "Morocco",
//     "Tunisia",
//     "Libya",
//     "Kuwait",
//   ],
//   sports: [
//     "Football",
//     "Baseball",
//     "Basketball",
//     "Bowling",
//     "Boxing",
//     "Chess",
//     "Diving",
//     "Golf",
//     "Hockey",
//     "Handball",
//     "Karate",
//     "Parachuting",
//     "Rugby",
//   ],
// };

//Generate Data object from JSON
async function getData() {
  let myData = await fetch("./words.json");
  let words = await myData.json();

  //** Generate Random Word From Words Object
  let categoriesArray = Object.keys(words);
  console.log(categoriesArray);
  // Random categroy index and name depending on categories array
  let randomCategoryIndex = Math.floor(Math.random() * categoriesArray.length);
  let randomCategoryName = categoriesArray[randomCategoryIndex];
  //The choosen category from words object
  let randomCategoryValue = words[randomCategoryName];

  //Append the choosen category to game-info span
  document.querySelector(".category span").innerHTML = randomCategoryName;

  //Determine random choosen word index and value
  let subCategoryIndex = Math.floor(Math.random() * randomCategoryValue.length);
  let subCategoryValue = randomCategoryValue[subCategoryIndex];
  console.log(subCategoryValue);

  //** Letters Guess Section
  let lettersGuess = document.querySelector(".letters-guess");
  //Make Array From Choosen Word
  let choosenWordArray = Array.from(subCategoryValue.toLowerCase());
  //Append span for Every Letter
  choosenWordArray.forEach((letter) => {
    let span = document.createElement("span");
    // If it is A space Add class space to span
    if (letter === " ") {
      span.classList.add("space");
    }
    lettersGuess.append(span);
  });

  //Make array from letters guess spans
  let lettersGuessSpans = Array.from(
    document.querySelectorAll(".letters-guess span")
  );

  //Set Wrong Attemptes
  let wrongAttempts = 0;

  //Select The draw Element
  let hangmanDraw = document.querySelector(".hangman-draw");

  //Create Success and Fail Sounds
  let successSound = new Audio("./Sounds/success-1.mp3");
  let failSound = new Audio("./Sounds/fail-1.mp3");
  let GameCompleteSound = new Audio("./Sounds/GameComplete.mp3");
  let GameOversSound = new Audio("./Sounds/GameOver.mp3");

  //Handle Clicking on Letters
  document.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.classList.contains("clicked")) {
      return;
    }
    let theStatus = false;
    if (clickEvent.target.classList.contains("letter-box")) {
      clickEvent.target.classList.add("clicked");
      let clickedLetter = clickEvent.target.innerHTML;

      choosenWordArray.forEach((wordLetter, wordIndex) => {
        if (wordLetter == clickedLetter) {
          theStatus = true;
          // lettersGuessSpans.forEach((span, spanIndex) => {
          //   if (spanIndex === wordIndex) {
          //     span.innerHTML = wordLetter
          //   }
          // })

          //Another Way
          lettersGuessSpans[wordIndex].innerHTML = wordLetter;
        }
      });
      if (theStatus === false) {
        wrongAttempts++;
        hangmanDraw.classList.add(`wrong-${wrongAttempts}`);
        //Play Fail Sound
        failSound.play();
        if (wrongAttempts === 8) {
          endGame();
          GameOversSound.play();
          lettersContainer.classList.add("finished");
        }
      } else {
        successSound.play();
      }
      let check = lettersGuessSpans.every(function (span) {
        return span.innerHTML != "" || span.classList.contains("space");
      });
      console.log(check);
      //Check Game Complete
      if (check === true) {
        GameComplete();
        GameCompleteSound.play();
        lettersContainer.classList.add("finished");
      }
    }
  });

  //Create End Game Function
  function endGame() {
    let div = document.createElement("div");
    let divText = document.createTextNode(
      `Game Over, The Word Is: \n${subCategoryValue}`
    );
    div.classList.add("popup");

    div.appendChild(divText);
    document.body.appendChild(div);
  }

  //Create Function Game Complete
  function GameComplete() {
    let div = document.createElement("div");
    div.classList.add("popup");

    div.innerHTML = `Congratulations, Game Compelete<br>
    The Word Is: ${subCategoryValue}<br>
    You Made ${wrongAttempts} Mistakes`;

    document.body.appendChild(div);
  }
}

getData();
