const tilesEl = document.getElementsByClassName("tiles")[0];
const keysEl = document.getElementsByClassName("keys")[0];

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

const handleClick = () => {
  console.log("handled");
};

(function createKeyboard() {
  keys.forEach((key) => {
    const keyEl = document.createElement("button");
    keyEl.textContent = key;
    keyEl.setAttribute("id", key);
    keyEl.addEventListener("click", handleClick);
    keysEl.append(keyEl);
  });
})();
