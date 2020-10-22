const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitter = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show loading 

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide loading

function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API 
async function getQuote() {
    loading();
    // We need to use a Proxy URL to make our API call in order to avoid a CORS error
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
      const response = await fetch(apiUrl);
      const data = await response.text();  
      const json = JSON.parse(data); 
      //Check if Author exists
      if(json.quoteAuthor === ''){
        authorText.innerText = 'Unknown';
      }else{
        authorText.innerText = json.quoteAuthor; 
      }
      // Reduce  font size for long quotes
      if(json.quoteText.length > 120){
          quoteText.classList.add('long-quote');
      }else{
        quoteText.classList.remove('long-quote');
      }
      console.log(json);
     
      quoteText.innerText = json.quoteText;
      //Stop loader and show quote
      complete();
    } catch (error) {
        getQuote();
    }
  }

  //Tweet Quote
  function tweetQuote(){
      const quote = quoteText.innerText;
      const author = authorText.innerText;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
      window.open(twitterUrl, '_blank');
  }

  // Event listeners
  newQuoteBtn.addEventListener('click',getQuote);
  twitter.addEventListener('click',tweetQuote);

// On load 

getQuote();

loading();