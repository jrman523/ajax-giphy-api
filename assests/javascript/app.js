var gifs = ["lion", "cat", "dog", "mouse", "wolf", "bear", "eagle", "tiger", "bird", "monkey", "turtle", "fox"];

var gif;

function gifDisplay() {

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
            Image.attr("src", results[i].images.fixed_height.url);
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
        a.addClass("btn btn-outline-info gif");
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

$(".gif").on("click", function(event){
    event.preventDefault();
    gif = $(this).attr("data-name");
    gifDisplay();
});

