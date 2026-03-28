// TechVault - Premium Electronics Store Cart Management System
// Modern Professional Shopping Cart with Full Features

class CartManager {
    constructor() {
        this.cartItems = [];
        this.taxRate = 0.1; // 10% Tax
        this.shippingCost = 0; // Free shipping
        this.productListContainer = document.querySelector(".product-list");
        this.apiEndpoint = "http://localhost:5000/products";
        
        this.init();
    }

    async init() {
        try {
            await this.loadProductsFromAPI();
            this.attachEventListeners();
            this.updateOrderPanel();
        } catch (error) {
            console.error("Initialization error:", error);
            this.showErrorState();
        }
    }

    async loadProductsFromAPI() {
        try {
            const response = await fetch(this.apiEndpoint);
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const productsData = await response.json();
            this.cartItems = productsData || [];
            this.renderCartItems();
        } catch (error) {
            console.warn("API fetch failed, using fallback data:", error);
            this.cartItems = this.getDefaultProducts();
            this.renderCartItems();
        }
    }

    getDefaultProducts() {
        return [
            {
                id: 1,
                name: "Wireless Headphones Pro",
                description: "Active noise cancellation with 30-hour battery life.",
                price: 8999,
                image: "assets/product1.jpg",
                badge: "Premium",
                quantity: 1
            },
            {
                id: 2,
                name: "Smart Watch Ultra",
                description: "Advanced fitness tracking with AMOLED display and GPS.",
                price: 12499,
                image: "assets/product2.jpg",
                badge: "Bestseller",
                quantity: 1
            },
            {
                id: 3,
                name: "Fast Charging Cable Kit",
                description: "100W USB-C cables with premium braided design. Pack of 3.",
                price: 1299,
                image: "assets/product3.jpg",
                badge: "Hot Deal",
                quantity: 1
            }
        ];
    }

    renderCartItems() {
        if (!this.productListContainer) return;

        this.productListContainer.innerHTML = "";
        
        this.cartItems.forEach((item, index) => {
            const cardHTML = this.createProductCardHTML(item, index);
            this.productListContainer.innerHTML += cardHTML;
        });
    }

    createProductCardHTML(item, index) {
        const bgClass = index % 2 === 0 ? "light-card" : "dark-card";
        
        return `
            <div class="product-card ${bgClass}" data-product-id="${item.id || index}">
                <div class="product-image-container">
                    <img src="${item.image || 'assets/product1.jpg'}" alt="${item.name}" class="product-image">
                    <span class="product-badge">${item.badge || "Featured"}</span>
                </div>
                <div class="product-info">
                    <h4 class="product-name">${item.name}</h4>
                    <p class="product-description">${item.description}</p>
                    <p class="product-price">₹ ${this.formatPrice(item.price)}</p>

                    <div class="quantity-controls">
                        <button class="qty-btn decrease-btn" data-action="decrease" aria-label="Decrease quantity">−</button>
                        <span class="qty-value">${item.quantity || 1}</span>
                        <button class="qty-btn increase-btn" data-action="increase" aria-label="Increase quantity">+</button>
                    </div>
                    <button class="remove-btn" data-action="remove" aria-label="Remove item">Remove</button>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Attach listeners to all quantity and remove buttons
        this.productListContainer?.addEventListener("click", (e) => {
            const target = e.target;
            const action = target.dataset.action;

            if (!action) return;

            const productCard = target.closest(".product-card");
            const productId = productCard?.dataset.productId;

            switch (action) {
                case "increase":
                    this.updateQuantity(productId, 1);
                    break;
                case "decrease":
                    this.updateQuantity(productId, -1);
                    break;
                case "remove":
                    this.removeProduct(productId);
                    break;
            }
        });

        // Attach listeners to main buttons
        document.querySelector(".checkout-primary-btn")?.addEventListener(
            "click",
            () => this.proceedToCheckout()
        );

        document.querySelector(".continue-shopping-btn")?.addEventListener(
            "click",
            () => this.continueShopping()
        );

        // Search functionality
        document.querySelector(".search-btn")?.addEventListener(
            "click",
            () => this.performSearch()
        );

        document.querySelector(".search-input")?.addEventListener(
            "keypress",
            (e) => e.key === "Enter" && this.performSearch()
        );
    }

    updateQuantity(productId, delta) {
        const product = this.cartItems.find((item) => 
            String(item.id || this.cartItems.indexOf(item)) === String(productId)
        );

        if (product) {
            const newQuantity = (product.quantity || 1) + delta;
            
            if (newQuantity > 0) {
                product.quantity = newQuantity;
                this.renderCartItems();
                this.attachEventListeners();
                this.updateOrderPanel();
            } else {
                this.removeProduct(productId);
            }
        }
    }

    removeProduct(productId) {
        const index = this.cartItems.findIndex((item) =>
            String(item.id || this.cartItems.indexOf(item)) === String(productId)
        );

        if (index !== -1) {
            const removedItem = this.cartItems[index];
            this.cartItems.splice(index, 1);
            
            // Show removal notification
            this.showNotification(`${removedItem.name} removed from cart`);
            
            this.renderCartItems();
            this.attachEventListeners();
            this.updateOrderPanel();
        }
    }

    updateOrderPanel() {
        const subtotal = this.calculateSubtotal();
        const tax = Math.round(subtotal * this.taxRate);
        const total = subtotal + tax + this.shippingCost;

        // Update subtotal
        const subtotalElement = document.querySelector(".breakdown-row:first-child .value");
        if (subtotalElement) {
            subtotalElement.textContent = `₹ ${this.formatPrice(subtotal)}`;
        }

        // Update tax
        const taxElement = document.querySelector(".tax-value");
        if (taxElement) {
            taxElement.textContent = `₹ ${this.formatPrice(tax)}`;
        }

        // Update total
        const totalElement = document.querySelector(".total-amount");
        if (totalElement) {
            totalElement.textContent = `₹ ${this.formatPrice(total)}`;
        }
    }

    calculateSubtotal() {
        return this.cartItems.reduce((sum, item) => {
            return sum + (item.price || 0) * (item.quantity || 1);
        }, 0);
    }

    proceedToCheckout() {
        if (this.cartItems.length === 0) {
            this.showNotification("Your cart is empty!");
            return;
        }

        const total = this.calculateSubtotal() + 
                     Math.round(this.calculateSubtotal() * this.taxRate);

        const checkoutData = {
            items: this.cartItems,
            subtotal: this.calculateSubtotal(),
            tax: Math.round(this.calculateSubtotal() * this.taxRate),
            total: total
        };

        // Simulate checkout - in real app, redirect to payment gateway
        console.log("Proceeding to checkout:", checkoutData);
        this.showNotification(
            `Processing ₹${this.formatPrice(total)}... Redirecting to payment`,
            "success"
        );

        // Simulated redirect (in production, use actual payment gateway)
        setTimeout(() => {
            alert("Payment gateway integration would happen here. Total: ₹" + this.formatPrice(total));
        }, 500);
    }

    continueShopping() {
        this.showNotification("Redirecting to products page...");
        // In production: window.location.href = "/products"
    }

    performSearch() {
        const searchTerm = document.querySelector(".search-input")?.value.toLowerCase();
        if (!searchTerm) {
            this.renderCartItems();
            this.attachEventListeners();
            return;
        }

        const filtered = this.cartItems.filter((item) =>
            item.name.toLowerCase().includes(searchTerm) ||
            (item.description && item.description.toLowerCase().includes(searchTerm))
        );

        // Display search results
        if (filtered.length === 0) {
            this.showNotification("No products found matching your search");
            return;
        }

        console.log("Search results:", filtered);
        this.showNotification(`Found ${filtered.length} product(s)`);
    }

    showErrorState() {
        if (this.productListContainer) {
            this.productListContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #ef4444;">
                    <p style="font-size: 18px; margin-bottom: 10px;">⚠️ Unable to Load Products</p>
                    <p style="color: #666; margin-bottom: 15px;">Please check your connection and try again.</p>
                    <button onclick="location.reload()" style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer;">
                        Retry
                    </button>
                </div>
            `;
        }
    }

    showNotification(message, type = "info") {
        const notification = document.createElement("div");
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#2563eb"};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
            max-width: 300px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = "slideOut 0.3s ease-out";
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    formatPrice(price) {
        return price.toLocaleString("en-IN");
    }
}

// Add animation styles to document
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the Cart Manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new CartManager();
});