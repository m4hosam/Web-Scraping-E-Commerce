const { Laptop, Seller, Product } = require("./Database")
const n11 = require('./n11')
const trendyol = require('./trendyol')
const teknosa = require('./teknosa')
const hepsiburada = require('./hepsiburada')
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

function compare(a, b) {
    let price1 = a.price.replace('TL', '')
    price1 = parseFloat(price1)
    let price2 = b.price.replace('TL', '')
    price2 = parseFloat(price2)
    if (price1 < price2) {
        return -1;
    }
    if (price2 < price1) {
        return 1;
    }
    return 0;
}


// scraping part
async function scrapSites() {
    // limit n11 to one page scraping
    await n11(7);
    await trendyol();
    await hepsiburada();
    await teknosa()
}

// scrapSites();


function dynamicSearchArray(arr, word) {
    word = word.toLowerCase().replaceAll(' ', '')
    function data(item) {
        let name = item.name.toLowerCase().replaceAll(' ', '')
        let model = item.modelNo.toLowerCase().replaceAll(' ', '')
        if (name.includes(word)) {
            return true;
        }
        else if (model.includes(word)) {
            return true;
        }
        else if (item.sellers?.find(o => o.seller.includes(word) === true)) {
            return true;
        }
    }

    const items = arr.filter(data);
    return items;
}



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




app.get('/', cors(), async function (req, res) {

    Laptop.find({}).populate('sellers').exec(async function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            if (docs) {
                for (let doc of docs) {
                    doc.sellers?.sort(compare)
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
            docs = dynamicSearchArray(docs, search)
            for (let doc of docs) {
                doc.sellers?.sort(compare)
                // console.log(doc)
            }
            // console.log(docs)
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

app.get('/products/:id', cors(), async function (req, res) {

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
    // First search in the DB if there -> Get -> Update
    // We can Make an Update route
    // Else : Scrap the websites for this key
    // Send the first match object
    // Hit the publish route
    console.log("THe key: ")
    console.log(key);


    res.send(newProduct2);
})

app.post('/publish', async function (req, res) {
    const product = req.body;
    console.log("Id: " + product._id)
    // Publish route gets hit in the scraping section 
    const newProduct = new Product(product)
    await newProduct.save()
    console.log(product);
})

app.post('/update', async function (req, res) {
    const key = req.body;
    // Update route gets hit in the updating product section 
    // 
    console.log(key);
})



app.get('/:id', function (req, res) {
    Laptop.findOne({ _id: req.params.id }).populate('sellers').exec(async function (err, docs) {
        if (err) {
            console.log("Error id params" + err);

        }
        else {
            docs.sellers?.sort(compare)
            console.log(docs)

            res.send(docs);
        }

    })
});





app.listen(5000, function () {
    console.log("Connected To Server :5000");
})