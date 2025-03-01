function getGameArray(fieldNumber) {
  let gameArray = [];
  for (let i = 1; i <= fieldNumber; i++) {
    gameArray.push(i, i);
  }
  return gameArray;
}

const shuffle = (arr) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

function CreateElement(tagName, classList, textContent) {
  let element = document.createElement(tagName);
  if (classList) {
    element.classList.add(...classList.split(" "));
  }

  if (tagName === "li") {
    let front = document.createElement("div");
    front.classList.add("card-front");

    let questionMark = document.createElement("span");
    questionMark.classList.add("question-mark");
    questionMark.textContent = "?";

    front.appendChild(questionMark);

    let back = document.createElement("div");
    back.classList.add("card-back");
    back.textContent = textContent;

    element.append(front, back);
  } else if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

function checkWinCondition(array) {
  if (document.querySelectorAll(".match").length === array.length) {
    setTimeout(()=>{
        winMessage.classList.toggle("hidden")
        winMessage.textContent = "You WIN!!!";

    },300)

    setTimeout(() => {
      winMessage.innerHTML = "";
      winMessage.classList.toggle("hidden")
    }, 3000);
    setTimeout(() => {
      fieldUl.innerHTML = "";
    }, 100);
  }
}

const winMessage = CreateElement("p", "hidden win-msg", "");
const inputStart = CreateElement("input", "input-class", "");
inputStart.placeholder = "Введите размер поля";
const startButton = CreateElement("button", "start-btn-class", "START");
const fieldUl = CreateElement("ul", "field-ul", "");
const container = document.querySelector("[data-container]");

container.append(winMessage, inputStart, startButton, fieldUl);
let pairCartArr = [];

function getItem(array) {
  fieldUl.innerHTML = "";
  for (const cartNumber of array) {
    let item = CreateElement("li", "item-class flipped", cartNumber);

    item.addEventListener("click", function () {
      item.classList.add("input-class__click");

      if (
        pairCartArr.length === 2 ||
        item.classList.contains("match") ||
        pairCartArr.includes(item)
      ) {
        return;
      }

      item.classList.toggle("flipped");

      pairCartArr.push(item);

      if (pairCartArr.length === 2) {
        setTimeout(() => {
          if (pairCartArr[0].textContent === pairCartArr[1].textContent) {
            pairCartArr.forEach((card) => card.classList.add("match"));
          } else {
            pairCartArr.forEach((card) => {
              card.classList.toggle("flipped");
            });
          }
          pairCartArr = [];

          checkWinCondition(array);
        }, 500);
      }
    });
    fieldUl.append(item);
  }
}

function startRender() {
  startButton.onclick = function () {
    winMessage.innerHTML = "";
    if (
      !inputStart.value ||
      inputStart.value <= 0 ||
      isNaN(Number(inputStart.value))
    ) {
      inputStart.classList.toggle("input-class-shake")
      inputStart.value = "";

      return;
    }
    let fieldSize = Number(inputStart.value);
    inputStart.value = "";

    getItem(shuffle(getGameArray(fieldSize)));
  };
}
startRender();
