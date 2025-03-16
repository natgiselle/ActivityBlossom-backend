module.exports = {
    // Your MongoDB connection string
    MONGODB: 'mongodb+srv://[username]:[password]@[cluster].mongodb.net/[database]?retryWrites=true&w=majority',

    // Secret key for JWT token generation (change this to a secure random string)
    SECRET_KEY: 'your-256-bit-secret',

    // Server configuration
    PORT: process.env.PORT || 5000,

    // JWT configuration
    JWT_EXPIRE: '1h',  // Token expiration time

    // Optional: Email configuration for future features
    EMAIL_SERVICE: 'your-email-service',
    EMAIL_USERNAME: 'your-email@example.com',
    EMAIL_PASSWORD: 'your-email-password'
}; 