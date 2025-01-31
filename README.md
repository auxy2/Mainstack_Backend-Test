# MainStack Backend Developer Test

# Mainstack Backend




This project is a **RESTful API** that allows you to manage products, carts, and wishlists. It also includes authentication for login and sign-up. The API provides endpoints to create and manipulate products, add/remove products to/from the cart, add/remove products to/from the wishlist, and more.

## Features
- **Product Management**: Create, update, and delete products.
- **Cart Management**: Add/remove products to/from the shopping cart.
- **Wishlist Management**: Add/remove products to/from the wishlist.
- **Authentication**: User login and sign-up for secure access to the API.

## Setup

There are two main ways to run the application: **Locally** and **Using Docker**.

### 1. Running Locally

If you're running the application locally on your machine, follow these steps:

1. **Clone the repository** to your local machine.
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Build the TypeScript files**:
    ```bash
    npm run build
    ```
4. **Start the application**:
    ```bash
    npm start
    ```

By default, the server will run on `http://localhost:4567`.

### 2. Running with Docker

If you want to run the application using Docker, follow these steps:

1. **Install Docker** on your machine if you haven't already. You can download and install Docker from [here](https://www.docker.com/products/docker-desktop).
   
2. **Build the Docker image**:
    ```bash
    docker build .
    ```

3. **Start the application using Docker Compose**:
    ```bash
    docker-compose up
    ```

The application will be accessible on port `4567` (e.g., `http://localhost:4567`).

### Environment Variables

You need to set the following environment variables for the application to run:

- `PORT=4567` – The port on which the application will run.
- `DATABASE_URL=<your_mongodb_connection_url>` – MongoDB connection URL (e.g., MongoDB Atlas URL or local MongoDB URL).
- `DATABASE_NAME=MainStack-Test` – The name of the MongoDB database.
- `JWT_SECRET=your_secret_key` – Secret key for JWT authentication.
- `JWTEXPIN=3d` – Expiration time for JWT tokens (e.g., `3d`).
- `JWT_ISS=MainStack` – JWT issuer.

These environment variables can be set in a `.env` file or directly in your Docker configuration.

### API Endpoints

Here are some of the key endpoints available in the API:

- `POST /auth/signup` – Create a new user account.
- `POST /auth/login` – Log in and receive a JWT token.
- `POST /products` – Create a new product (Admin only).
- `GET /products` – Get all products.
- `GET /products/:id` – Get a single product by its ID.
- `PUT /products/:id` – Update an existing product (Admin only).
- `DELETE /products/:id` – Delete a product (Admin only).
- `POST /cart` – Add a product to the cart.
- `DELETE /cart/:productId` – Remove a product from the cart.
- `POST /wishlist` – Add a product to the wishlist.
- `DELETE /wishlist/:productId` – Remove a product from the wishlist.

### Testing the API

To test the API after setting it up, you can use tools like [Postman](https://www.postman.com/) or `curl` to make HTTP requests to the API endpoints. Find the postman collection [here](https://app.getpostman.com/join-teaminvite_code=82c6d4e6e970b3d968f6ac27b6ff45fe3b1aa8be87a3fc47bfb29e1c089edeb1&target_code=47b42dfff3cc59a25278e233677aee86)

I encounter a bug while writing test please use post man for proper testings

### Troubleshooting

If you encounter issues running the app:

- Ensure that Docker is installed and running correctly on your machine.
- Double-check your `.env` file or Docker environment variables.
- Verify that MongoDB is accessible if you're using a MongoDB Atlas connection or a local MongoDB instance.

If you continue to face issues, check the logs with:

   ```bash
  docker-compose logs
   ```

### Notes:
- This `README.md` provides the essential setup and usage instructions for both local and Docker-based setups.
- Adjust the placeholders (e.g., MongoDB connection URL) to match your specific project configuration.
- The API endpoints section is basic; you can extend it based on the actual endpoints and request/response formats you have in your app.

