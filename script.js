// ------------- Lista de produtos ---------------------//
const products = [
    {
        "name": "Kit de Sabonete Elementos",
        "tamanho": "300g",
        "description": "Kit contendo 4 unidades de sabonetes, podendo ser um de cada (terra, água, fogo e ar), ou escolha da sua preferência",
        "price": 18,
        "img": "kit_sabonete.jpg"
    },
    {
        "name": "Sabonete Fogo",
        "tamanho": "75g",
        "description": "Sândalo, rosa mosqueta, karité, alecrim, argila branca",
        "price": 5,
        "img": "sabonete_fogo.jpg"
    },
    {
        "name": "Sabonete Terra",
        "tamanho": "75g",
        "description": "Flor de laranjeira, rosa mosqueta, ucuuba, calêndula, argila vermelha",
        "price": 5,
        "img": "sabonete_terra.jpg"
    },
    {
        "name": "Sabonete Água",
        "tamanho": "75g",
        "description": "Lavanda, semente de uva, karité, lavanda, argila branca",
        "price": 5,
        "img": "sabonete_agua.jpg"
    },
    {
        "name": "Sabonete Ar",
        "tamanho": "75g",
        "description": "Primavera, mamona, semente de uva, karité, aveia, argila branca",
        "price": 5,
        "img": "sabonete_ar.jpg"
    },
    {
        "name": "Repelente Natural",
        "tamanho": "150ml",
        "description": "Água, óleo de calêndula, óleos essenciais de lemongrass, patchouli, petitgrain, cravo, citronela, baunilha e argila branca",
        "price": 68,
        "img": "repelente.jpg"
    },
    {
        "name": "Xô Coceirinha",
        "tamanho": "7ml",
        "description": "Óleo de calêndula, copaíba, lavanda, melaleuca e olíbano",
        "price": 23,
        "img": "xococeirinha.jpg"
    },
    {
        "name": "Tônico Facial",
        "tamanho": "30ml",
        "description": "Água destilada, alcool de cereais, extratos gliceriandos de lavanda, barbatimão e morango, glicerina bidestilada, óleos essenciais de gerânio, lavanda e olíbano",
        "price": 37,
        "img": "tonico.jpg"
    },
    {
        "name": "Bálsamo Hidratante",
        "tamanho": "30g",
        "description": "Muito usado para troca de fralda. Karité, cera de abelha, palmiste, calêndula e vitamina E",
        "price": 68,
        "img": "balsamo.jpg"
    },
    {
        "name": "Esfoliante Corporal",
        "tamanho": "60g",
        "description": "Sabonete Ancestrallis, óleos vegerais de amêndoa, rosa mosqueta e mamona, glicerina bidestilada, extratos glicerinados de calêndula e amora, açúcar orgânico, sal, água destilada, manteiga de karité e essencia botânica",
        "price": 58,
        "img": "esfoliante.jpg"
    },
    {
        "name": "Home Spray",
        "tamanho": "150ml",
        "description": "Laranja doce, alecrim e cedro",
        "price": 58,
        "img": "home.jpg"
    },
    {
        "name": "Body Splash",
        "tamanho": "120ml",
        "description": "Disponível em Jasmim, Sândalo e Primavera, Bergamota, Cedro, Cereja e Avelã",
        "price": 48,
        "img": "bodysplash.jpg"
    },
    {
        "name": "Antisséptico Natural",
        "tamanho": "30ml",
        "description": "Própolis, barbatimão, lavanda e óleo essencial de melaleuca",
        "price": 39,
        "img": "antisseptico.jpg"
    },
    {
        "name": "Elixir Hidratante",
        "tamanho": "60ml",
        "description": "Óleo de argan, amêndoas, lavanda e essência botânica",
        "price": 33,
        "img": "elixir.jpg"
    },
    {
        "name": "Sabão de Barbear",
        "description": "Base de sabonete Ancestrallis, extrato glicerinado de barbatimão, argila verde, mentol e essência botânica",
        "tamanho": "30g",
        "price": 3,
        "img": "barbear.jpeg"
    },
    {
        "name": "Pós Barba",
        "description": "Extratos glicerinados de calêndula, barbatimão e limão, álcool de cereais, glicerina bidestilada e essência botânica",
        "tamanho": "30ml",
        "price": 18,
        "img": "posbarba.jpeg"
    },
    {
        "name": "Kit de Barbear",
        "description": "Sabão de babear botânico e Pós Barba natural. Sua pele agradece pela hidratação e cuidado, preparar a pele antes da lâmina faz toda diferença",
        "tamanho": "kit",
        "price": 20,
        "img": "kitbarba.jpeg"
    },
    {
        "name": "Desodorante Botânico",
        "description": "Água destilada, leite de magnesia, álcool de cereais, argila branca, óleos essencias de melaleuca, hortelã-pimenta e palmarosa ou palmarosa, lavanda e capim limão",
        "tamanho": "120ml",
        "price": 21,
        "img": "desodorante.jpeg"
    },
    {
        "name": "Super Hidratante Corpotal",
        "description": "Água destilada, óleos de Rosa Mosqueta e argan, manteiga de karité, glicerina bidestilada, extrato glicerinado de lavanda e essência botânica",
        "tamanho": "150g",
        "price": 75,
        "img": "hidratante.jpeg"
    },
];

// ---------------------- Funções Compartilhadas ----------------------

// Atualiza o contador de itens no carrinho
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');

    if (cartCountEl) {
        cartCountEl.textContent = count;
        cartCountEl.style.display = count > 0 ? 'block' : 'none';
    }
}


// ---------------------- Funções do Catálogo ----------------------

// Exibir produtos na página inicial
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach((product, index) => {
        productList.innerHTML += `
            <div class="col-md-4 product-item">
                <div class="card">
                    <img src="./images/${product.img}" alt="${product.name}" onclick="openModal(${index})">
                    <div class="card-body">
                        <h5>${product.name}</h5>
                        <p>${product.tamanho} | ${product.description}</p>
                        <p><strong>R$ ${product.price.toFixed(2)}</strong></p>
                        <button onclick="addToCart(${index})" class="btn btn-primary">Adicionar</button>
                    </div>
                </div>
            </div>`;
    });
}

// Abre o modal do produto
function openModal(index) {
    const product = products[index];
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalImage').src = `./images/${product.img}`;
    document.getElementById('modalDescription').textContent = product.description;

    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// Adiciona o produto ao carrinho
function addToCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products[index];

    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}


// ---------------------- Funções do Carrinho ----------------------

// Atualiza o carrinho de compras
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart');
    const totalPriceElement = document.getElementById('total-price');

    if (!cartList || !totalPriceElement) return;

    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartList.innerHTML += `
            <li class="cart-item">
                <div>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                    <div class="ms-2">
                        <h5>${item.name}</h5>
                        <p>R$ ${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="cart-buttons">
                    <button class="btn btn-sm btn-success" onclick="increaseQuantity(${index})">+</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="btn btn-sm btn-warning" onclick="decreaseQuantity(${index})">-</button>
                </div>
            </li>`;
    });

    totalPriceElement.textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function increaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function decreaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    updateCart();
}

function sendOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const couponCode = document.getElementById('coupon-code')?.value.trim();
    let message = "Olá, gostaria de fazer um pedido:\n";

    cart.forEach(item => {
        message += `- ${item.name} (R$ ${item.price.toFixed(2)}) x ${item.quantity}\n`;
    });

    if (couponCode) {
        message += `\nCupom Promocional:\n${couponCode}`;
    }

    message += `\n\nTotal: R$ ${document.getElementById('total-price').textContent}`;
    window.open(`https://wa.me/5511973606221?text=${encodeURIComponent(message)}`);
}

// Inicialização de funções ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    
    // Verifica se está na página de produtos
    if (document.getElementById('product-list')) {
        displayProducts();
    }

    // Verifica se está na página de carrinho
    if (document.getElementById('cart')) {
        updateCart();
    }
});

