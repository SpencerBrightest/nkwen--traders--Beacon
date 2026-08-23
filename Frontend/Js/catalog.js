const products = [
    {
        id: 1,
        title: "Artisan Sourdough Loaf",
        category: "Bakery",
        description: "Freshly baked daily with organic stone-ground flour and our signature starter. Perfectly crusty outside, soft inside.",
        price: 6.99,
        oldPrice: null,
        badge: { text: "NEW", type: "yellow" },
        rating: 4.5,
        image: "assets/prod_bread_loaf.jpg"
    },
    {
        id: 2,
        title: "Organic Orange Juice",
        category: "Groceries",
        description: "Cold-pressed from 100% organic Valencia oranges. No added sugar, preservatives, or artificial flavors.",
        price: 8.50,
        oldPrice: null,
        badge: null,
        rating: 0, 
        image: "assets/Palm Oil 1L.png"
    },
    {
        id: 3,
        title: "Bamboo Dish Brush Set",
        category: "Household Items",
        description: "Eco-friendly cleaning brush set with natural bamboo handles and durable sisal bristles. A sustainable choice.",
        price: 12.75,
        oldPrice: 15.00,
        badge: { text: "15% OFF", type: "red" },
        rating: 0,
        image: "assets/cat_household.jpg"
    },
    {
        id: 4,
        title: "Fresh Organic Spinach",
        category: "Fresh Produce",
        description: "Crisp, farm-fresh organic spinach leaves. Perfect for nutrient-packed salads, smoothies, or cooking.",
        price: 4.20,
        oldPrice: null,
        badge: null,
        rating: 0,
        image: "assets/cat_groceries.jpg"
    },
    {
        id: 5,
        title: "Premium Pantry Bundle",
        category: "Groceries",
        description: "A curated selection of high-quality daily essentials for your kitchen. Includes rice, pasta, and premium sauces.",
        price: 45.00,
        oldPrice: null,
        badge: { text: "POPULAR", type: "yellow" },
        rating: 5,
        image: "assets/prod_pantry_bundle.jpg"
    },
    {
        id: 6,
        title: "Ceramic Breakfast Set",
        category: "Household Items",
        description: "Start your morning with minimalist elegance. Includes 2 premium ceramic plates and 2 matching mugs.",
        price: 85.00,
        oldPrice: null,
        badge: null,
        rating: 5,
        image: "assets/prod_breakfast.jpg"
    },
    {
        id: 7,
        title: "Fresh Red Onions 1kg",
        category: "Fresh Produce",
        description: "Locally sourced, crisp and flavorful red onions. Essential for a variety of culinary dishes.",
        price: 2.50,
        oldPrice: null,
        badge: null,
        rating: 4,
        image: "assets/prod_onions_1kg.jpg"
    },
    {
        id: 8,
        title: "Premium Long Grain Rice 25kg",
        category: "Groceries",
        description: "High-quality, aromatic long grain rice. Perfect fluffy texture for family meals and gatherings.",
        price: 35.00,
        oldPrice: 40.00,
        badge: { text: "SALE", type: "red" },
        rating: 4.5,
        image: "assets/prod_rice_25kg.jpg"
    },
    {
        id: 9,
        title: "Iodized Sea Salt 1kg",
        category: "Groceries",
        description: "Pure, natural sea salt fortified with essential iodine. A pantry staple for seasoning.",
        price: 1.20,
        oldPrice: null,
        badge: null,
        rating: 5,
        image: "assets/prod_salt_1kg.jpg"
    },
    {
        id: 10,
        title: "Organic White Beans 1kg",
        category: "Groceries",
        description: "Nutritious and versatile white beans. Excellent source of plant-based protein and fiber.",
        price: 3.80,
        oldPrice: null,
        badge: null,
        rating: 4,
        image: "assets/prod_beans_white.jpg"
    },
    {
        id: 11,
        title: "Pure Vegetable Oil 5L",
        category: "Groceries",
        description: "High-quality, cholesterol-free vegetable oil suitable for all your cooking and frying needs.",
        price: 18.50,
        oldPrice: null,
        badge: null,
        rating: 4.5,
        image: "assets/Vegetable Oil 5L.jpg"
    },
    {
        id: 12,
        title: "Fresh Plantain Bunch",
        category: "Fresh Produce",
        description: "Farm-fresh, ripe plantains ready to be fried, boiled, or baked for a delicious side dish.",
        price: 5.00,
        oldPrice: null,
        badge: { text: "FRESH", type: "yellow" },
        rating: 5,
        image: "assets/Bunch of plantain.png"
    },
    {
        id: 13,
        title: "Cassava Bag",
        category: "Fresh Produce",
        description: "High-yield, premium quality fresh cassava straight from the farm.",
        price: 12.00,
        oldPrice: null,
        badge: null,
        rating: 4,
        image: "assets/Cassava (bag).png"
    },
    {
        id: 14,
        title: "Multi-Purpose Detergent 1kg",
        category: "Household Items",
        description: "Tough on stains but gentle on fabrics. Leaves your clothes smelling fresh all day.",
        price: 4.50,
        oldPrice: null,
        badge: null,
        rating: 4.5,
        image: "assets/Detergent 1kg.png"
    },
    {
        id: 15,
        title: "Maggi Seasoning Cubes",
        category: "Groceries",
        description: "Classic seasoning cubes to enhance the flavor of your soups, stews, and marinades.",
        price: 3.00,
        oldPrice: null,
        badge: null,
        rating: 5,
        image: "assets/Maggi Cubes (pack).png"
    }
];

let currentPage = 1;
const itemsPerPage = 10;

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
    const paginatedProducts = products.slice(startIndex, endIndex);

    paginatedProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'catalog-card';

        let badgeHTML = '';
        if (product.badge) {
            badgeHTML = `<div class="badge badge-${product.badge.type}">${product.badge.text}</div>`;
        }

        let oldPriceHTML = '';
        if (product.oldPrice) {
            oldPriceHTML = `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>`;
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
                        <span class="price">$${product.price.toFixed(2)}</span>
                        ${oldPriceHTML}
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

    const totalPages = Math.ceil(products.length / itemsPerPage);
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
        const actualEndIndex = Math.min(endIndex, products.length);
        resultsTextElement.textContent = \`Showing \${startIndex + 1}-\${actualEndIndex} of \${products.length} results\`;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
});
