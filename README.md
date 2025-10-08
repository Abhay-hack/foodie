# QuickServe

**QuickServe** is a full-stack food ordering platform that allows users to browse dishes, manage their cart, place orders, and enables admins to manage the menu and order statuses. The platform provides a modern, responsive interface and a secure backend API.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### User Features
- Signup/Login with email/password
- Google OAuth login
- Browse dishes with search and filters
- Add, update, and remove items in the cart
- Place orders and track status

### Admin Features
- Create, update, and delete dishes
- Update order statuses
- Admin-only protected routes

### Security & Integration
- JWT-based authentication stored in cookies
- CORS setup for secure API calls
- RESTful API integration with backend

---

## Tech Stack

**Frontend:**  
- React.js + Vite  
- TailwindCSS for styling  
- Axios/fetch for API requests  
- React Router for navigation  
- Firebase Admin SDK for Google OAuth  

**Backend:**  
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT authentication  
- CORS and cookie-parser middleware  

---

## Project Structure


```sh
backend/
├── controllers/      # Business logic for auth, cart, dishes, orders
├── routes/           # API route definitions
├── middlewares/      # Auth and error handling middleware
├── models/           # MongoDB schemas (User, Dish, Order, etc.)
├── config/           # Database connection setup
├── server.js         # Entry point (main server file)
└── .env              # Environment variables
```

```sh
frontend/
├─ src/
│ ├─ components/ # Reusable UI components
│ ├─ pages/ # Page-level components (Home, Cart, Orders, Auth)
│ ├─ context/ # React Context for state management
│ ├─ services/ # API request helpers
│ └─ App.jsx # App entry and routing
└──.env
```


---

## Getting Started

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/quickserve.git
    cd quickserve
    ```

2. **Backend setup**
   ```bash
   cd backend
   npm install
   ```
   
3. **Frontend setup**
   ```bash
   cd frontend
   npm install
   ```

---

## Environment Variables
  **Backend** ``.env``
  ```bash
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  FRONTEND_LOCAL=http://localhost:5173
  FRONTEND_PROD=https://your-production-url.com
  FIREBASE_ADMIN_SDK_JSON={"type": "..."} 
  ```


## Usage
1. **Backend**
  ```sh
  node index.js
  ```
  or
  ```sh
  nodemon index.js
  ```
2. **Frontend**
  ```sh
  cd frontend
  npm run dev
  ```

## Contributing
1. We welcome contributions! To contribute:
2. Fork the repository.
3. Create a new branch ```git checkout -b feature/your-feature-name```
4. Make your changes.
5. Commit your changes ```git commit -m "feat: added new feature" ```
6. Push to the branch ```git push origin feature/your-feature-name```
7. Open a Pull Request.

## License
This project is licensed under the MIT License.

## 🔗 Demo
You can view a live demo of the project here: [Quickserve](https://foodie-five-dun.vercel.app/).

## 👤 Author
This project was created by **Abhay Gupta**. Feel free to connect on [LinkedIn](https://www.linkedin.com/in/abhay-gupta-1257b6248/)
