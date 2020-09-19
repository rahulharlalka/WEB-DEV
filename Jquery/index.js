$("h1").addClass("bigtitle margin-50");

$("h1").text("new text");

$("a").attr("href","https://www.youtube.com");

$("h1").click(function(){
    $("h1").css("color","purple");
});


$("button").click(function(){
    $("h1").css("color","purple");
});

$("input").keypress(function(event){
    console.log(event.key);
});

$("h1").on("mouseover",function(){
    $("h1").css("color","blue");
})