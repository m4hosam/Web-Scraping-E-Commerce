const { Laptop, Seller, Product } = require("./Database")
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")

// important to make bodyParser work effieciently
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
app.get('/favicon.ico', (req, res) => {
    return '404'
})

//--------------------
const newLaptop = new Laptop({
    id: 3,
    name: "MSI Modern 15 A11MU-839XTR Intel Core i5 ",
    imgUrl: "https://productimages.hepsiburada.net/s/139/1500/110000091575803.jpg",
    brand: "ASUS",
    series: "ROG Strix SCAR 15 Gaming Laptop",
    modelNo: "G533ZW-AS94",
    ops: "Free Dos",
    cpuType: "Intel Core i7",
    cpuGen: "11",
    ram: "16 GB",
    diskSize: "1 TB",
    diskType: "SSD",
    screenSize: "15.6 Inches",
    sellers: []
})

const newProduct = new Product({
    id: 4,
    name: "MSI Modern 15 A11MU-839XTR Intel Core i5 ",
    imgUrl: "https://productimages.hepsiburada.net/s/139/1500/110000091575803.jpg",
    brand: "ASUS",
    series: "ROG Strix SCAR 15 Gaming Laptop",
    modelNo: "G533ZW-AS94",
    ops: "Free Dos",
    cpuType: "Intel Core i7",
    cpuGen: "11",
    ram: "16 GB",
    diskSize: "1 TB",
    diskType: "SSD",
    screenSize: "15.6 Inches",
    price: "50,000 TL"
})

const seller1 = new Seller({
    id: 3,
    seller: "Hepsiburda",
    price: "50.000 TL",
    productUrl: "https://www.hepsiburada.com/msi-modern-15-a11mu-839xtr-intel-core-i5-1155g7-8gb-512gb-ssd-freedos-15-6-fhd-tasinabilir-bilgisayar-p-HBCV00000ZAY8H",
    rate: "4.0"
})
const seller2 = new Seller({
    id: 3,
    seller: "n11",
    price: "20.000 TL",
    productUrl: "https://www.hepsiburada.com/msi-modern-15-a11mu-839xtr-intel-core-i5-1155g7-8gb-512gb-ssd-freedos-15-6-fhd-tasinabilir-bilgisayar-p-HBCV00000ZAY8H",
    rate: "4.0"
})
const seller3 = new Seller({
    id: 3,
    seller: "Trendyol",
    price: "30.000 TL",
    productUrl: "https://www.hepsiburada.com/msi-modern-15-a11mu-839xtr-intel-core-i5-1155g7-8gb-512gb-ssd-freedos-15-6-fhd-tasinabilir-bilgisayar-p-HBCV00000ZAY8H",
    rate: "4.0"
})


app.get('/seller', cors(), async function (req, res) {
    // await newLaptop.save();
    Laptop.findOne({ "id": 2 }, async function (err, docs) {
        await seller1.save();
        await seller2.save();
        await seller3.save();
        docs.sellers.push(seller1);
        docs.sellers.push(seller2);
        docs.sellers.push(seller3);
        await docs.save();
    })
    res.send("Data Saved")
})
app.get('/seller1', cors(), async function (req, res) {
    await newLaptop.save();
    Laptop.findOne({ "id": 3 }, async function (err, docs) {
        await seller1.save();
        await seller2.save();
        await seller3.save();
        docs.sellers.push(seller1);
        docs.sellers.push(seller2);
        docs.sellers.push(seller3);
        await docs.save();
    })
    res.send("Data Saved")
})
//-------------------




app.get('/', cors(), async function (req, res) {

    Laptop.find({}).populate('sellers').exec(async function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(docs);
        }
    })
})

app.get('/products', cors(), async function (req, res) {
    // await newProduct.save();
    Product.find({}, async function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(docs);
        }
    })
})



app.get('/:id', function (req, res) {
    Laptop.findOne({ "id": req.params.id.toString() }).populate('sellers').exec(async function (err, docs) {
        if (err) {
            console.log("Error id params" + err);

        }
        else {
            res.send(docs);
        }

    })
});





app.listen(process.env.PORT || 5000, function () {
    console.log("Connected To The Server");
})