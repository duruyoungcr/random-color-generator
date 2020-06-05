const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const button = document.querySelector(".btn");
const colorSpan = document.querySelector(".color");
const topText = document.querySelector(".heading");
const palettes = document.querySelectorAll(".palette");
const recentColors = [];

button.addEventListener("click", () => {
  const color = generateRandomColor();
  setColors(color);
});

function generateRandomColor() {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * hex.length);
    hexColor += hex[index];
  }
  return hexColor;
}
function setColors(color) {
  colorSpan.textContent = color;
  colorSpan.style.color = color;
  document.body.style.backgroundColor = color;
  topText.style.color = color;

  //creating the palette with the 6 most recent generated colors
  if (recentColors.length < 6) {
    recentColors.push(color);
    for (let i = 0; i < recentColors.length; i++) {
      palettes[i].style.backgroundColor = recentColors[i];
      //show color hex code on palette hover
      palettes[i].setAttribute("title", recentColors[i]);
    }
  } else {
    recentColors.shift(recentColors[0]);
    recentColors.push(color);
    for (let i = 0; i < recentColors.length; i++) {
      palettes[i].style.backgroundColor = recentColors[i];
      //show color hex code on palette hover
      palettes[i].setAttribute("title", recentColors[i]);
    }
  }
}
//copy current color to clipboard
colorSpan.onclick = () => document.execCommand("copy");
colorSpan.addEventListener("copy", (e) => {
  e.preventDefault();
  if (e.clipboardData) {
    e.clipboardData.setData("text/plain", colorSpan.textContent);
  }
});
