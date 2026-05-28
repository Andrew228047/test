document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.service-check');
    const totalPriceElement = document.getElementById('total-price');
    const orderForm = document.getElementById('orderForm');

    // 1. Функція оновлення ціни
    function updateTotalPrice() {
        let total = 0;
        checkboxes.forEach(box => {
            if (box.checked) {
                total += parseInt(box.dataset.price);
            }
        });
        totalPriceElement.innerText = total;
    }

    // Додаємо подію на кожен чекбокс
    checkboxes.forEach(box => {
        box.addEventListener('change', updateTotalPrice);
    });

    // 2. Обробка форми
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('userName').value;
        const phone = document.getElementById('userPhone').value;
        
        // Збираємо назви обраних послуг
        let selectedServices = [];
        checkboxes.forEach(box => {
            if (box.checked) {
                selectedServices.push(box.dataset.name);
            }
        });

        if (selectedServices.length === 0) {
            alert('Будь ласка, оберіть хоча б одну послугу.');
            return;
        }

        const message = `
            Дякуємо, ${name}! 
            Ваше замовлення прийнято.
            Послуги: ${selectedServices.join(', ')}
            Сума до сплати: ${totalPriceElement.innerText} грн.
            Ми зателефонуємо на номер: ${phone}
        `;

        alert(message);
        orderForm.reset();
        updateTotalPrice();
    });
});