$("#leftbutton").click(function(){
    $(".car_rolls li").eq(0).insertAfter(".car_rolls li:last-child");
});

$("#rightbutton").click(function(){
    $(".car_rolls li").eq(-1).insertBefore(".car_rolls li:first-child");
});