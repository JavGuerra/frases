// TODO Si faltan las citas
// TODO Cambiar sólo si se pulsa el icono. chInterval = 0
// TODO Al hacer clic en el icono de compartir, pausar el timer del cambio
// TODO Iconos por botones
// TODO Color de iconos SVG, FA...
// TODO Entrecomillado si/no
// TODO Enlace y texto alt
// TODO Si no hashtag, no boton de Tweet
// TODO Si no link, no boton de Web
// TODO Mostrar botón Otro sí/no


// check the config variables
if (typeof chInterval == "undefined" || chInterval === "") {
  chInterval = 20000;
}

if (typeof txtColor !== "undefined" || txtColor !== "") {
  document.getElementById("colors").style.color = txtColor;
}

// prepare the title and subtitle formatted string
formattedTitle = "";

if (typeof title !== "undefined" || title !== "") {
  formattedTitle += '<span class="title">' + title + '</span>';
}

if (typeof subtitle !== "undefined" || subtitle !== "") {
  formattedTitle += '<span class="subtitle">' + subtitle + '</span>';
}

if (formattedTitle !== "") {
  formattedTitle = '<p class="head">' + formattedTitle + '</p>';
  document.getElementById('title-box').innerHTML = formattedTitle;
}


// initialize variables
var random;
var selection;
// quotes must not be duplicated until they have all been used
// so first, initialize array of used random numbers
var usedRandomNumbers = [];
// next, initialize counter that will track when all quotes have been used
var counter = 0;

var tweet = "";


// this function will increase counter and reset once all quotes have been used
function trackUsed() {
  counter += 1;
  // if all quotes have been used once, reset array of used numbers
  if (counter === quotes.length) {
    usedRandomNumbers.length = 0;
    counter = 0;
  }
}


// this code will randomly change the background colour and add to html
function colourChange() {
  if (typeof bgColors !== "undefined" || bgColors !== "") {
    colorIndex = Math.floor(Math.random() * bgColors.length - 1);
    document.getElementById("colors").style.backgroundColor = bgColors[colorIndex];
  }
}


/* this function will select a random quote object from array,
  then test to see whether quote has been used,
  then return quote object */
function getRandomQuote() {

  // generate random number between 0 and total number of values in array
  random = Math.floor(Math.random() * quotes.length);
  // if number has not been used already, add it to used numbers and return random quote
  if (usedRandomNumbers.indexOf(random) === -1) {
    usedRandomNumbers.push(random);
    trackUsed();
    return quotes[random];
    // if it has been used, generate random numbers until you get a new one
  } else {
    while (usedRandomNumbers.indexOf(random) > -1) {
      random = Math.floor(Math.random() * quotes.length);
    }
    // then add it to used numbers and return random quote
    usedRandomNumbers.push(random);
    trackUsed();
    return quotes[random];
  }
}


// this function adds the selected quote to the page and calls colourChange
function printQuote() {
  // call colourChange
  colourChange();
  // call getRandomQuote, store the returned quote object in a variable
  selection = getRandomQuote();
  // construct a string using the different properties of the quote object
  var formattedQuote = "";
  if (typeof selection.source !== "undefined") {
    formattedQuote = '<span class="source">' + selection.source + '</span>';
  }
  if (typeof selection.citation !== "undefined") {
    formattedQuote += '<span class="citation">' + selection.citation + '</span>';
  }
  if (typeof selection.year !== "undefined") {
    formattedQuote += '<span class="year">' + selection.year + '</span>';
  }
  if (formattedQuote !== "") {
    formattedQuote = '<p class="origin">' + formattedQuote + '</p>';
  }
  formattedQuote = '<p class="quote">' + selection.quote + '</p>' + formattedQuote;
  if (typeof selection.tags !== "undefined") {
    formattedQuote += '<p class="tags">' + selection.tags.join(', ') + '</p>';
  }
  // display final HTML string to the page
  document.getElementById('quote-box').innerHTML = formattedQuote;
  
  
  // TODO comprobar que existe tweet
  // TODO Ojo con los signos "%" y otros en los quotes
  tweet = selection.quote;
  tweet = tweet.replace(/\%/g, "\%25");
  tweet = "https://twitter.com/intent/tweet\?text=" + tweet;
  tweet += "\&hashtags=" + hashTags;
  tweet += "\&url=" + tweetLink;
  tweet += "\&via=" + user;

}

// TODO comprobar tweet aquí
function sendTweet() {
  window.open(tweet);
}

// TODO comprobar enlace aquí
function openWeb() {
  window.open(link);
}

// event listener to respond to clicks on the page
// when user clicks anywhere on the page, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
// TODO comprobar tweet
document.getElementById('sendTweet').addEventListener("click", sendTweet, false);
// TODO comprobar enlace
document.getElementById('sendSite').addEventListener("click", openWeb, false);
//call printQuote every interval
window.setInterval(printQuote, chInterval);
//fist call to printQuote
printQuote();
