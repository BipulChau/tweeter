
$(document).ready(function() {
$('#tweet-text').on("input", function(event){
    //console.log($(this).val().length);
    let length = $(this).val().length;
    //console.log($(this).parent().children(".justTwitIt"))
    let max =140;
    $(this).parent().children(".justTwitIt").children(".counter").text(140-length) ;
    if(length > max) {
      //$(this).parent().children(".justTwitIt").children(".counter").css({"color": "red"})
      $(this).parent().children(".justTwitIt").children(".counter").addClass("red")
      
    }

})


})