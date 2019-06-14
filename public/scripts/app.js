/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const baseURL = "http://localhost:8080/";

// calculates how long ago a tweet was made
function timeAgo(ts) {
  const d = new Date();
  const currentDay = Math.floor(d.getTime() / 86400000);
  const postedDay = ts / 86400000;
  const dateDifference = Math.floor(currentDay - postedDay);

  if (dateDifference > 365) {
    return `More than a year ago`;
  }
  if (dateDifference > 30) {
    return `More than 1 month ago`;
  }
  if (dateDifference > 7) {
    return `More than 1 week ago`;
  }
  if (dateDifference > 1) {
    return `${dateDifference} days ago`;
  }
  if (dateDifference === 1) {
    return `1 day ago`;
  }
  if (dateDifference < 1) {
    return `Less than a day ago`;
  }
}

$(document).ready(() => {
  //Toggles new tweet section by clicking the compose button
  $("#compose").click(() => {
    $(".new-tweet").slideToggle();
    $("#textArea").focus();
  });

  // Creates a post request once a user enters a tweet, and clicks submit. If the character requirements have not been met, an error message slides into place.

  $("#postTweet").on("submit", event => {
    event.preventDefault();
    const $textAreaLength = $.trim($("#textArea").val()).length;

    $("#errorMessage").slideUp("fast");

    if ($textAreaLength > 140) {
      $("#errorMessage")
        .text(
          "You have exceeded the maximum character length! Please revise your post."
        )
        .slideToggle();
    } else if ($textAreaLength === 0) {
      $("#errorMessage")
        .text(
          "Uh-oh. It looks like you haven't entered anything into the field."
        )
        .slideToggle();
    } else {
      $.post(`${baseURL}tweets`, $("#postTweet").serialize(), () => {
        loadTweets();
      });
    }
  });

  //Retrieves tweets that have been posted to the /tweets URL.
  function loadTweets() {
    $.get(`${baseURL}tweets`, data => {
      $("#tweets-container").empty();
      renderTweets(data);
    });
  }

  //Renders each tweet and adds it to the tweet container making the tweet visable to the user.

  function renderTweets(tweetData) {
    for (let eachTweet of tweetData) {
      $("#tweets-container").prepend(createTweetElement(eachTweet));
    }
  }

  //Creates new HTML elements
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
