const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader=document.getElementById('loader');

let apiQuotes = [];

// ShowLoading

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

//HideLoading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

//Show New Quote

function newQuote() {
    loading();
  // Pick a random quote from apiQuotes array
  const randomNumber = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[randomNumber];

  //check if author is blank, then replace it with unknown
  authorText.textContent = !quote.author ? "Unknown":quote.author;

  //check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log("Error " + error);
  }
}


//Tweet Quote
function tweetQuote(){
    // const facebookUrl=`http://www.facebook.com/sharer.php?s=100&p[title]=Quote&p[summary]=${quoteText.textContent} - ${authorText.textContent}`;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuotes();
