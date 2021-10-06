
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(() => {
  $.get("/tweets/", data, (data) =>{
    console.log("Data: ", data)
    const singleTweet = data[0];
    const $tweet = createTweetElement(singleTweet);
    //console.log($tweet)
    const $tweetContainer = $(".tweetContainer");
    $tweetContainer.append($tweet);
  }, "json")
  
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }
  
  const createTweetElement = function(tweet) {
    // let $tweet = /* Your code for creating the tweet element */
    // ...
    let $tweet = $(`
    <article class="old-Tweet"> 
          <header>
            <div class="image"> 
              <img src=${tweet.user.avatars}>
              <span > ${tweet.user.name}</span>
            </div>
            <div class="name" >
              <span><strong>${tweet.user.handle}</strong></span>
              
            </div>
  
          </header>
  
          <div class= "tweet">
            <p>${tweet.content.text}</p>
             </div>
  
             <footer> 
              <span>${tweet.created_at}</span>
              <div class="tweeticon">
                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>

             </footer>
  
        </article>
    `)

    return $tweet;
  }
  //return $tweet;
  renderTweets(data);
})

