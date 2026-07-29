# 🏨 HotelOS - Hotel Management System

A modern full-stack Hotel Management System built with **React**, **Vite**, **Tailwind CSS**, and **Supabase**. HotelOS enables customers to browse food, book rooms, enquire about banquet halls, and allows administrators to manage all bookings through a dedicated dashboard.

---

## 🌟 Features

### 👥 Customer Features

- 🏠 Modern responsive Home page
- 🍽️ Restaurant menu with categories
- 🛒 Shopping cart
- 📦 Food ordering
- 🛏️ Room booking
- ✅ Real-time room availability checking
- 🎉 Banquet hall enquiry
- 📱 Fully responsive design

---

### 🔐 Admin Features

- Secure Admin Login
- Dashboard overview
- Manage Food Orders
- Manage Room Bookings
- Manage Banquet Enquiries
- Update booking/order status
- Search and filtering
- Real-time notifications using Supabase

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router

### Backend
- Supabase

### Database
- PostgreSQL (Supabase)

### Authentication
- Supabase Authentication

### Deployment
- Vercel

---

## 📂 Project Structure

```
HotelOS/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── data/
│   │   ├── services/
│   │   └── assets/
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

## 🗄️ Database

HotelOS uses Supabase PostgreSQL.

### Tables

### room_bookings

Stores customer room bookings.

### food_orders

Stores customer food orders.

### banquet_enquiries

Stores banquet hall booking enquiries.

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/HotelOS.git
```

Go to project

```bash
cd client
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Build production version

```bash
npm run build
```

---

## 🔑 Environment Variables

Create a `.env.local` file inside the `client` folder.

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

---

## 📸 Screenshots

Screenshots will be added after deployment.

- Home Page
- Menu Page
- Rooms Page
- Banquet Page
- Cart
- Admin Dashboard

---

## 🌐 Live Demo

Coming Soon

---

## 🔮 Future Improvements

- Online Payments
- Customer Accounts
- Booking History
- Email Notifications
- QR Code Ordering
- Analytics Dashboard
- Gallery
- Customer Reviews

---

## 👨‍💻 Author

Developed by **Sai kumar**

---

## 📄 License

This project is created for learning and portfolio purposes.