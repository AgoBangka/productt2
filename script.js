const cartIcon = document.getElementById('cart-icon');
const cartPopup = document.getElementById('cart-popup');
const cart = document.querySelector('.cart');


function adjustCartSize() {
  if (window.matchMedia('(max-width: 800px)').matches) {
    // Untuk layar kecil (mobile)
    cartPopup.style.width = '300px';
    cartPopup.style.padding = '20px';
    cartPopup.style.fontSize = '14px';

  } else {
    // Untuk layar besar (desktop)
    cartPopup.style.width = '800px';
    cartPopup.style.padding = '20px';
    cartPopup.style.fontSize = '16px';
  }
}

// Jalankan fungsi saat halaman pertama kali dimuat
adjustCartSize();

// Jalankan fungsi lagi saat ukuran layar berubah
window.addEventListener('resize', adjustCartSize);




const closeCartButton = document.getElementById('close-cart');
const checkoutButton = document.getElementById('checkout-button');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartCount = document.getElementById('cart-count');
const cartBadge = document.getElementById('cart-badge'); // Badge untuk jumlah produk
const addToCartButton = document.getElementById('add-to-cart');

const cartItems = [];
const phoneNumber = '6285283751548'; // Ganti dengan nomor WhatsApp Anda


// Menambahkan produk ke keranjang
addToCartButton.addEventListener('click', (event) => {
  event.preventDefault(); // Mencegah navigasi default link

  // Mengambil data ukuran dan harga dari dropdown
  const sizeDropdown = document.getElementById('variant');
  const selectedOption = sizeDropdown.options[sizeDropdown.selectedIndex];
  const size = selectedOption.value;
  const pricePerUnit = parseInt(selectedOption.getAttribute('data-price'));
  const quantity = parseInt(document.getElementById('quantity').value);
  const totalItemPrice = pricePerUnit * quantity;

  const item = {
    name: 'Martabak original',
    variant: size,
    quantity: quantity,
    unitPrice: pricePerUnit,
    totalPrice: totalItemPrice,
  };

  // Menambahkan item ke keranjang
  cartItems.push(item);
  updateCart();
});

// Menampilkan popup keranjang
cartIcon.addEventListener('click', () => {
  cartPopup.style.display = 'block';
});

// Menutup popup keranjang
closeCartButton.addEventListener('click', () => {
  cartPopup.style.display = 'none';
});

// Fungsi untuk memperbarui keranjang
function updateCart() {
  cartItemsList.innerHTML = ''; // Clear previous items
  let totalPrice = 0;

  // Jika keranjang kosong, tampilkan pesan "Keranjang Kosong"
  if (cartItems.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.textContent = "Keranjang Kosong";
    emptyMessage.style.textAlign = "center";
    cartItemsList.appendChild(emptyMessage);
    totalPriceElement.textContent = "Total Harga: Rp0";

    // Nonaktifkan tombol checkout jika keranjang kosong
    checkoutButton.disabled = true;
    checkoutButton.style.backgroundColor = '#ccc'; // Ganti warna tombol agar tidak aktif
    checkoutButton.style.cursor = 'not-allowed'; // Ganti kursor saat hover
  } else {
    // Menambahkan setiap item ke keranjang
    cartItems.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} (Ukuran: ${item.size}, Jumlah: ${item.quantity}) - Rp${item.totalPrice.toLocaleString()}`;
      
      // Menambahkan ikon remove
      const removeIcon = document.createElement('i');
      removeIcon.classList.add('fas', 'fa-trash');
      removeIcon.style.cursor = 'pointer';
      removeIcon.style.marginLeft = '10px';
      
      // Menambahkan event listener untuk menghapus item
      removeIcon.addEventListener('click', () => {
        removeItem(index); // Hapus item berdasarkan index
      });
      
      listItem.appendChild(removeIcon);
      cartItemsList.appendChild(listItem);
      totalPrice += item.totalPrice;
    });
    totalPriceElement.textContent = `Total Harga: Rp${totalPrice.toLocaleString()}`;

    // Mengaktifkan tombol checkout jika ada produk
    checkoutButton.disabled = false;
    checkoutButton.style.backgroundColor = '#007bff'; // Kembali ke warna tombol aktif
    checkoutButton.style.cursor = 'pointer'; // Ganti kursor saat hover
  }

  // Update jumlah item di keranjang
  cartCount.textContent = cartItems.length;
  
  // Update jumlah produk di badge keranjang
  cartBadge.textContent = cartItems.length;
}

// Fungsi untuk menghapus item dari keranjang
function removeItem(index) {
  // Hapus item dari array cartItems
  cartItems.splice(index, 1);
  updateCart(); // Perbarui tampilan keranjang setelah item dihapus
}

// Checkout
checkoutButton.addEventListener('click', () => {
  if (cartItems.length === 0) {
    return; // Jangan lakukan apa-apa jika keranjang kosong
  }

  // Membuka WhatsApp dengan pesan checkout
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank'); // Membuka WhatsApp di tab baru
});







// Checkout dan kirim pesan ke WhatsApp setelah mengisi alamat
checkoutButton.addEventListener('click', () => {
  // Ambil data alamat
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const postalCode = document.getElementById('postal-code').value;
  const phone = document.getElementById('phone').value;

  if (!name || !address || !city || !postalCode || !phone) {
    alert('Harap isi semua informasi alamat!');
    return;
  }

  let message = `Min saya pesan:\n\n`;
  let totalPrice = 0;

  cartItems.forEach((item) => {
    message += `${item.name} (variant: ${item.variant}, Jumlah: ${item.quantity}) - Rp${item.totalPrice.toLocaleString()}\n`;
    totalPrice += item.totalPrice;
  });

  message += `\nTotal Harga: Rp${totalPrice.toLocaleString()}\n\nAlamat Pengiriman:\n${name}\n${address}\n${city}, ${postalCode}\nTelepon: ${phone}`;

  // URL WhatsApp dengan pesan dinamis
  const phoneNumber = '6285283751548'; // Ganti dengan nomor WhatsApp tujuan
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Membuka WhatsApp 
  window.open(whatsappURL, '_blank');

  // Mengosongkan keranjang setelah checkout
  cartItems.length = 0; 
  updateCart();
  cartPopup.style.display = 'none';
});

// Fungsi untuk memperbarui keranjang
function updateCart() {
  cartItemsList.innerHTML = '';
  let totalPrice = 0;

  cartItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} (variant: ${item.variant}, Jumlah: ${item.quantity}) - Rp${item.totalPrice.toLocaleString()}`;
    cartItemsList.appendChild(listItem);

    totalPrice += item.totalPrice;
  });

  totalPriceElement.textContent = `Total Harga: Rp${totalPrice.toLocaleString()}`;
  cartBadge.textContent = cartItems.length;
}
