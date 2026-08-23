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
    }
];

function generateStarsHTML(rating) {
    if (rating === 0) return '';
    
    let html = '<div class="rating-stars">';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        html += `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    }
    
    if (hasHalfStar) {
        // Simple visual trick: using hollow star for half for now, or just an unfilled star
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

    products.forEach(product => {
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
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', renderCatalog);
