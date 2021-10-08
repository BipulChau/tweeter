/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  // making a get request to see some data... jQuery.get( url [, data ] [, success ] [, dataType ] )
  const loadTweets = () => {
    $.get(
      "/tweets/",
      (data) => {
        renderTweets(data);
      },
      "json"
    );
  };

  loadTweets();
  
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    const $tweetContainer = $(".tweetContainer");
    $tweetContainer.empty(); // clear out blog-container
    // repopulate blog-container
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    }
  };

  const createTweetElement = function (tweet) {
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
              <span>${timeago.format(tweet.created_at)}</span>
              
              <div class="tweeticon">
                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>

             </footer>
  
        </article>
    `);

    return $tweet;
  };

  $("#charOverLimit").hide();
  $("#emptyTweet").hide();

  const $form = $("#new-tweet-form");
  $form.on("submit", function (event) {
    event.preventDefault();
    $("#charOverLimit").hide();
    $("#emptyTweet").hide();

    const serializedData = $(this).serialize();

    const text = $("#tweet-text").val();
    if (!text) {
      $("#emptyTweet").show();
      return;
    }
    if (text.length > 140) {
      $("#charOverLimit").show();
      return;
    }

    $.post("/tweets/", serializedData, (response) => {
      $("#charOverLimit").hide();
      $("#emptyTweet").hide();
      $("#tweet-text").val("");
      $(".counter").val(140);
      loadTweets();
    });
  });
});
