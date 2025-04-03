# Fashion Store - Clothing Shop Website

A Node.js web application for an online clothing shop with product catalog, shopping cart, checkout functionality, and admin dashboard.

## Features

- Product catalog with filtering and sorting
- Product details with size and color selection
- Shopping cart functionality
- Checkout process
- Admin dashboard for managing products
- Responsive design for all devices

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- EJS templating engine
- Bootstrap 5
- Font Awesome icons

## Installation

### Cloning and Setup

1. Clone the repository:
   ```
   git clone https://github.com/bencgn/fashion-store
   cd fashion-store
   ```

2. Install dependencies using npm:
   ```
   npm install
   ```
   Alternatively, you can install from requirements.txt:
   ```
   cat requirements.txt | xargs npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/clothing-shop
   SESSION_SECRET=your_session_secret
   ```

4. Make sure MongoDB is running. On Windows, you can start MongoDB using:
   ```
   net start MongoDB
   ```
   Or use MongoDB Atlas by updating the MONGODB_URI in your .env file.

5. Start the application:
   ```
   npm start
   ```

## Database Seed

To populate the database with sample products (after MongoDB is running):

```
node seed.js
```

## Usage

- Main website: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin

## Development

### Git Workflow

The project includes a `.gitignore` file to exclude unnecessary files from version control.

1. Create a new branch for your feature:
   ```
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```
   git add .
   git commit -m "Add your meaningful commit message"
   ```

3. Push to your branch:
   ```
   git push origin feature/your-feature-name
   ```

4. Create a pull request to merge your changes.

### Deployment

For production deployment:

1. Update your `.env` file with production values
2. Make sure to set `NODE_ENV=production`
3. Consider using a process manager like PM2
   ```
   npm install -g pm2
   pm2 start app.js --name "fashion-store"
   ```

## License

ISC
