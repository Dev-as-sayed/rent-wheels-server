# Rent Wheels Server

This is the server-side codebase for the Rent Wheels application, a car rental service. It provides RESTful APIs for user authentication, car management, and booking functionalities.



## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Dev-as-sayed/rent-wheels-server.git
   cd rent-wheels-server
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory and set the following environment variables:**

   ```env
   NODE_ENV=development
   PORT=5000
   DB_URL=mongodb://localhost:27017/rent-wheels
   BCRYPT_SALT_ROUND=10
   JWT_ACCESS_SECRET=your_jwt_access_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   JWT_ACCESS_EXPIRES_IN=1h
   JWT_REFRESH_EXPIRES_IN=7d
   ```

   Replace the values as necessary for your environment.

## Usage

1. **Start the server:**

   ```bash
   npm run start:dev
   ```

