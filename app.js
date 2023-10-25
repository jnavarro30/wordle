const tilesEl = document.getElementsByClassName("tiles")[0];
const keysEl = document.getElementsByClassName("keys")[0];
const messagesEl = document.getElementsByClassName("messages")[0];

const word = "SUPER";
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

const checkRow = () => {
  if (currentTile < 5) return;
  const guess = guessRows[currentRow].join("");
  flipTiles();
  if (guess === word) {
    showMessage(`You Win! The word was ${word}`);
    isGameOver = true;
  } else if (currentRow >= 5) {
    isGameOver = true;
    showMessage(`Game Over! The word was ${word}`);
    return;
  } else if (currentRow < 5) {
    currentRow++;
    currentTile = 0;
  }
};

const showMessage = message => {
  const messageEl = document.createElement("p");
  messageEl.textContent = message;
  messagesEl.append(messageEl);
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
      if (tileLetter === word[index]) {
        tile.classList.add("green-overlay");
        addColorToKey(tileLetter, "green-overlay");
      } else if (word.includes(tileLetter)) {
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
