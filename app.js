const express = require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const userRouter = require('./routers/user');
const postingRouter = require('./routers/postings');



const app = express();

app.use(express.json());

app.use(userRouter);
app.use(postingRouter);

module.exports = app;