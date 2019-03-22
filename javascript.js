//array for adding user choice of gif, along with starting gif buttons//
var Gifs = ["turtles", "cats", "dogs", "birds"]

//this display gifs on html
function displayGif(){
var gif = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=UKyslqERgxeFUY2ThMGXy0uiD2ZEpsRI&limit=10";



        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response.data)
            var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("gif_arrange")

            var rating = results[i].rating;
              console.log(results[i].rating)
            var p = $("<p>").text("Rating: " + rating);

            var GifImage = $("<img>");
            GifImage.addClass("gif-animate")
            GifImage.attr("src", results[i].images.fixed_height_still.url);
            GifImage.attr("data-still", results[i].images.fixed_height_still.url);
            GifImage.attr("data-animate", results[i].images.fixed_height.url);
            GifImage.attr("data-state", "still");

            gifDiv.prepend(p);
            gifDiv.prepend(GifImage);

            $("#gifs-view").prepend(gifDiv);
          }
          //lets user pause and unpause gifs
          $(".gif-animate").on("click", function pauseGifs() {
     
            var state = $(this).attr("data-state");
            console.log(state)
        if( state === "still"){
         $(this).attr("src", $(this).attr("data-animate"))
         $(this).attr("data-state", "animate")
        }
             
           
        else {
         $(this).attr("src", $(this).attr("data-still"))
         $(this).attr("data-state", "still")
        
        }
        });
          });
}

//lets user pause and unpause gifs//

//function to crate buttons dynamically
function renderbuttons (){

    $("#buttons-view").empty();

    for (var i = 0; i < Gifs.length; i++) {
        var a = $("<button>");
        a.addClass("gif-btn");
        a.attr("data-name", Gifs[i]);
        a.text(Gifs[i]);
        
        $("#buttons-view").append(a)
}






}
//this function pushes our movie value to the movies array
$("#add-Gif").on("click", function(event){
    event.preventDefault()
    var gif = $("#gif-input")
    .val()
    .trim()

    //add movies to array
    Gifs.push(gif)

renderbuttons()

});

$(document).on("click", ".gif-btn", displayGif);



//maeks default buttons//
renderbuttons()
