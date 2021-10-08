/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac",
//     },
//     content: {
//       text: "If I have seen further it is by standing on the shoulders of giants",
//     },
//     created_at: 1461116232227,
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd",
//     },
//     content: {
//       text: "Je pense , donc je suis",
//     },
//     created_at: 1461113959088,
//   },
// ];

$(() => {
  // making a get request to see some data... jQuery.get( url [, data ] [, success ] [, dataType ] )
  const loadTweets = () => {
    $.get(
      "/tweets/",
      (data) => {
        //console.log("Data: ", data);
        //const singleTweet = data[0];
        //const $tweet = createTweetElement(singleTweet);
        //console.log($tweet)
        //const $tweetContainer = $(".tweetContainer");
        //$tweetContainer.append($tweet);
        renderTweets(data);
      },
      "json"
    );
  };

  loadTweets();

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
    // let $tweet = /* Your code for creating the tweet element */
    // ...
    // const $avatar = $(".image").append(`<img src=${tweet.user.avatars}>`);
    // const $name = $(".image span").text(tweet.user.name);
    // const $handle = $(".name span").text(tweet.user.handle);
    // const $content = $(".tweet p").text(tweet.content.text);
    // const $created_at = $(".tweet span").text(`${timeago.format(tweet.created_at)}`);

    // const $tweet = $("<article>").addClass("old-Tweet");
    // $tweet.append($avatar, $name, $handle, $content, $created_at);

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
  //return $tweet;
  //renderTweets(data);

  $("#charOverLimit").hide();
  $("#emptyTweet").hide();

  const $form = $("#new-tweet-form");
  $form.on("submit", function (event) {
    event.preventDefault();
    $("#charOverLimit").hide();
    $("#emptyTweet").hide();
    //console.log("form was submitted");
    // console.log($(this));
    const serializedData = $(this).serialize();
    //console.log($("#tweet-text").val());
    const text = $("#tweet-text").val();
    if (!text) {
      // alert("Oops! It's an empty tweet");
      $("#emptyTweet").show();
      return;
    }
    if (text.length > 140) {
      // alert("Oops! Tweet content is too long");
      $("#charOverLimit").show();
      return;
    }
    // $('#charOverLimit').hide()
    // $('#emptyTweet').hide()
    $.post("/tweets/", serializedData, (response) => {
      // console.log(response);
      $("#charOverLimit").hide();
      $("#emptyTweet").hide();
      $("#tweet-text").val("");
      $(".counter").val(140);
      loadTweets();
    });
  });
});
