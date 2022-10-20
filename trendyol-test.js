//`https://www.trendyol.com/sr?q=${G770.1265-bfj0x-b}`
const puppeteer = require('puppeteer');
const mongoose = require('mongoose')
const { Laptop, Seller } = require("./Database")
var MongoClient = require('mongodb').MongoClient;

var dbURL = "mongodb://localhost:27017/test";

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected')
    })
    .catch(er => {
        console.log('connection Error')
    });


//gets all model number from database
async function getModelNumbers() {

    var array = [];
    const app = await Laptop.find({}).exec();

    app.forEach((laptop) => {

        if (laptop.modelNo) {
            array.push(laptop.modelNo.toUpperCase().trim().replace(/ /g, '-'))
        }
    })
    console.log(array)
    return new Promise((resolve, reject) => {
        resolve(array)
    })
}

//finds best laptop with provided model number
async function scrapePage(url, modelNo) {

    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto(url, { timeout: 0 });

    //takes all results from search and puts them in array
    //DOESNT WORK returning undefined and not printing console.logs written inside
    const laptopCardsWeb = await page.evaluate(() => {
        //console.log(document.querySelector(".p-card-chldrn-cntnr.card-border"), el => el)

        const list = (document.querySelectorAll(".p-card-chldrn-cntnr.card-border > a")[0].getAttribute('href'))

        // console.log(list)
        return list
    })

    console.log("https://www.trendyol.com" + laptopCardsWeb)
    // What to do is :
    // get the first element 
    //  search od the model number in the product name 
    // if not there don't consider it

    /**
     * TO DO:
     * filter objects in obj array based on if they contain model number in title or not
     * searches for the cheapest laptop in array
     * saves it to database
     */
    browser.close()

}

//will most likely not be used anymore, old function
async function scrapeLaptop(laptopUrl, modelNo, browser) {

    console.log(laptopUrl)
    const page = await browser.newPage();
    await page.goto(laptopUrl, { timeout: 0 })

    const laptopTitle = await page.evaluate(() => {
        return document.querySelector(".pr-new-br > span").textContent.toUpperCase()
    })

    const laptopPrice = await page.evaluate(() => {
        return document.querySelector(".prc-dsc").textContent
    })

    const seller = new Seller({
        productUrl: laptopUrl,
        price: laptopPrice,
        seller: "trendyol"
    })

    if (laptopTitle.includes(modelNo)) {
        await Laptop.findOne({ "modelNo": modelNo }, async function (err, docs) {
            await seller.save();
            docs.sellers.push(seller);
            await docs.save();
            console.log(docs)
        })
    }

    page.close()

}

async function trendyol() {

    const laptopModelNumbers = await getModelNumbers()

    for (modelNo of laptopModelNumbers) {

        console.log(modelNo)
        //searches for model number in trendyol
        await scrapePage(`https://www.trendyol.com/sr?q=${modelNo}`, modelNo)

    }

}

trendyol()