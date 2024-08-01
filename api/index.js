import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';


dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(
        () => { console.log("Mongodb connected");}
    )
    .catch(
        (err) => { console.log(err);}
    );

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

app.listen(
    4000,
    () => { console.log("Server is running on port 4000");}
);


app.use(
    (err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        const errorDetails = {
            message: err.message,
            stack: err.stack,
            name: err.name
        };
        res.status(statusCode).json({
            success: false,
            statusCode,
            message,
            error: errorDetails
        });
    }
);