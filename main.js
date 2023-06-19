import './style.css'
import { marked } from 'marked';
let input = document.querySelector('textarea');
let output = document.querySelector('#output');
let previewButton = document.querySelector(".preview");
let preview = document.querySelector("#preview");
let copy = document.querySelector(".copy")

marked.use({
  headerIds: false,
  mangle: false
})
input.value = JSON.parse(localStorage.getItem(`lastContent`))
input.addEventListener("input", () => {
  render();
  localStorage.setItem("lastContent", JSON.stringify(input.value));
})

previewButton.addEventListener('input', () => {
  render();
})

copy.addEventListener('click', () => {
  copyText()
})

function render() {
  if (handleOutput() === 1) {
    output.classList.add("hidden")
    preview.classList.remove("hidden")
    preview.innerHTML = marked.parse(input.value);
  } else {
    preview.classList.add("hidden")
    output.classList.remove("hidden")
    output.innerText = marked.parse(input.value);
  }
}

function handleOutput() {
  if (previewButton.checked === true) {
    return 1
  } else {
    return 0
  }
}

async function copyText() {
  let text = output.innerText;
  try {
    await navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  } catch (err) {
    alert('Failed to copy: ', err);
  }
}

render();

window.addEventListener("DOMContentLoaded", () => {
  input.setSelectionRange(input.value.length, input.value.length);
  input.blur()
  input.focus()
})
