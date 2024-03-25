const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

function database() {
    mongoose.connect(process.env.DB_URI)
        .then(() => {
            console.log("MongoDB is connected");
        })
        .catch((err) => {
            console.log("There was an error while connecting to the database");
        });
}

module.exports = database;