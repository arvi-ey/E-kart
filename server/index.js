require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require("./db/dbConnection")
const ProductRouter = require("./routes/productRouter")
const CartRouter = require("./routes/cartRouter")
const app = express();


app.use(cors({
    origin: '*',
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



connectDB(process.env.DB_URL);


app.get('/', (req, res) => {
    res.send("HELLO SERVER")
});



app.use("/api/v1/products", ProductRouter)
app.use("/api/v1/cart", CartRouter)

app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});