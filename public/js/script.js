// slider tour detail
var imagesThumb = new Swiper(".imagesThumb", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
});
var imagesMain = new Swiper(".imagesMain", {
    loop: true,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: imagesThumb,
    },
});
// end slider tour detail

//cart
// b1 : khoi tao
const cart = localStorage.getItem("cart");
if(!cart){
    localStorage.setItem("cart",JSON.stringify([]));
}
// b2 : them tour vao cart
const formAddToCart = document.querySelector("[form-add-to-cart]");
if(formAddToCart){
    formAddToCart.addEventListener("submit", (e)=>{
        e.preventDefault();
        const quantity = parseInt(e.target.elements.quantity.value);
        const TourId = parseInt(formAddToCart.getAttribute("tour-id"));

        if(quantity > 0 && TourId){
            const cart = JSON.parse(localStorage.getItem("cart"));
            const indexExistInCart = cart.findIndex(item => item.TourId == TourId);
            if(indexExistInCart==-1){
                cart.push({
                    TourId: TourId,
                    quantity: quantity
                })
            }else{
                cart[indexExistInCart].quantity = cart[indexExistInCart].quantity + quantity
            }
            localStorage.setItem("cart",JSON.stringify(cart));
        }
    })
}
//end cart