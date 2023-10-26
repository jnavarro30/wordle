const tilesEl = document.getElementsByClassName("tiles")[0];
const keysEl = document.getElementsByClassName("keys")[0];
const messagesEl = document.getElementsByClassName("messages")[0];
let wordle;

(function fetchWordle() {
  fetch("http://localhost:8000/word")
    .then(response => response.json())
    .then(json => {
      console.log(json);
      wordle = json.word.toUpperCase();
    })
    .catch(err => {
      console.log(err);
    });
})();

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "«",
];

const guessRows = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

// Adding rows and tiles
guessRows.forEach((guessRow, guessRowIndex) => {
  const rowEl = document.createElement("div");
  rowEl.setAttribute("id", `guessRow-${guessRowIndex}`);

  guessRow.forEach((guess, guessIndex) => {
    const tileEl = document.createElement("div");
    tileEl.setAttribute("id", `guessRow-${guessRowIndex}-tile-${guessIndex}`);
    tileEl.classList.add("tile");
    rowEl.append(tileEl);
  });

  tilesEl.append(rowEl);
});

const handleClick = key => {
  if (isGameOver) return;
  key === "ENTER" ? checkRow() : key === "«" ? deleteLetter() : addLetter(key);
};

const addLetter = letter => {
  if (currentTile === 5) return;
  let tile = document.getElementById(
    `guessRow-${currentRow}-tile-${currentTile}`
  );

  tile.textContent = letter;
  guessRows[currentRow][currentTile] = letter;
  currentTile++;
};

const deleteLetter = () => {
  if (currentTile === 0) return;
  currentTile--;

  let tile = document.getElementById(
    `guessRow-${currentRow}-tile-${currentTile}`
  );

  tile.textContent = "";
  guessRows[currentRow][currentTile] = "";
};

const checkWordle = guess => {
  fetch(`http://localhost:8000/check/?guess=${guess}`)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if (json.result_message === "Entry word not found") {
        showMessage("Not a Word");
        return;
      } else {
        flipTiles();
        if (guess === wordle) {
          showMessage(`You Win! The word was ${wordle}`);
          isGameOver = true;
        } else if (currentRow >= 5) {
          isGameOver = true;
          showMessage(`Game Over! The word was ${wordle}`);
          return;
        } else if (currentRow < 5) {
          currentRow++;
          currentTile = 0;
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const checkRow = () => {
  if (currentTile < 5) return;
  const guess = guessRows[currentRow].join("");
  checkWordle(guess);
};

const showMessage = message => {
  const messageEl = document.createElement("p");
  messageEl.textContent = message;
  messagesEl.append(messageEl);
  setTimeout(() => messagesEl.removeChild(messageEl), 2000);
};

const addColorToKey = (keyLetter, color) => {
  const keyEl = document.getElementById(keyLetter);
  keyEl.classList.add(color);
};

const flipTiles = () => {
  const rowTiles = document.getElementById(`guessRow-${currentRow}`).childNodes;

  rowTiles.forEach((tile, index) => {
    const tileLetter = tile.textContent;

    setTimeout(() => {
      tile.classList.add("flip");
      if (tileLetter === wordle[index]) {
        tile.classList.add("green-overlay");
        addColorToKey(tileLetter, "green-overlay");
      } else if (wordle.includes(tileLetter)) {
        tile.classList.add("yellow-overlay");
        addColorToKey(tileLetter, "yellow-overlay");
      } else {
        tile.classList.add("grey-overlay");
        addColorToKey(tileLetter, "grey-overlay");
      }
    }, 500 * index);
  });
};

(function createKeyboard() {
  keys.forEach(key => {
    const keyEl = document.createElement("button");
    keyEl.textContent = key;
    keyEl.setAttribute("id", key);
    keyEl.addEventListener("click", () => handleClick(key));
    keysEl.append(keyEl);
  });
})();
