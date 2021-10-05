
$(document).ready(function() {
$('#tweet-text').on("input", function(event){
    //console.log($(this).val().length);
    let length = $(this).val().length;
    //console.log($(this).parent().children(".justTwitIt"))
    $(this).parent().children(".justTwitIt").children(".counter").text(140-length)

})


})