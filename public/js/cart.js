//Vẽ ra danh sách tour
const drawListTour = () => {
    fetch("http://localhost:3000/cart/list_json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: localStorage.getItem("cart")
    })
        .then(res => res.json())
        .then(data => {
            const htmlArray = data.tours.map((item, index) => {
                return `
                    <tr>
                        <td>${index + 1}</td>
                        <td>
                            <img src="${item.image}" alt="${item.info.title}" width="80px">
                        </td>
                        <td> 
                            <a href="/tours/detail/${item.info.slug}">${item.info.title}</a>
                        </td>
                        <td>${item.price_special.toLocaleString()}</td>
                        <td>
                            <input 
                                type="number" 
                                name="quantity" 
                                value="${item.quantity}"
                                data-item-id="${item.TourId}"
                                min="1"
                                style="width: 60px"
                            > 
                        </td>
                        <td>${item.totalPrice.toLocaleString()}</td>
                        <td>
                            <button 
                                class="btn btn-sm btn-danger" 
                                data-btn-delete="${item.TourId}">Xóa</button>
                        </td>
                    </tr>
                `;
            });
            const htmls = htmlArray.join("");
            const tableCart = document.querySelector("[table-cart]");
            const bodyTableCart = tableCart.querySelector("tbody");
    
            bodyTableCart.innerHTML = htmls;
    
            //Tính tổng số tiền
            const total = data.tours.reduce((sum,item)=>sum+item.totalPrice,0);
            const totalPriceSpan = document.querySelector("[total-price]");
            totalPriceSpan.innerHTML = total.toLocaleString();
            
            deleteItemInCart();

            updateItemInCart();
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}
//Hết vẽ ra danh sách tour

//Xóa sản phẩm trong giỏ hàng
const deleteItemInCart = () => {
    const ListbtnDelete = document.querySelectorAll("[data-btn-delete]");
    if(ListbtnDelete.length > 0){
        ListbtnDelete.forEach(button => {
            button.addEventListener("click", ()=>{
                const TourId = button.getAttribute("data-btn-delete");
                const cart = JSON.parse(localStorage.getItem("cart"));
                const newCart = cart.filter(item => item.TourId != TourId);
                localStorage.setItem("cart",JSON.stringify(newCart));

                drawListTour();
            })
        })
    }
}
//Hết xóa sản phẩm trong giỏ hàng

//Cập nhật số sản phẩm trong giỏ hàng
const updateItemInCart = () => {
    const ListInputUpdate = document.querySelectorAll("[list-tour] input[data-item-id]");
    if(ListInputUpdate.length > 0){
        ListInputUpdate.forEach(input => {
            input.addEventListener("change", ()=>{
                const TourId = input.getAttribute("data-item-id");
                const quantity = input.value;

                const cart = JSON.parse(localStorage.getItem("cart"));

                const TourUpdate = cart.find(item=>item.TourId==TourId);
                TourUpdate.quantity = parseInt(quantity);

                localStorage.setItem("cart",JSON.stringify(cart));

                drawListTour();
            })
        })
    }
}
//Hết cập nhật số sản phẩm trong giỏ hàng

// Lay data in ra giao dien
drawListTour();
// het lay data in ra giao dien

//Đặt tour
const formOrder = document.querySelector("[form-order]");
if(formOrder){
    formOrder.addEventListener("submit", (e) => {
        e.preventDefault();
        const fullName = e.target.elements.fullName.value;
        const phone = e.target.elements.phone.value;
        const note = e.target.elements.note.value;
        const cart = JSON.parse(localStorage.getItem("cart"))
        const data = {
            info: {
                fullName: fullName,
                phone:phone,
                note:note
            },
            cart:cart
        }

        fetch("/order",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res=>res.json())
            .then(data => {
                if(data.code === 200){
                    localStorage.removeItem("cart");
                    window.location.href = `/order/success?orderCode=${data.OrderCode}`;
                }else{
                    alert("Fail!");
                }
            })
    })
}
//Hết đặt tour