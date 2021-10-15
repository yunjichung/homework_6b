$('#none').click(function(){
    $('.indiimage').attr('src','./images/original.png')
});
$('#sugar').click(function(){
    $('.indiimage').attr('src','./images/sugar.png')
});
$('#vanilla').click(function(){
    $('.indiimage').attr('src','./images/vanilla.png')
});
$('#chocolate').click(function(){
    $('.indiimage').attr('src','./images/chocolate.png')
});


let arr = [];

const item = class {
    constructor (itemname, itemglaze, itemcount, itemprice) {
        this.itemname = itemname;
        this.itemglaze = itemglaze;
        this.itemcount = itemcount;
        this.itemprice = itemprice;
    }
}

function appendItems () {
    const newOriginal = new item(
        'Original',
        $('input[name="glazingselection"]:checked').val(),
        $('input[name="countselection"]:checked').val(),
        price($('input[name="countselection"]:checked').val())
    );
    arr.push(newOriginal);
    // console.log(arr);
    // cartnumber();
}

function price(count) {
    if (count == 1) {
        itemprice='$4.50';
    }
    else if (count== 3) {
        itemprice='$13.50';
    }
    else if (count== 6) {
        itemprice='$27.00';
    }
    else if (count== 12) {
        itemprice='$54.00';
    }
    return itemprice;
}

$('#addtocart').click(function(){
    var count = localStorage.getItem("cartNumber"); //get global
    count++; //update the count
    localStorage.setItem("cartNumber",count); //push back to global
    updateCartIndicator();

});



// storing data ----------------------------------------------------------------------------------------------------------

function updateCartIndicator(){
    if (localStorage.getItem("cartNumber")==0){
        $(".cartnav").text("Cart");
    } else {
        console.log(typeof localStorage.getItem("cartNumber"));
        $(".cartnav").text("Cart (" + localStorage.getItem("cartNumber") + ")");
    }
}
updateCartIndicator();

function resetCartCount(){
    localStorage.setItem("cartNumber",0);
    updateCartIndicator();
}