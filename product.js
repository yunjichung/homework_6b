// arrayOfItems = [] //local array
// localStorage.setItem("globalCart", JSON.stringify(arrayOfItems)); //since array cannot be stored in global (only numbers and strings?), save it as string








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


// $('.checkmark3').click(function(){
//     itemprice="";
//     console.log(typeof this.text);
//     if (this.text == "1") {
//         itemprice='$4.50';
//     }
//     else if (this.text == "3") {
//         itemprice='$13.50';
//     }
//     else if (this.text == "6") {
//         itemprice='$27.00';
//     }
//     else if (this.text == "12") {
//         itemprice='$54.00';
//     }
//     $('.indiprice').text(itemprice);
// });


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
    const newOriginal = new item(
        'Original',
        $('input[name="glazingselection"]:checked').val(),
        $('input[name="countselection"]:checked').val(),
        price($('input[name="countselection"]:checked').val()),
        $('.indiimage').attr('src')
    );

    //first get the latest global and then set it to a usable array
    arrayOfItems = JSON.parse(localStorage.getItem("globalCart")); 
    //add a new item
    arrayOfItems.push(newOriginal);
    //update global
    localStorage.setItem("globalCart", JSON.stringify(arrayOfItems));

    console.log(arrayOfItems);

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
    localStorage.setItem("cartNumber",0); //reset count
    localStorage.setItem("globalCart", JSON.stringify([])); //reset array

    updateCartIndicator();
    
}

function showCart(){
    arrayOfItems = JSON.parse(localStorage.getItem("globalCart")); 
    sizeOfArray = arrayOfItems.length;

    // console.log(sizeOfArray);

    $('.itemlist').text("");

    for(var i=0; i<sizeOfArray; i++){

        //arrayOfItems[i] each element being iterated through

        //-----object attributes-----
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
    //remove i-th element from "globalCart"
    //first get the latest global and then set it to a usable array
    arrayOfItems = JSON.parse(localStorage.getItem("globalCart")); 
    //remove the i-th element
    arrayOfItems.splice(i,1);
    //update global
    localStorage.setItem("globalCart", JSON.stringify(arrayOfItems));
    showCart();
    minusCart();
}

function minusCart(){
    var cart = localStorage.getItem("cartNumber");
    cart--;
    localStorage.setItem("cartNumber",cart); //push back to global
    updateCartIndicator();
}

function pricetotal() {
    sum = 0;
    $('.itemprice').each(function(){
        var currency = $(this).text();

        //now time to turn it into number! aka remove the $$$
        var number = Number(currency.replace(/[^0-9.-]+/g,""));

        sum += number;
    });
    $('.totalprice').text(sum);
}