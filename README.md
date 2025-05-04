# ABC

A Node.js backend API using Express, MongoDB, AWS S3, and Stripe.

## Features

- 🌐 RESTful API built with Express
- 🔒 User authentication with JWT and bcrypt
- 💾 MongoDB with Mongoose
- 📦 File uploads to AWS S3 using Multer
- 💳 Stripe payment integration
- 📊 Chart.js for analytics
- ✅ Input validation with validator.js

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or above
- [MongoDB](https://www.mongodb.com/)
- AWS credentials for S3
- Stripe API keys

## Install dependencies
npm install

# Create a .env file in the root directory and add the following:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name
STRIPE_SECRET_KEY=your_stripe_secret_key


# Start the development server:
npm run dev
Server will run at http://localhost:5000
