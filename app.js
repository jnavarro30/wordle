const tilesEl = document.getElementsByClassName("tiles")[0];
const keysEl = document.getElementsByClassName("keys")[0];

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

const handleClick = (key) => {
  if (key === "«") {
    deleteLetter();
  } else {
    addLetter(key);
  }
  console.log("pressed " + key);
};

const addLetter = (letter) => {
  if (currentRow === 5 && currentTile === 4) return;
  let tile = document.getElementById(
    `guessRow-${currentRow}-tile-${currentTile}`
  );

  tile.textContent = letter;
  guessRows[currentRow][currentTile] = letter;
  tile.setAttribute("data", letter);
  currentTile++;
  console.log("guessRows", guessRows);
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

(function createKeyboard() {
  keys.forEach((key) => {
    const keyEl = document.createElement("button");
    keyEl.textContent = key;
    keyEl.setAttribute("id", key);
    keyEl.addEventListener("click", () => handleClick(key));
    keysEl.append(keyEl);
  });
})();
