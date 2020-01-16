
var nytimesAPIKey = "yZZmu1bf1f2UEL7CVA5FtXU1HB2a5R8v";
var giphyAPIKey = "tyiJUi8FXstcP5v2VDqINa4oxrUOa28p";
var newspaperContent = $('#newspaperContent');
var giphyContent = $('#giphyContent');



/*
This is the main function of the page
It will take the user inputs, validate them, and then search using 
NYtimes articles and also gifs
*/

function onClickExplore(){
  
  /*TODO: first clear any existing search results*/
    
  

  var inputText = $('#searchText').val();
  var GiphyLimit = 5; 
  //var maxResults = $('#quantity').val();
  
  // make the request to nytimes below!
  $.ajax({
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${nytimesAPIKey}&q=${inputText}`,
    type: 'GET',
    success: data => handleData(data),
  });
  
  
  //Giffy call now
  $.ajax({
    url: `https://cors-anywhere.herokuapp.com/http://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKey}&q=${inputText}&limit=${GiphyLimit}`,
    type: 'GET',
    success: data => handleDataGiphy(data),
  });
  
}




function handleData(data){
  
  //logToConsole(data.response.docs[0].headline.main);
  var listItems = '';  
  items = data.response.docs;
  //Loop through results and output to div
  for (var i = 0; i < items.length; i++) {
    var Headline = items[i].headline.main;
    var URL = items[i].web_url;
    listItems += `<li><a href="${URL}" target="_blank">${Headline}</a></li>`;
  }
  
  var wholeList = `<ol>${listItems}</ol>`;
  //newspaperContent.append(`<h2>Top articles from the New York Times:</h2>`);
  newspaperContent.append(wholeList);

}

function handleDataGiphy(data){
  var listItems = '';
  items = data.data;
  //loop through results and output
  for (var i = 0; i <items.length; i++){
   var image = items[i].images.fixed_height_small.url;
   listItems += `<p><img src='${image}'/></p>`;
   }
   
   var wholeList = `${listItems}`;
   //giphyContent.append(`<h2>And something lighter:</h2>`);
   giphyContent.append(wholeList);
}

function logToConsole(data){
  document.getElementById("debug").innerHTML += `<br>${data}`;
  //document.getElementById("debugtext").value += `\r\n${data}`;
}


$('#explore').click(onClickExplore);