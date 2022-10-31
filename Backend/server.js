const { Laptop, Seller, Product } = require("./Database")
const { priceDecending, priceAscending, sellersPriceLowToHigh, sellersPriceHighToLow, scrapSites, sellersDynamicSearchArray, dynamicSearchArray } = require("./allFunctions")
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")
const scrapeForLaptops = require('./scrapeLaptop.js')
// important to make bodyParser work effieciently
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors());
app.get('/favicon.ico', (req, res) => {
    return '404'
})


scrapSites();


//--------------------


const newProduct2 = {
    name: "MSI Modern 15 A11MU-839XTR Intel Core i5 ",
    imgUrl: "https://productimages.hepsiburada.net/s/139/1500/110000091575803.jpg",
    brand: "ASUS",
    modelNo: "G533ZW-AS94",
    ops: "Free Dos",
    cpuType: "Intel Core i7",
    cpuGen: "11",
    ram: "16 GB",
    diskSize: "1 TB",
    diskType: "SSD",
    screenSize: "15.6 Inches",
    price: "50,000 TL"
}


//-------------------

// Home Routes




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

app.post('/products/search', cors(), async function (req, res) {
    const search = req.body.searchKey;
    console.log("searchKey: " + search)
    Product.find({}).exec(async function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            docs = dynamicSearchArray(docs, search)

            console.log(docs)
            res.send(docs);


        }
    })
})

app.get('/products/priceToLow', cors(), async function (req, res) {
    Product.find({}).exec(async function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {

            docs.sort(priceDecending)
            // console.log(docs)
            res.send(docs);
        }
    })
})

app.get('/products/priceToHigh', cors(), async function (req, res) {
    Product.find({}).exec(async function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            docs.sort(priceAscending)
            // console.log(docs)
            res.send(docs);
        }
    })
})

app.get('/products/:id', cors(), async function (req, res) {
    console.log("Hit")
    Product.findOne({ _id: req.params.id }, async function (err, docs) {
        if (err) {
            console.log("Error id params" + err);

        }
        else {

            res.send(docs);
        }

    })
})

app.post('/adminSearch', async function (req, res) {
    const key = req.body.searchKey;
    console.log("THe key: " + key)
    // First search in the DB if there -> Get -> Update
    // We can Make an Update route
    Product.find({}).exec(async function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            docs = dynamicSearchArray(docs, key)
            if (docs.length !== 0) {
                console.log(docs)
                res.send(docs[0]);
            }
            else {
                const p = await scrapeForLaptops(key)
                res.send(p);
            }
            // console.log(docs)
        }
    })
    // Else : Scrap the websites for this key
    // Send the first match object
    // Hit the publish route


})

app.post('/publish', async function (req, res) {
    const product = req.body;
    console.log("Id: " + product._id)
    // Publish route gets hit in the scraping section 
    const newProduct = new Product(product)
    await newProduct.save()
    // console.log(product);
    res.send("Done")
})

// not working yet
app.post('/update', async function (req, res) {
    const key = req.body;
    // Update route gets hit in the updating product section 
    // 
    console.log(key);
})

app.get('/', cors(), async function (req, res) {

    Laptop.find({}).populate('sellers').exec(async function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            if (docs) {
                for (let doc of docs) {
                    doc.sellers?.sort(priceDecending)
                    // console.log(doc)
                }
            }
            res.send(docs);

        }
    })
})

app.post('/search', cors(), async function (req, res) {
    const search = req.body.searchKey;
    // console.log("searchKey: " + search)

    Laptop.find({}).populate('sellers').exec(async function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            docs = sellersDynamicSearchArray(docs, search)
            for (let doc of docs) {
                doc.sellers?.sort(priceDecending)
                // console.log(doc)
            }
            // console.log(docs)
            res.send(docs);


        }
    })
})

app.get('/priceToLow', cors(), async function (req, res) {
    Laptop.find({}).populate('sellers').exec(async function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            for (let doc of docs) {
                doc.sellers?.sort(priceDecending)
                // console.log(doc)
            }
            docs.sort(sellersPriceHighToLow)
            // console.log(docs)
            res.send(docs);
        }
    })
})

app.get('/priceToHigh', cors(), async function (req, res) {
    Laptop.find({}).populate('sellers').exec(async function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            for (let doc of docs) {
                doc.sellers?.sort(priceDecending)
                // console.log(doc)
            }
            docs.sort(sellersPriceLowToHigh)
            // console.log(docs)
            res.send(docs);
        }
    })
})

app.get('/:id', function (req, res) {
    Laptop.findOne({ _id: req.params.id }).populate('sellers').exec(async function (err, docs) {
        if (err) {
            console.log("Error id params" + err);

        }
        else {
            docs.sellers?.sort(priceDecending)
            console.log(docs)

            res.send(docs);
        }

    })
});





app.listen(5000, function () {
    console.log("Connected To Server :5000");
})
