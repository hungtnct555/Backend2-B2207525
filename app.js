const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error")
const app = express();
const contactsRouter = require("./app/routes/contact.route");
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route nào phù hợp với yêu cầu
    // Gọi next() để chuyển xử lý lỗi với middleware xử lý lỗi tiếp theo
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        message: err.message || "Internal Server Error",
    });
});



module.exports = app;
