document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const categoryLinks = document.querySelectorAll('.category');
            const productsDiv = document.querySelector('.products');
            const itemsDiv = document.querySelector('.items');
            const homeLink = document.getElementById('home-link');
            const gameLink = document.getElementById('game-link');
            const categoryItemsSection = document.getElementById('category-items-section');
            const mainContent = document.getElementById('main-content');
            const gameContainer = document.getElementById('game-container');
            

            // Event listener for category links
// Event listener for category links
            categoryLinks.forEach(link => {
            link.addEventListener('click', function(event) {
            event.preventDefault();
            const category = this.getAttribute('data-category');
            displayCategoryItems(data.items, category);
            // Показати секцію товарів за категорією
            categoryItemsSection.style.display = 'block';
             // Скролл до секції товарів за категорією
            window.scrollTo(0, categoryItemsSection.offsetTop);
             });
            });


            document.getElementById('telegramLink').addEventListener('click', function(event) {
                event.preventDefault();
                alert('@fedorniakbogdan \n@faybysh');
                // Add your custom JavaScript code here
            });

            // Event listener for home link
            homeLink.addEventListener('click', function(event) {
                event.preventDefault();
                categoryItemsSection.style.display = 'none'; // Сховати секцію товарів за категорією
                mainContent.style.display = 'block'; // Показати головний контент
                gameContainer.style.display = 'none'; // Сховати гру
            });

            // Event listener for game link
            gameLink.addEventListener('click', function(event) {
                event.preventDefault();
                mainContent.style.display = 'none'; // Сховати головний контент
                gameContainer.style.display = 'block'; // Показати гру
                startGame(); // Запустити гру
            });

            // Display articles based on category
            function displayCategoryItems(items, category) {
                itemsDiv.innerHTML = ''; // Clear existing content
                const filteredItems = items.filter(item => item.category === category);
                filteredItems.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('col-md-4', 'mb-4');

                    const card = document.createElement('div');
                    card.classList.add('card', 'h-100');

                    const img = document.createElement('img');
                    img.src = item.image;
                    img.alt = item.title;
                    img.classList.add('card-img-top');

                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');

                    const title = document.createElement('h5');
                    title.textContent = item.title;
                    title.classList.add('card-title');

                    const description = document.createElement('p');
                    description.textContent = item.description;
                    description.classList.add('card-text');

                    const price = document.createElement('p');
                    price.textContent = `${item.price} грн`;
                    price.classList.add('card-text');

                    const buyButton = document.createElement('button');
                    buyButton.textContent = 'Купити';
                    buyButton.classList.add('btn', 'btn-primary', 'buy-button');
                    buyButton.dataset.price = item.price; // Додаємо атрибут dataset з ціною

                    const detailsButton = document.createElement('button'); // Додаємо кнопку "Деталі"
                    detailsButton.textContent = 'Деталі';
                    detailsButton.classList.add('btn', 'btn-secondary', 'ms-2', 'details-button');
                    detailsButton.dataset.productId = item.id; // Додаємо атрибут dataset з ID товару
                    detailsButton.addEventListener('click', function() {
                        loadDetails(item.id);
                    });

                    cardBody.appendChild(title);
                    cardBody.appendChild(img);
                    cardBody.appendChild(description);
                    cardBody.appendChild(price);
                    cardBody.appendChild(buyButton);
                    cardBody.appendChild(detailsButton); // Додаємо кнопку "Деталі" до блоку товару
                    card.appendChild(cardBody);
                    itemDiv.appendChild(card);
                    itemsDiv.appendChild(itemDiv);
                });

                // Додаємо обробник подій для кнопок "Купити"
                const buyButtons = document.querySelectorAll('.buy-button');
                buyButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const price = parseInt(button.dataset.price);
                        // Замінюємо текст модального вікна з виведенням ціни товару
                        const addToCartModal = new bootstrap.Modal(document.getElementById('addToCartModal'));
                        document.getElementById('addToCartMessage').textContent = `Товар додано до кошика за ${price} грн.`;
                        addToCartModal.show();
                    });
                });
            }

                    // Функція для завантаження деталей товару
        function loadDetails(productId) {
            fetch('details.json')
                .then(response => response.json())
                .then(details => {
                    const productDetails = details[productId]; // Отримуємо деталі товару за його ID
                    document.getElementById('productDetailsContent').innerHTML = productDetails.description.replace(/\n/g, '<br>');
                    new bootstrap.Modal(document.getElementById('productDetailsModal')).show();
                })
                .catch(error => {
                    console.error('Error loading details:', error);
                });
        }

            // Display popular products
            function displayPopularProducts(items) {
                const popularItems = items.filter(item => item.popular);
                popularItems.forEach(item => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('col-md-4', 'mb-4');

                    const card = document.createElement('div');
                    card.classList.add('card', 'h-100');

                    const img = document.createElement('img');
                    img.src = item.image;
                    img.alt = item.title;
                    img.classList.add('card-img-top');

                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');

                    const title = document.createElement('h5');
                    title.textContent = item.title;
                    title.classList.add('card-title');

                    const price = document.createElement('p');
                    price.textContent = `${item.price} грн`;
                    price.classList.add('card-text');

                    const buyButton = document.createElement('button');
                    buyButton.textContent = 'Купити';
                    buyButton.classList.add('btn', 'btn-primary', 'buy-button');
                    buyButton.dataset.price = item.price; // Додаємо атрибут dataset з ціною

                    const detailsButton = document.createElement('button'); // Додаємо кнопку "Деталі"
                    detailsButton.textContent = 'Деталі';
                    detailsButton.classList.add('btn', 'btn-secondary', 'ms-2', 'details-button');
                    detailsButton.dataset.productId = item.id; // Додаємо атрибут dataset з ID товару
                    detailsButton.addEventListener('click', function() {
                        loadDetails(item.id);
                    });

                    cardBody.appendChild(title);
                    cardBody.appendChild(img);
                    cardBody.appendChild(price);
                    cardBody.appendChild(buyButton);
                    cardBody.appendChild(detailsButton); // Додаємо кнопку "Деталі" до блоку товару
                    card.appendChild(cardBody);
                    productDiv.appendChild(card);
                    productsDiv.appendChild(productDiv);
                });

                // Додаємо обробник подій для кнопок "Купити"
                const buyButtons = document.querySelectorAll('.buy-button');
                buyButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const price = parseInt(button.dataset.price);
                        // Замінюємо текст модального вікна з виведенням ціни товару
                        const addToCartModal = new bootstrap.Modal(document.getElementById('addToCartModal'));
                        document.getElementById('addToCartMessage').textContent = `Товар додано до кошика за ${price} грн.`;
                        addToCartModal.show();
                    });
                });
            }

            // Initially display popular products
            displayPopularProducts(data.items);
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });

    // Greeting button event listener
    document.getElementById('greet-btn').addEventListener('click', function() {
        const username = document.getElementById('username').value;
        if (username) {
            document.getElementById('welcome-message').textContent = `Ласкаво просимо, ${username}, до F.company`;
        }
    });

    // Hamburger menu toggle
    document.getElementById('hamburger-btn').addEventListener('click', function() {
        const navItems = document.querySelector('.nav-items');
        if (navItems.style.display === 'block') {
            navItems.style.display = 'none';
        } else {
            navItems.style.display = 'block';
        }
    });

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    let player = {
        x: canvas.width / 2 - 25, // змістіть гравця в центрі по горизонталі
        y: canvas.height - 100, // змістіть гравця внизу екрану
        width: 100,
        height: 80,
        dx: 5
    };
    
    
    let component = {
        x: Math.random() * (canvas.width - 50),
        y: 0,
        width: 30,
        height: 40,
        dy: 2
    };
    
    let score = 0;
    let animationId;
    let rightPressed = false;
    let leftPressed = false;
    let gameOver = false;
    
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    
    function keyDownHandler(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            rightPressed = true;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            leftPressed = true;
        }
    }
    
    function keyUpHandler(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            rightPressed = false;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            leftPressed = false;
        }
    }
    
    function drawPlayer() {
        var playerImg = new Image();
        playerImg.src = 'korzuna.png';
        ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
    }
    
    function drawComponent() {
        var componentImg = new Image();
        componentImg.src = 'iphone.png';
        ctx.drawImage(componentImg, component.x, component.y, component.width, component.height);
    }
    
    function movePlayer() {
        if (rightPressed && player.x < canvas.width - player.width) {
            player.x += player.dx;
        } else if (leftPressed && player.x > 0) {
            player.x -= player.dx;
        }
    }
    
    function moveComponent() {
        if (component.y + component.height > canvas.height) {
            endGame();
        } else {
            component.y += component.dy;
        }
    }
    
    function detectCollision() {
        if (player.x < component.x + component.width &&
            player.x + player.width > component.x &&
            player.y < component.y + component.height &&
            player.height + player.y > component.y) {
            component.y = 0;
            component.x = Math.random() * (canvas.width - component.width);
            score++;
        }
    }
    
    function drawDiscounts() {
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        let discountText = 'Discounts:\n';
        if (score >= 50) {
            discountText += '50 points - 10% off\n';
        } else if (score >= 25) {
            discountText += '25 points - 7% off\n';
        } else if (score >= 10) {
            discountText += '10 points - 5% off\n';
        }
    
        const lines = discountText.split('\n');
        lines.forEach((line, index) => {
            ctx.fillText(line, canvas.width + 20, 30 + index * 20);
        });
    }

    function draw() {
        if (gameOver) {
            return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawComponent();
        movePlayer();
        moveComponent();
        detectCollision();
    
        ctx.fillStyle = 'black';
        ctx.font = '28px Arial';
        ctx.fillText('Рахунок: ' + score, 650, 55);
    
        drawDiscounts();
    
        animationId = requestAnimationFrame(draw);
    }
    
    function startGame() {
        score = 0;
        player.x = canvas.width / 2;
        player.y = canvas.height - 50;
        component.y = 0;
        component.x = Math.random() * (canvas.width - component.width);
        component.dy = 3;
        player.dx = 7;
        gameOver = false;
    
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        draw();
    }
    
    function endGame() {
        gameOver = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Кінець гри! Рахунок: ' + score, canvas.width / 2 - 100, canvas.height / 2);
        
        let discount = '';
        if (score >= 50) {
            discount = '10% знижки';
        } else if (score >= 25) {
            discount = '7% знижка';
        } else if (score >= 10) {
            discount = '5% знижки';
        }
        ctx.fillText('Поверніться на головну', canvas.width / 2 - 130, canvas.height / 2 + 80);

        if (discount) {
            ctx.fillText('Ви зібрали: ' + discount, canvas.width / 2 - 100, canvas.height / 2 + 40);
        }
    }
    
    document.getElementById('mainTab').addEventListener('click', function() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        gameOver = true;
    });
    
    document.getElementById('gameTab').addEventListener('click', function() {
        startGame();
    });
    
    startGame();
    
    
});

