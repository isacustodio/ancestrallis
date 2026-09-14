const products = [
  {
    name: 'Kit de Sabonetes Elementos',
    size: '4 sabonetes · aprox. 74g cada',
    desc: 'Quatro sabonetes artesanais inspirados nos elementos: Fogo — Sândalo; Terra — Flor de laranjeira; Água — Lavanda; Ar — Primavera. O kit pode ser montado com um de cada ou conforme disponibilidade e preferência.',
    price: 24,
    img: 'kit_sabonete.jpg'
  },
  {
    name: 'Pele · Hidratante Corporal',
    size: '150g',
    desc: 'Hidratação intensa com toque sensorial e confortável. Um cuidado corporal para nutrir, amaciar e transformar a hidratação diária em ritual.',
    price: 79,
    img: 'hidratante.jpeg'
  },
  {
    name: 'Elixir · Óleo Corporal',
    size: '120ml',
    desc: 'Um ritual nutritivo de óleos vegetais e aroma botânico para massagear, perfumar e envolver a pele em um toque macio e luminoso.',
    price: 44,
    img: 'elixir.jpg'
  },
  {
    name: 'Esfoliante Corporal',
    size: '150g',
    desc: 'Esfoliação corporal à base de açúcar que combina limpeza e cuidado para renovar o toque da pele e deixar o banho ainda mais sensorial.',
    price: 58,
    img: 'esfoliante.jpg'
  },
  {
    name: 'Repelente Botânico',
    size: '150ml',
    desc: 'Fórmula botânica com andiroba e uma combinação aromática de óleos essenciais, pensada para acompanhar os momentos ao ar livre.',
    price: 68,
    img: 'repelente.jpg'
  },
  {
    name: 'Xô Coceirinha',
    size: '7ml',
    desc: 'Blend botânico em formato prático, com calêndula, copaíba e óleos essenciais. Pequeno para levar por perto e usar nos momentos de cuidado.',
    price: 24,
    img: 'xococeirinha.jpg'
  },
  {
    name: 'Bálsamo Cicatrizante',
    size: '30g',
    desc: 'Bálsamo botânico concentrado, rico em manteiga vegetal, cera e óleos, desenvolvido para o cuidado localizado de áreas que pedem atenção especial.',
    price: 68,
    img: 'balsamo.jpg'
  },
  {
    name: 'Pós-Barba Botânico',
    size: '30ml',
    desc: 'Um ritual refrescante para depois da lâmina, com calêndula, própolis, aloe ou lavanda e mentol para completar o cuidado da pele após o barbear.',
    price: 24,
    img: 'posbarba.jpeg'
  },
  {
    name: 'Sabão de Barbear',
    size: 'aprox. 74g',
    desc: 'Sabão artesanal criado para preparar a pele e a barba para a lâmina, trazendo mais cuidado e intenção para um ritual cotidiano.',
    price: 18,
    img: 'barbear.jpeg'
  },
  {
    name: 'Desodorante Botânico',
    size: '120ml',
    desc: 'Cuidado botânico para a rotina diária, com argila branca e uma combinação aromática de óleos essenciais.',
    price: 29,
    img: 'desodorante.jpeg'
  },
  {
    name: 'Body Splash',
    size: '120ml',
    desc: 'Névoa perfumada, leve e envolvente para usar ao longo do dia. Um gesto simples que transforma aroma em ritual.',
    price: 49,
    img: 'bodysplash.jpg'
  }
];

function money(value) {
  return 'R$ ' + value.toFixed(2).replace('.', ',');
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  const el = document.getElementById('cart-count');
  if (el) el.textContent = count;
}

function addToCart(index) {
  const cart = getCart();
  const product = products[index];
  const found = cart.find(item => item.name === product.name);
  if (found) found.quantity += 1;
  else cart.push({
    name: product.name,
    tamanho: product.size,
    description: product.desc,
    price: product.price,
    img: product.img,
    quantity: 1
  });
  saveCart(cart);
  updateCartCount();
}

function displayProducts() {
  const list = document.getElementById('product-list');
  if (!list) return;
  list.innerHTML = products.map((product, index) => `
    <article class="product-card">
      <button class="photo product-open" type="button" onclick="openModal(${index})" aria-label="Ver ${product.name}">
        <img loading="lazy" src="./images/${product.img}" alt="${product.name}">
      </button>
      <div class="product-info">
        <span class="meta">${product.size}</span>
        <h3><button class="title-button" type="button" onclick="openModal(${index})">${product.name}</button></h3>
        <p>${product.desc}</p>
        <div class="price-row">
          <span class="price">${money(product.price)}</span>
          <button class="add" type="button" onclick="addToCart(${index})">Adicionar</button>
        </div>
      </div>
    </article>
  `).join('');
}

function openModal(index) {
  const product = products[index];
  const modal = document.getElementById('productModal');
  if (!modal) return;
  document.getElementById('modalImage').src = `./images/${product.img}`;
  document.getElementById('modalImage').alt = product.name;
  document.getElementById('modalSize').textContent = product.size;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalDescription').textContent = product.desc;
  document.getElementById('modalPrice').textContent = money(product.price);
  document.getElementById('modalAdd').onclick = () => addToCart(index);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('productModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateCart() {
  const cartList = document.getElementById('cart');
  const totalEl = document.getElementById('total-price');
  if (!cartList || !totalEl) return;
  const cart = getCart();
  let total = 0;
  cartList.innerHTML = '';
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartList.innerHTML += `
      <li class="cart-item">
        <div>
          <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})" aria-label="Remover ${item.name}"><i class="bi bi-trash"></i></button>
          <div class="ms-2"><h5>${item.name}</h5><p>${money(item.price)}</p></div>
        </div>
        <div class="cart-buttons">
          <button class="btn btn-sm btn-success" onclick="increaseQuantity(${index})">+</button>
          <span class="quantity">${item.quantity}</span>
          <button class="btn btn-sm btn-warning" onclick="decreaseQuantity(${index})">−</button>
        </div>
      </li>`;
  });
  totalEl.textContent = total.toFixed(2).replace('.', ',');
  updateCartCount();
}

function increaseQuantity(index) {
  const cart = getCart();
  cart[index].quantity += 1;
  saveCart(cart);
  updateCart();
}

function decreaseQuantity(index) {
  const cart = getCart();
  if (cart[index].quantity > 1) cart[index].quantity -= 1;
  else cart.splice(index, 1);
  saveCart(cart);
  updateCart();
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCart();
}

function clearCart() {
  saveCart([]);
  updateCart();
}

function sendOrder() {
  const cart = getCart();
  if (!cart.length) {
    alert('Sua sacola está vazia!');
    return;
  }
  const coupon = document.getElementById('coupon-code')?.value.trim();
  let message = 'Olá, gostaria de fazer um pedido:\n';
  cart.forEach(item => {
    message += `- ${item.name} (${money(item.price)}) x ${item.quantity}\n`;
  });
  if (coupon) message += `\nCupom promocional: ${coupon}`;
  const total = document.getElementById('total-price')?.textContent || '';
  message += `\n\nTotal: R$ ${total}`;
  window.open(`https://wa.me/5511973606221?text=${encodeURIComponent(message)}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
  updateCartCount();
  updateCart();

  const modal = document.getElementById('productModal');
  if (modal) {
    modal.addEventListener('click', event => {
      if (event.target === modal) closeModal();
    });
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});
