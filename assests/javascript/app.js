var gifs = ["lion", "cat", "dog", "mouse", "wolf", "bear", "eagle", "tiger", "bird", "monkey", "turtle", "fox"];

//var gif;

function gifDisplay(gif) {

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            var Div = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var Image = $("<img>");
            Image.attr("src", results[i].images.original_still.url);
            Image.attr("data-still", results[i].images.original_still.url);
            Image.attr("data-animate", results[i].images.fixed_height.url);
            Image.attr("data-state", "still");
            Image.addClass("gif");
            Div.append(p);
            Div.append(Image);
            $("#gifs-appear-here").prepend(Div);
        }
    });
}

function renderButtons() {

    $("#button-view").empty();

    for (var i = 0; i < gifs.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-outline-info gif-btn");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#button-view").append(a);
    }
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();

    var input = $("#gif-input").val().trim();
    gifs.push(input);
    renderButtons();
});

renderButtons();

$(document).on("click", ".gif-btn", function (event) {
    event.preventDefault();
    var gif = $(this).attr("data-name");
    gifDisplay(gif);
});

$(document).on("click",".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
