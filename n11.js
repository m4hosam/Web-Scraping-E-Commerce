const puppeteer = require('puppeteer');
const mongoose = require('mongoose')
const { Laptop, Seller } = require("./Database")


//laptop attributes as written in n11 description
const attributes = ['Marka', 'Model', 'İşletim Sistemi', 'İşlemci', 'Bellek Kapasitesi', 'Disk Kapasitesi', 'Disk türü', 'Ekran Boyutu', 'Price', 'Website', 'img', 'title']

//gets all the laptops' urls that are present in a page and returns
async function scrapePage(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { timeout: 0 });

    const laptopUrls = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".plink")).map(x => x.getAttribute('href'));
    })

    browser.close();
    return new Promise((resolve, reject) => {
        resolve(laptopUrls)
    });
}

async function scrapeLaptop(url, num) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { timeout: 0 });
    const doc = {}


    //gets list of attributes displayed about the laptop (ex. "ram", "disk type")
    const attributeListTitle = await page.evaluate(() => {
        const list = Array.from(document.querySelectorAll(".unf-prop-list-title"), el => (el = el.textContent))
        list.push("Price")
        list.push("Website")
        list.push("img")
        list.push("title")
        return list
    })

    //gets the value of the attributes displayed (ex. "16Gb", "SSD")
    const attributeListProp = await page.evaluate(() => {
        const list = Array.from(document.querySelectorAll(".unf-prop-list-prop"), el => (el = el.textContent))
        list.push(document.querySelector("#unf-p-id > div > div:nth-child(2) > div.unf-p-cvr > div.unf-p-left > div > div.unf-p-detail > div.unf-price-cover > div.price-cover > div.price > div > div > div > ins").textContent)
        list.push("n11")
        list.push(document.querySelector(".imgObj > a").href)
        list.push(document.querySelector(".proName").textContent.trim())
        console.log(list)
        return list
    })


    //filters the attributes and only takes the ones needed in listItem
    attributeListTitle.forEach((listItem, i = 0) => {
        if (attributes.indexOf(listItem) >= 0) {
            doc[listItem] = attributeListProp[i]
        }
        i++
    })

    //supposed to check if laptop has model number or not, if no model number, doesnt save laptop to database
    //doesnt work yet
    // if(!doc.hasOwnProperty("Model")){
    //     return
    // }

    const seller = new Seller({
        id: num,
        productUrl: url,
        price: doc["Price"],
        seller: "n11"
    })

    const laptop = new Laptop({
        id: num,
        brand: doc["Marka"],
        name: doc["title"],
        imgUrl: doc["img"],
        modelNo: doc["Model"],
        ops: doc["İşletim Sistemi"],
        cpuType: doc["İşlemci"],
        ram: doc["Bellek Kapasitesi"],
        diskSize: doc["Disk Kapasitesi"],
        diskType: doc["Disk türü"],
        screenSize: doc["Ekran Boyutu"],
        sellers: []
    })

    await laptop.save()


    //saves to database
    Laptop.findOne({ "id": num }, async function (err, docs) {
        await seller.save();
        docs.sellers.push(seller);
        await docs.save();
        console.log("Loaded Count: " + num)
    })

    browser.close();
}

//gets every laptop url in n11 in 9 pages





exports.scrapePage = scrapePage;
exports.scrapeLaptop = scrapeLaptop;