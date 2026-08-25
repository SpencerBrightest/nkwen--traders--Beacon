let products = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 12; // HTML says "Showing 1-12 of 148 results"

const productDetailsMap = {
    "Bread (loaf)": {
        description: "Freshly baked daily with organic stone-ground flour and our signature starter. Perfectly crusty outside, soft inside.",
        image: "assets/prod_bread_loaf.jpg",
        rating: 4.5,
        badge: { text: "NEW", type: "yellow" }
    },
    "Matches (box)": {
        description: "Reliable and easy to light wooden matches. Essential for every household.",
        image: "assets/Matches (box).png",
        rating: 4,
        badge: null
    },
    "Palm Oil 5L": {
        description: "Premium quality, unrefined red palm oil. Rich in vitamins and perfect for traditional cooking.",
        image: "assets/Palm Oil 5L.png",
        rating: 5,
        badge: { text: "POPULAR", type: "yellow" }
    },
    "Beans (White)": {
        description: "Nutritious and versatile white beans. Excellent source of plant-based protein and fiber.",
        image: "assets/prod_beans_white.jpg",
        rating: 4.5,
        badge: null
    },
    "Plantain (bunch)": {
        description: "Farm-fresh, ripe plantains ready to be fried, boiled, or baked for a delicious side dish.",
        image: "assets/Bunch of plantain.png",
        rating: 5,
        badge: { text: "FRESH", type: "yellow" }
    },
    "Beans (Red)": {
        description: "High-quality red kidney beans. Perfect for stews, soups, and rice dishes.",
        image: "assets/Beans (Red).png",
        rating: 4.5,
        badge: null
    },
    "Maggi Cubes (pack)": {
        description: "Classic seasoning cubes to enhance the flavor of your soups, stews, and marinades.",
        image: "assets/Maggi Cubes (pack).png",
        rating: 5,
        badge: null
    },
    "Tomato Paste (tin)": {
        description: "Rich and concentrated tomato paste for authentic taste and deep color in your meals.",
        image: "assets/generated-image_2026-08-25_11-03-45-858.png",
        rating: 4,
        badge: null
    },
    "Soap (bar)": {
        description: "Long-lasting multipurpose soap bar. Great for laundry and general household cleaning.",
        image: "assets/Soap Bar.png",
        rating: 4,
        badge: null
    },
    "Onions 1kg": {
        description: "Locally sourced, crisp and flavorful red onions. Essential for a variety of culinary dishes.",
        image: "assets/prod_onions_1kg.jpg",
        rating: 4.5,
        badge: null
    },
    "Vegetable Oil 5L": {
        description: "High-quality, cholesterol-free vegetable oil suitable for all your cooking and frying needs.",
        image: "assets/Vegetable Oil 5L.jpg",
        rating: 4.5,
        badge: null
    },
    "Salt 1kg": {
        description: "Pure, natural sea salt fortified with essential iodine. A pantry staple for seasoning.",
        image: "assets/prod_salt_1kg.jpg",
        rating: 5,
        badge: null
    },
    "Cassava (bag)": {
        description: "High-yield, premium quality fresh cassava straight from the farm.",
        image: "assets/Cassava (bag).png",
        rating: 4.5,
        badge: null
    },
    "Sugar 1kg": {
        description: "Refined white sugar. Sweeten your beverages and desserts with the best quality sugar.",
        image: "assets/Sugar 1kg.png",
        rating: 4.5,
        badge: null
    },
    "Rice 25kg": {
        description: "High-quality, aromatic long grain rice. Perfect fluffy texture for family meals and gatherings.",
        image: "assets/prod_rice_25kg.jpg",
        rating: 4.5,
        badge: { text: "SALE", type: "red" }
    },
    "Rice 50kg": {
        description: "Premium long grain rice in bulk size. The best value for large families and events.",
        image: "assets/prod_rice_50kg.jpg",
        rating: 5,
        badge: null
    },
    "Detergent 1kg": {
        description: "Tough on stains but gentle on fabrics. Leaves your clothes smelling fresh all day.",
        image: "assets/Detergent 1kg.png",
        rating: 4.5,
        badge: null
    },
    "Palm Oil 1L": {
        description: "Pure and unrefined red palm oil in a convenient 1-liter bottle.",
        image: "assets/Palm Oil 1L.png",
        rating: 4.5,
        badge: null
    },
    "Milk Powder 400g": {
        description: "Rich and creamy milk powder. Fortified with vitamins for a healthy start to your day.",
        image: "assets/Milk Powder 400g.png",
        rating: 5,
        badge: null
    },
    "Tomatoes 1kg": {
        description: "Fresh, juicy, and red-ripe tomatoes. Perfect for salads, sauces, and stews.",
        image: "assets/Tomato (Tin).png",
        rating: 4.5,
        badge: { text: "FRESH", type: "yellow" }
    }
};

let currentCategory = 'All Products';
let currentSearch = '';
let currentMaxPrice = 40000;

async function fetchProducts() {
    try {
        const response = await fetch("../data/products.json");
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const jsonProducts = await response.json();
        
        products = jsonProducts.map((item) => {
            const details = productDetailsMap[item.name] || {
                description: "High quality product.",
                image: "assets/cat_groceries.jpg",
                rating: 0,
                badge: null
            };
            return {
                title: item.name,
                category: item.category,
                price: item.price,
                description: details.description,
                rating: details.rating,
                badge: details.badge,
                image: details.image
            };
        });
        
        filteredProducts = [...products];
        renderCategories();
        setupFilters();
        renderCatalog();
    } catch (error) {
        console.error(error);
        const gridContainer = document.getElementById('catalogGrid');
        if (gridContainer) {
            gridContainer.innerHTML = '<p>Failed to load products. Please try again later.</p>';
        }
    }
}

function renderCategories() {
    const categoryList = document.querySelector('.category-list');
    if (!categoryList) return;

    // Get unique categories
    const categories = ['All Products', ...new Set(products.map(p => p.category))];
    
    categoryList.innerHTML = '';
    
    categories.forEach(category => {
        const li = document.createElement('li');
        if (category === 'All Products') {
            li.className = 'active';
            li.innerHTML = `<a href="#" data-category="${category}">${category} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></a>`;
        } else {
            li.innerHTML = `<a href="#" data-category="${category}">${category}</a>`;
        }
        
        li.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            document.querySelectorAll('.category-list li').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            
            // Apply filter
            currentCategory = category;
            applyFilters();
        });
        
        categoryList.appendChild(li);
    });
}

function setupFilters() {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase();
            applyFilters();
        });
    }

    const priceSlider = document.getElementById('priceSlider');
    const priceLabel = document.getElementById('priceLabel');
    
    if (priceSlider && priceLabel && products.length > 0) {
        // Find max price from products to set the slider range dynamically
        const maxProductPrice = Math.ceil(Math.max(...products.map(p => p.price)));
        priceSlider.max = maxProductPrice;
        priceSlider.value = maxProductPrice;
        currentMaxPrice = maxProductPrice;
        priceLabel.textContent = `${maxProductPrice} FCFA`;
        
        priceSlider.addEventListener('input', (e) => {
            currentMaxPrice = parseInt(e.target.value);
            priceLabel.textContent = `${currentMaxPrice} FCFA`;
            applyFilters();
        });
    }
}

function applyFilters() {
    filteredProducts = products.filter(p => {
        const matchesCategory = currentCategory === 'All Products' || p.category === currentCategory;
        const matchesSearch = p.title.toLowerCase().includes(currentSearch);
        const matchesPrice = p.price <= currentMaxPrice;
        
        return matchesCategory && matchesSearch && matchesPrice;
    });
    
    currentPage = 1; // Reset to first page
    renderCatalog();
}

function generateStarsHTML(rating) {
    if (rating === 0) return '';
    
    let html = '<div class="rating-stars">';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        html += `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    }
    
    if (hasHalfStar) {
        // Hollow star for half
        html += `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    }
    
    // Fill remaining up to 5
    const totalStars = fullStars + (hasHalfStar ? 1 : 0);
    for (let i = totalStars; i < 5; i++) {
         html += `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    }

    html += '</div>';
    return html;
}

function renderCatalog() {
    const gridContainer = document.getElementById('catalogGrid');
    if (!gridContainer) return;

    gridContainer.innerHTML = ''; // Clear container

    // Calculate pagination slice
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    if (paginatedProducts.length === 0) {
        gridContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No products found matching your filters.</p>';
        updateResultsText(0, 0);
        renderPagination();
        return;
    }

    paginatedProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'catalog-card';

        let badgeHTML = '';
        if (product.badge) {
            badgeHTML = `<div class="badge badge-${product.badge.type}">${product.badge.text}</div>`;
        }

        const starsHTML = generateStarsHTML(product.rating);

        card.innerHTML = `
            ${badgeHTML}
            <div class="img-wrapper">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="card-details">
                <h3>${product.title}</h3>
                <p class="category">${product.category}</p>
                <p class="product-description">${product.description}</p>
                <div class="price-row">
                    <div class="price-col">
                        <span class="price">${product.price.toLocaleString()} FCFA</span>
                    </div>
                    ${starsHTML}
                </div>
            </div>
        `;
        
        gridContainer.appendChild(card);
    });

    renderPagination();
    updateResultsText(startIndex, endIndex);
}

function renderPagination() {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    paginationContainer.innerHTML = ''; // Clear existing pagination

    if (totalPages <= 1) return; // No need for pagination if only 1 page

    // Prev Button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-nav';
    prevBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
    prevBtn.disabled = currentPage === 1;
    if (currentPage === 1) prevBtn.style.opacity = '0.5';
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderCatalog();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    paginationContainer.appendChild(prevBtn);

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-num ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderCatalog();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationContainer.appendChild(pageBtn);
    }

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-nav';
    nextBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
    nextBtn.disabled = currentPage === totalPages;
    if (currentPage === totalPages) nextBtn.style.opacity = '0.5';
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCatalog();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    paginationContainer.appendChild(nextBtn);
}

function updateResultsText(startIndex, endIndex) {
    const resultsTextElement = document.querySelector('.header-titles p');
    if (resultsTextElement) {
        const actualEndIndex = Math.min(endIndex, filteredProducts.length);
        resultsTextElement.textContent = `Showing ${filteredProducts.length > 0 ? startIndex + 1 : 0}-${actualEndIndex} of ${filteredProducts.length} results`;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});
