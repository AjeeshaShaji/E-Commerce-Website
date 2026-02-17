
# MERN E-Commerce Platform

A full-stack **E-commerce web application** built with **MongoDB, Express.js, React.js, and Node.js (MERN)**.
This project includes user authentication, product management, cart, wishlist, order tracking, and profile management.

---

## 🔹 Features

### User Features

* View and search products with categories and prices.
* Add products to **Cart** with quantity selection.
* Add products to **Wishlist**.
* Place orders with address and phone number.
* Track order status (**Pending, Shipped, Delivered, Cancelled**).
* Cancel pending orders.
* Manage user **Profile** (view and edit details).

### Admin Features (Optional)

* Add, update, or delete products.
* View all orders and their statuses.

### Technical Features

* Full **RESTful API** backend with Express.js.
* **MongoDB** database for products, users, orders, and wishlist.
* Frontend built with **React.js** using functional components and hooks.
* **Tailwind CSS** for modern and responsive UI.
* Quantity validation and total price calculation.
* Cart and Wishlist integration with real-time updates.
* Modular backend structure with **controllers, routes, and models**.

---

## 🔹 Tech Stack

* **Frontend:** React.js, Tailwind CSS, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Other Tools:** Postman for testing APIs, Nodemon for backend auto-restart

---

## 🔹 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ecommerce.git
cd ecommerce
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend` with:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

> Backend runs at `http://localhost:3000/`

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

> Frontend runs at `http://localhost:5173/` (or your configured port)

---

## 🔹 API Endpoints (User)

| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| GET    | `/user/products`          | Get all products         |
| POST   | `/user/cart`              | Add product to cart      |
| GET    | `/user/cart`              | Get user cart            |
| DELETE | `/user/cart/:id`          | Remove product from cart |
| POST   | `/user/wishlist`          | Add product to wishlist  |
| GET    | `/user/wishlist`          | Get wishlist items       |
| DELETE | `/user/wishlist/:id`      | Remove wishlist item     |
| POST   | `/user/order`             | Place an order           |
| GET    | `/user/orders`            | Get all user orders      |
| PUT    | `/user/orders/:id/cancel` | Cancel pending order     |
| GET    | `/user/profile`           | Get user profile         |
| PUT    | `/user/profile`           | Update user profile      |



## 🔹 Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/FeatureName`
3. Commit your changes: `git commit -m "Add some feature"`
4. Push to the branch: `git push origin feature/FeatureName`
5. Open a Pull Request.
