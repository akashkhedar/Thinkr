const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    .then((res) => console.log("connected succesfully"))
    .catch((err) => console.error(err))
}

module.exports = connectToMongo;