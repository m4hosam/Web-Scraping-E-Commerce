//`https://www.trendyol.com/sr?q=${G770.1265-bfj0x-b}`
const puppeteer = require('puppeteer');
const mongoose = require('mongoose')
const { Laptop, Seller } = require("./Database")

var dbURL = "mongodb://localhost:27017/test";

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
    //takes all results from search and puts them in array
    //DOESNT WORK returning undefined and not printing console.logs written inside
    
    const bestLaptop = await page.evaluate(() => {
    
        const node = document.querySelector(".prd")
        console.log(node)
        //document.querySelector(".prd").querySelector("h3.prd-title").textConten
        const newObj = {
            title: node.querySelector("h3.prd-title").textContent.trim(),
            url: node.querySelector(".prd-link").href,
            price: node.querySelector(".prc.prc-last").textContent.trim()
        }
        return newObj
    })

    //console.log(bestLaptop)
    if(bestLaptop.title?.toUpperCase().includes(modelNo.trim())){
        const seller = new Seller({
            productUrl: bestLaptop.url,
            price: bestLaptop.price,
            seller: "teknosa"
        })
    
        Laptop.findOne({ "modelNo": modelNo }, async function (err, docs) {

            //checks if laptop already has a sellers from the website (still working on it)
            const hasSeller = docs.sellers.forEach( seller => {
                    let bool
                    Seller.findOne({"_id": seller}, async function(err, docs){
                        console.log(docs.seller)
                        if(docs.seller === "teknosa") bool = true
                    })

                    console.log(bool)
                    return bool
                }
            )


            //console.log(hasSeller)
            //if no seller from trendyol, saves seller to laptop
            if(!hasSeller){
                await seller.save();
                docs.sellers.push(seller);
                await docs.save();
                console.log(docs)
            }
        })
    }
    
    browser.close()
    
}


async function teknosa(){

    const laptopModelNumbers = await getModelNumbers()
    
    for(modelNo of laptopModelNumbers){
        
        console.log(modelNo)
        const modelNoInLink = modelNo.trim().replace(/ /g,'-')
        //searches for model number in trendyol
        await scrapePage(`https://www.teknosa.com/arama/?s=${modelNo}`, modelNo)

    }
}

teknosa()