const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route")
const ApiError = require("./app/api-error")

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

// handle 404 response
app.use((req, res, next)=>{
    //code o day se chay khi k co route dc dinh nghia nao
    //khop voi yeu cau. Goi next() de chuyen sang middleware xu ly loi
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, rep, res, next)=>{
    return res.status(err.statusCode || 500).json({
        message: err.message || "Intenal server Error",
    });
});


module.exports = app;