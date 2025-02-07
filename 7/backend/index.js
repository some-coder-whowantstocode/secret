require('express-async-errors');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
require('./connectDB.js');

const userRouter = require('./router/userRouter.js');
const adminRouter = require('./router/adminRouter.js');
const authRouter = require('./router/authRouter.js');

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin:process.env.ORIGIN
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
