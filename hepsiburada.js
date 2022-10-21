//`https://www.trendyol.com/sr?q=${G770.1265-bfj0x-b}`
const puppeteer = require('puppeteer');
const mongoose = require('mongoose')
const { Laptop, Seller } = require("./Database")

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected')
    })
    .catch(er => {
        console.log('connection Error')
    });


//gets all model number from database
async function getModelNumbers(){

    var array=[];
    const app = await Laptop.find({}).exec();

    app.forEach((laptop) => {

        if(laptop.modelNo){
            array.push(laptop.modelNo.toUpperCase())
        }
    })
    console.log("got model numbers")
    return new Promise((resolve,reject) => {
        resolve(array)
    })
}

//finds best laptop with provided model number
async function scrapePage(url, modelNo){
    
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url,{timeout: 0})

    const bestLaptop = await page.evaluate(() => {
    
        const node = document.querySelector(".moria-ProductCard-joawUM")
        //console.log(node)
        const newObj = {
            title: node.firstChild.title,
            url: node.firstChild.href,
            price: node.firstChild.getElementsByClassName("moria-ProductCard-exfLof")[0].textContent
        }
        return newObj
    })
    console.log(bestLaptop)

    if(bestLaptop.title?.toUpperCase().includes(modelNo.trim())){
        const seller = new Seller({
            productUrl: bestLaptop.url,
            price: bestLaptop.price,
            seller: "hepsiburada"
        })
    
        Laptop.findOne({ "modelNo": modelNo }, async function (err, docs) {
            await seller.save();
            docs.sellers.push(seller);
            await docs.save();
            console.log(docs)
        })
    }
    
    browser.close()
    
}


async function hepsiburada(){

    const laptopModelNumbers = await getModelNumbers()
    
    for(modelNo of laptopModelNumbers){
        
        console.log(modelNo)
        const modelNoInLink = modelNo.trim().replace(/ /g,'-')
        //console.log(`https://www.hepsiburada.com/ara?q=${modelNoInLink}`)
        //searches for model number in trendyol
        //console.log(`https://www.hepsiburada.com/ara?q=${modelNo}`)
        await scrapePage(`https://www.hepsiburada.com/ara?q=${modelNoInLink}`, modelNo)

    }
}

hepsiburada()