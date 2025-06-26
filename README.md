```md
# Product Showcase Web App

This is a responsive and user-friendly product showcase web application built using React.js and Tailwind CSS. It allows users to browse a list of products, filter by category and price range, sort the products, view product details with reviews, and manage a shopping cart. The application is also PWA-ready for installation on supported devices.

---

## Tech Stack

- React 18 (Create React App)
- Tailwind CSS 
- Responsive design using mobile-first approach
- REST API: FakeStoreAPI
- Toast notifications using react-toastify
- LocalStorage for managing cart state

---

## Features

- Display product cards with image, title, price, and rating
- Filter products by category and price range
- Sort products by name, price, or popularity
- Paginate products (10 per page)
- View detailed product information with reviews
- Add and remove items from the cart with quantity control
- Show loading skeletons during data fetch
- Toast messages for user feedback (e.g., item added to cart)
- Installable as a Progressive Web App (PWA)

---

## Folder Structure

```

src/
├── api/                 # API requests
├── assets/              # Images, logo
├── components/          # Shared UI components
│   ├── common/          # Pagination
│   ├── product/         # ProductCard
├── features/            # Filters and sort logic
│   ├── filter/          # FilterSidebar
│   └── sort/            # SortOptionsDropdown
├── layouts/             # Header and layout components
├── pages/               # Home, ProductDetail, Cart pages
├── routes/              # App routing
├── App.js
├── index.js
├── index.css

````

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Praduman1916/product-showcase-app
cd product-showcase-app
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

### 4. Build for production

```bash
npm run build
```

---

## Screenshots

| Home Page                     | Product Detail                     | Cart Page                     |
| ----------------------------- | ---------------------------------- | ----------------------------- |
| ![Home](./screenshots/home.png) | ![Detail](./screenshots/details.png) | ![Cart](./screenshots/cart.png) |

---

## Deployment

### Deploy on vercel .
[Click here to view the live site](https://product-showcase-app-two.vercel.app/)


---

## GitHub Repository

[https://github.com/Praduman1916/product-showcase-app](https://github.com/Praduman1916/product-showcase-app)

---
