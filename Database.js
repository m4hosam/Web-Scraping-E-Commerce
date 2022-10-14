const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/webScraping", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conneccted')
    })
    .catch(er => {
        console.log('connection Error')
    });

// Mongodb

const sellerSchema = new mongoose.Schema({
    id: Number,
    seller: String,
    price: String,
    productUrl: String,
    rate: String
})

const laptopSchema = new mongoose.Schema({
    id: Number,
    name: String,
    imgUrl: String,
    brand: String,
    series: String,
    modelNo: String,
    ops: String,
    cpuType: String,
    cpuGen: String,
    ram: String,
    diskSize: String,
    diskType: String,
    screenSize: String,
    sellers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    }]
})
const Laptop = mongoose.model("Laptop", laptopSchema);
const Seller = mongoose.model("Seller", sellerSchema);




exports.Laptop = Laptop;
exports.Seller = Seller;