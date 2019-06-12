/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

const tweetData = {
  user: {
    fullName: "Newton",
    avatars: {
      small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    userName: "@SirIsaac"
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants"
  },
  created_at: 1461116232227
};
//   {
//     user: {
//       fullName: "Descartes",
//       avatars: {
//         small: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         regular: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         large: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       userName: "@rd"
//     },
//     content: {
//       text: "Je pense , donc je suis"
//     },
//     created_at: 1461113959088
//   },
//   {
//     user: {
//       fullName: "Johann von Goethe",
//       avatars: {
//         small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       userName: "@johann49"
//     },
//     content: {
//       text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     created_at: 1461113796368
//   }
// Create Tweet

$(document).ready(() => {
  function createTweetElement(tweetData) {
    let $tweet = $("<article>").addClass("tweet");

    let $newHeader = $("<header>").appendTo($tweet);

    $("<img>")
      .attr("src", tweetData.user.avatars.small)
      .addClass("avatar")
      .appendTo($newHeader);

    let $newSpan = $("<span>").appendTo($newHeader);

    $("<p>")
      .addClass("fullName")
      .text(tweetData.user.fullName)
      .appendTo($newSpan);

    $("<p>")
      .addClass("userName")
      .text(tweetData.user.userName)
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
  var $tweet = createTweetElement(tweetData);
  console.log('asdsadf', $tweet);
  $("#tweets-container").append($tweet);

});



