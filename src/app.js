import words from './data/words.js'
import sliceText from './utils/sliceText.js'

let selected_word = words[Math.floor(Math.random() * words.length)].text

let word = ''
const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  .concat(".-',")
  .concat(' ')

let text = document.querySelector('.text')
let input = document.querySelector('.input')

const checkText = () => {
  let slicedWord = sliceText(word)
  let letter_items = document.querySelectorAll('.letter')

  slicedWord.forEach((letter, index) => {
    letter_items[index].classList.remove(
      'letter--error',
      'letter--success',
      'letter--selected'
    )

    if (selected_word[index] === letter) {
      letter_items[index].classList.add('letter--success')
    } else if (selected_word[index] !== letter) {
      letter_items[index].classList.add('letter--error')
    }

    if (index < selected_word.length + 1 && word.trim() !== '') {
      letter_items[index + 1] !== undefined
        ? letter_items[index + 1].classList.add('letter--selected')
        : ''
    }
  })

  resetWord()
}

const resetWord = () => {
  if (selected_word.length == word.length) {
    selected_word = words[Math.floor(Math.random() * words.length)].text
    word = ''
    input.textContent = word
    setText()
  }
}

window.onkeydown = (e) => {
  if (e.key === 'Backspace') {
    word = word.slice(0, word.length - 1)
  } else if (characters.includes(e.key)) {
    word += e.key
  }

  input.textContent = word.split(' ').pop()
  checkText()
}

const setText = () => {
  let slicedText = sliceText(selected_word)

  text.innerHTML = ''

  slicedText.forEach((letter, index) => {
    let letterElement = document.createElement('span')
    letterElement.classList.add('letter')
    letterElement.innerHTML = letter
    text.appendChild(letterElement)
  })
}

checkText()
setText()
