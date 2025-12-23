# ✈️ XTechon Flight Booking System

A full-stack flight booking application with **dynamic surge pricing**, **per-user booking attempts tracking**, and **PDF ticket generation**. The system updates flight prices based on recent bookings and resets them after a set time window. The frontend is built with **React**, and the backend uses **Node.js, Express, and MongoDB**.

---

## 🔹 Features

* Search flights by **departure and arrival cities**
* **Dynamic pricing logic**:

  * Price increases if a flight is booked multiple times within a short time frame
  * Price resets after a cooldown period
  * Pricing updates are global for all users (configurable)
* Book flights and generate **PDF tickets**
* Pdf download option to download the ticket.
* Default Wallet with the user register the Account.
* Track **booking attempts** for surge logic
* Responsive and clean **React frontend** with modals for booking
* Backend validation with **Zod schemas**

---

## 🔹 Technologies Used

* **Frontend**: React, Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB, Mongoose
* **PDF Generation**: pdf-kit
* **Authentication**: JWT-based
* **Validation**: Zod schemas

---

## 🔹 Dynamic Pricing Logic

1. **Surge Logic**

   * If a flight is booked **3 or more times within 5 minutes**, the price is increased by a **percentage of base price**.
2. **Reset Logic**

   * If there are **no bookings for 10 minutes**, the flight price resets to `base_price`.
3. **Global Price**

   * Current price is stored in the flight document (`current_price`) and visible to all users.

---

## 🔹 API Endpoints

### Flight Routes

| Method | Endpoint                        | Description                                            |
| ------ | ------------------------------- | ------------------------------------------------------ |
| GET    | `/flights`                      | Get all flights                                        |
| GET    | `/flights/search?from=<>&to=<>` | Search flights by cities (price updates automatically) |

### Booking Routes

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| POST   | `/booking`               | Book a flight       |
| GET    | `/booking`               | Get user's bookings |
| GET    | `/booking/download/:pnr` | Download PDF ticket |

---

## 🔹 Setup Instructions

### Backend

1. Clone the repository:

```bash
git clone <repo-url>
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Setup `.env` file with MongoDB URI and JWT secret:

```
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_secret>
PORT=5000
```

4. Start the backend server:

```bash
npm run dev
```

---

### Frontend

1. Navigate to frontend:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start frontend development server:

```bash
npm start
```

---

## 🔹 Usage

1. Open the frontend in the browser (`http://localhost:3000`)
2. Search for flights by **From** and **To** cities
3. Book a flight by clicking **Book Now**
4. PDF ticket is generated and available for download
5. Price will automatically update based on recent booking activity

---

## 🔹 Project Configurations

* **Surge settings**: `/utils/constants.js`

  ```js
  export const SURGE_ATTEMPT_LIMIT = 3;
  export const SURGE_TIME_WINDOW_MIN = 5;
  export const SURGE_RESET_MIN = 10;
  export const SURGE_PRECENTAGE = 0.2; // 20%
  ```
* **Flight pricing**:

  * `base_price` – minimum price for the flight
  * `current_price` – updated dynamically

---

## 🔹 Author

**Sachin Chandra Bhatt** 
Email: `your-email@example.com`
LinkedIn: `[Your LinkedIn]`
