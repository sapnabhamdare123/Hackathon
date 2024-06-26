document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCounter = document.querySelector('header div span');
    const cartList = document.querySelector('.cartTab .listcart');
    const addCartButtons = document.querySelectorAll('.addcart');
    const heartIcon = document.querySelector('header i.fas.fa-bars');
    const cartTab = document.querySelector('.cartTab');
    const closeCartButton = document.querySelector('.closeCart');

    addCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.item');
            const imgSrc = item.querySelector('img').src;
            const title = item.querySelector('p:nth-of-type(1)').textContent.trim();

            cart.push({ imgSrc, title });
            updateCart();
        });
    });

    heartIcon.addEventListener('click', () => cartTab.classList.toggle('show'));
    closeCartButton.addEventListener('click', () => cartTab.classList.remove('show'));

    function updateCart() {
        cartCounter.textContent = cart.length;
        cartList.innerHTML = cart.map((book, index) => `
            <div class="cart-item${book.selected ? ' selected' : ''}">
                <img src="${book.imgSrc}" alt="${book.title}" width="50">
                <p>${book.title}</p>
                <button class="remove" data-index="${index}">Remove</button>
            </div>
        `).join('');

        cartList.querySelectorAll('.cart-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                cart[index].selected = !cart[index].selected;
                updateCart();
            });
        });

        cartList.querySelectorAll('.remove').forEach(button => {
            button.addEventListener('click', e => {
                e.stopPropagation();
                const index = parseInt(e.target.dataset.index);
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
});
