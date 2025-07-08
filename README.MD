# Coffee Store Starter Template

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing and ordering coffee products.

## Features

- User authentication (context-based)
- View coffee details
- Like/unlike coffee products
- Place orders for coffee
- View your order history
- Responsive, modern UI with Tailwind CSS

## Tech Stack

- **Frontend:** React, React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (with Mongoose)
- **Authentication:** Context API (custom, can be extended)
- **API:** RESTful endpoints

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/coffee-store-starter-template.git
   cd coffee-store-starter-template
   ```

2. **Install dependencies for both client and server:**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Set up environment variables:**

   - In `/client`, create a `.env` file:
     ```
     VITE_API_URL=http://localhost:5000
     ```

   - In `/server`, create a `.env` file:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     ```

4. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

5. **Start the frontend:**
   ```bash
   cd ../client
   npm run dev
   ```

6. **Visit the app:**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Folder Structure

```
coffee-store-starter-template/
├── client/      # React frontend
├── server/      # Express backend
└── README.MD
```

## API Endpoints

- `GET /coffees` — List all coffees
- `GET /coffee/:id` — Get details for a coffee
- `PATCH /like/:coffeeId` — Like/unlike a coffee
- `POST /place-order/:coffeeId` — Place an order
- `GET /my-orders/:email` — Get orders for a user

## Customization

- Update the UI in `client/src/components`
- Add more fields to coffee or order models in the backend as needed

## License

MIT
