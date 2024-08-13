// Lay data in ra giao dien
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
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
// het lay data in ra giao dien