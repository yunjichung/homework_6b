window.onload = function () {
    if (localStorage.getItem("globalCart") === null) {
        localStorage.setItem("globalCart", JSON.stringify([]));
    }
}


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

$('#amt1').click(function(){
    $('.indiprice').text("$4.50");
});
$('#amt3').click(function(){
    $('.indiprice').text("$13.50");
});
$('#amt6').click(function(){
    $('.indiprice').text("$27.00");
});
$('#amt12').click(function(){
    $('.indiprice').text("$54.00");
});

const item = class {
    constructor (itemname, itemglaze, itemcount, itemprice, itemphoto) {
        this.itemname = itemname;
        this.itemglaze = itemglaze;
        this.itemcount = itemcount;
        this.itemprice = itemprice;
        this.itemphoto = itemphoto;
    }
}

function appendItems () {
    if ($('input[name="glazingselection"]:checked').val() == undefined || $('input[name="countselection"]:checked').val() == undefined){
        window.alert("Fill out all option selection to add to cart!");
    } 
    const newOriginal = new item(
        'Original',
        $('input[name="glazingselection"]:checked').val(),
        $('input[name="countselection"]:checked').val(),
        price($('input[name="countselection"]:checked').val()),
        $('.indiimage').attr('src')
    );

    arrayOfItems = JSON.parse(localStorage.getItem("globalCart")); //get global
    arrayOfItems.push(newOriginal); //add new item
    localStorage.setItem("globalCart", JSON.stringify(arrayOfItems)); //update global

    console.log(arrayOfItems);
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
    if ($('input[name="glazingselection"]:checked').val() == undefined || $('input[name="countselection"]:checked').val() == undefined){
    } else {
        var count = localStorage.getItem("cartNumber"); //get global
        count++; //update count
        localStorage.setItem("cartNumber",count); //update global
        updateCartIndicator();
    }
});

function updateCartIndicator(){
    if (localStorage.getItem("cartNumber")==null){
        $(".cartnav").text("Cart");
        localStorage.setItem("cartNumber", 0);
        localStorage.setItem("globalCart", JSON.stringify([]));       
    } else if (localStorage.getItem("cartNumber")==0){
        $(".cartnav").text("Cart");
    } else {
        console.log(typeof localStorage.getItem("cartNumber"));
        $(".cartnav").text("Cart (" + localStorage.getItem("cartNumber") + ")");
    }
}
updateCartIndicator();

function resetCartCount(){
    localStorage.setItem("cartNumber",0); //reset count
    localStorage.setItem("globalCart", JSON.stringify([])); //reset array

    updateCartIndicator();
    
}

function showCart(){
    arrayOfItems = JSON.parse(localStorage.getItem("globalCart")); 
    sizeOfArray = arrayOfItems.length;

    $('.itemlist').text("");

    for(var i=0; i<sizeOfArray; i++){

        //arrayOfItems[i] each element being iterated through

        // this.itemname = itemname;
        // this.itemglaze = itemglaze;
        // this.itemcount = itemcount;
        // this.itemprice = itemprice;

        $('.itemlist').append(`
            <div class="item">
                <div class="imgbg">
                    <img class="itemimage" src="`+ arrayOfItems[i].itemphoto +`" alt="original">
                </div>
                <div class="itemname"><p>`+ arrayOfItems[i].itemname +`</p></div>
                <div class="itemglaze"><p>`+ arrayOfItems[i].itemglaze +`</p></div>
                <div class="itemcount"><p>Pack of `+ arrayOfItems[i].itemcount +`</p></div>
                <div class="itemprice"><p>`+ arrayOfItems[i].itemprice +`</p></div>
                <div><button class="removeitem" onclick="removeElementByIndex(`+ i +`)">Remove</button></div>
            </div>
        `);
    }
    pricetotal();
}
showCart();

function removeElementByIndex(i){
    arrayOfItems = JSON.parse(localStorage.getItem("globalCart")); //get global
    arrayOfItems.splice(i,1); //remove item
    localStorage.setItem("globalCart", JSON.stringify(arrayOfItems)); //update global
    showCart();
    minusCart();
}

function minusCart(){
    var cart = localStorage.getItem("cartNumber"); //get global
    cart--; //update cart
    localStorage.setItem("cartNumber",cart); //update global
    updateCartIndicator();
}

function pricetotal() {
    sum = 0;
    $('.itemprice').each(function(){
        var currency = $(this).text();
        var number = Number(currency.replace(/[^0-9.-]+/g,""));
        sum += number;
    });
    $('.totalprice').text(sum);
}