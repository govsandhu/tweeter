/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const baseURL = "http://localhost:8080/"


// calculate time ago
function timeAgo(ts) {
  const d = new Date();
  const nowTs = Math.floor(d.getTime() / 1000);
  const seconds = nowTs - ts;

  if (seconds > 2 * 24 * 3600) {
      return "a few days ago";
  }
  if (seconds > 24 * 3600) {
      return "yesterday";
  }

  if (seconds > 3600) {
      return "a few hours ago";
  }
  if (seconds > 1800) {
      return "Half an hour ago";
  }
  if (seconds > 60) {
      return Math.floor(seconds / 60) + " minutes ago";
  }
  return "A long time ago"
}



// Create Tweet object/Render on page

$(document).ready(() => {
  
  $('#compose').click(() => {
    $(".new-tweet").toggle();
    $("#textArea").focus();
  });

  // Creates a post request once a user enters a tweet, and clicks submit. If there is an character requirements have not been met, an error message slides into place.
  $('#postTweet').on('submit', (event) => {
    event.preventDefault();
    const $textAreaLength = $('#textArea').val().length;

    $('#errorMessage').slideUp("fast")

    if($textAreaLength > 140) {
      $('#errorMessage').slideDown("300")
            .text("You have exceeded the maximum character length! Please revise your post.")
    } else if ($textAreaLength === 0) {
      $('#errorMessage').slideDown("300")
            .text("Uh-oh. It looks like you haven't entered anything into the field.")
    } else {
      $.post(`${baseURL}tweets`, $('#postTweet').serialize(), () => {
        loadTweets();
      })
     
    }
  });

  function loadTweets() {
    // 
    $.get(`${baseURL}tweets`, (data) => {
      $("#tweets-container").empty()
      renderTweets(data)
    })
  }


  function renderTweets(tweetData) {
    for(let eachTweet of tweetData){
       $('#tweets-container').prepend(createTweetElement(eachTweet));   
    }
  }

  function createTweetElement(tweetData) {
    const $tweet = $("<article>").addClass("tweets");

    const $newHeader = $("<header>").appendTo($tweet);

    $("<img>")
      .attr("src", tweetData.user.avatars.small)
      .addClass("avatar")
      .appendTo($newHeader);

    let $newSpan = $("<span>").appendTo($newHeader);

    $("<p>")
      .addClass("name")
      .text(tweetData.user.name)
      .appendTo($newSpan);

    $("<p>")
      .addClass("handle")
      .text(tweetData.user.handle)
      .appendTo($newSpan);

    $("<p>")
      .appendTo($tweet)
      .addClass("text")
      .text(tweetData.content.text);

    $("<footer>")
      .appendTo($tweet)
      .addClass("created-at")
      .text(timeAgo(tweetData.created_at));

      return $tweet;
  }

  loadTweets();
});



