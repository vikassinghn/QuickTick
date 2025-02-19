const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect("mongodb+srv://vikassingh227815:n1NOee2GdObaGkjj@cluster0.r3kda.mongodb.net/");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process on failure
    }
};

conn();
