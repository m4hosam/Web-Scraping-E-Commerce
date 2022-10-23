const puppeteer = require('puppeteer');
const mongoose = require('mongoose')
const { Laptop, Seller } = require("./Database")

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected')
    })
    .catch(er => {
        console.log('connection Error')
    })

async function scrapeN11(modelNo){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`https://www.n11.com/arama?q=${modelNo}`,{timeout: 0})

    let firstLaptopUrl = '';
    let firstLaptopTitle = '';
    await page.evaluate(() => {
        firstLaptopUrl = document.querySelector(".pro a").href
        firstLaptopTitle= document.querySelector(".productName").textContent
    })

    if(firstLaptopTitle.toUpperCase().includes(modelNo.trim())){
        scrapeN11Laptop(firstLaptopUrl)
    }

    browser.close()
} 

async function scrapeN11Laptop(url, modelNo){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url,{timeout: 0})

    const laptop = await page.evaluate(() => {
    
        const attributeNames = Array.from(document.querySelectorAll(".unf-prop-list-item p:nth-child(1)")).map(el => el.textContent)
        const attributeValues = Array.from(document.querySelectorAll(".unf-prop-list-item p:nth-child(2)")).map(el => el.textContent)
        let attributes = {}
        for (let i = 0; i < attributeNames.length; i++) {
            attributes[attributeNames[i]] = attributeValues[i]
        }
        const newObj = {
            imgUrl: document.querySelector(".imgObj img").src,
            brand: attributes["Marka"],
            modelNo: modelNo,
            ops: attributes["İşletim Sistemi"],
            cpuType: attributes["İşlemci"],
            //cpuGen: attributes["İşlemci Nesli"],
            ram: attributes["Bellek Kapasitesi"],
            diskSize: attributes["Disk Kapasitesi"],
            diskType: attributes["Disk Türü"],
            screenSize: attributes["Ekran Boyutu"],
            title: document.querySelector("h1.proName").textContent.trim(),
            price: parseFloat(document.querySelector(".newPrice ins").textContent.split(' ')[0].replace(/\./g,'').replace(',','.'))
        }
        return newObj
    })

    browser.close()

    return new Promise((resolve, reject) => {
        resolve(laptop)
    })
}

async function scrapeTrendyol(modelNo){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`https://www.trendyol.com/sr?q=${modelNo}`,{timeout: 0})
    //takes all results from search and puts them in array
    //DOESNT WORK returning undefined and not printing console.logs written inside
    let firstLaptopUrl = '';
    let firstLaptopTitle = '';
    await page.evaluate(() => {
        firstLaptopUrl = document.querySelector(".p-card-chldrn-cntnr.card-border").firstChild.href
        firstLaptopTitle= document.querySelector(".p-card-chldrn-cntnr.card-border").firstChild.getElementsByClassName("prdct-desc-cntnr-name")[0].textContent
    })

    if(firstLaptopTitle.title?.toUpperCase().includes(modelNo.trim())){
        scrapeTrendyolLaptop(firstLaptopUrl)
    }

    browser.close()
} 

async function scrapeTrendyolLaptop(url, modelNo){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url,{timeout: 0})

    const laptop = await page.evaluate(() => {
    
        const attributeNames = Array.from(document.querySelectorAll(".detail-attr-item span:nth-child(1)")).map(el => el.textContent)
        const attributeValues = Array.from(document.querySelectorAll(".detail-attr-item span b")).map(el => el.textContent)
        let attributes = {}
        for (let i = 0; i < attributeNames.length; i++) {
            attributes[attributeNames[i]] = attributeValues[i]
        }
        //console.log(node)
        //document.querySelector(".prd").querySelector("h3.prd-title").textConten
        const newObj = {
            imgUrl: document.querySelector(".base-product-image img").src,
            brand: document.querySelector(".pr-new-br a").textContent,
            modelNo: modelNo,
            ops: attributes["İşletim Sistemi"],
            cpuType: attributes["İşlemci Tipi"],
            cpuGen: attributes["İşlemci Nesli"],
            ram: attributes["Ram (Sistem Belleği)"],
            diskSize: attributes["SSD Kapasitesi"],
            //diskType: attributes["Disk Türü"],
            screenSize: attributes["Ekran Boyutu"],
            title: document.querySelector(".pr-new-br span").textContent,
            price: parseFloat(document.querySelector(".prc-dsc").textContent.split(' ')[0].replace(/\./g,'').replace(',','.'))
        }
        return newObj
    })

    browser.close()

    return new Promise((resolve, reject) => {
        resolve(laptop)
    })
}

async function scrapeHepsiburada(modelNo){
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: false
    })
    const page = await browser.newPage()
    await page.goto(`https://www.hepsiburada.com/ara?q=${modelNo}`,{timeout: 0})
    //takes all results from search and puts them in array
    //DOESNT WORK returning undefined and not printing console.logs written inside
    let firstLaptopUrl = '';
    let firstLaptopTitle = '';
    await page.evaluate(() => {
        firstLaptopUrl =document.querySelector(".moria-ProductCard-joawUM").firstChild?.href
        firstLaptopTitle= document.querySelector(".moria-ProductCard-joawUM").firstChild?.title
    })

    if(firstLaptopTitle.title?.toUpperCase().includes(modelNo.trim())){
        scrapeHepsiburadaLaptop(firstLaptopUrl)
    }

    browser.close()
} 

async function scrapeHepsiburadaLaptop(url, modelNo){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url,{timeout: 0})

    const laptop = await page.evaluate(() => {
    
        const attributeNames = Array.from(document.querySelectorAll(".data-list.tech-spec th")).map(el => el.textContent)
        const attributeValues = Array.from(document.querySelectorAll(".data-list.tech-spec td span")).map(el => el.textContent)
        let attributes = {}
        for (let i = 0; i < attributeNames.length; i++) {
            attributes[attributeNames[i]] = attributeValues[i]
        }
        //console.log(node)
        //document.querySelector(".prd").querySelector("h3.prd-title").textConten
        const newObj = {
            imgUrl: document.querySelector("img.product-image").src,
            brand: attributes["Marka"],
            modelNo: modelNo,
            ops: attributes["İşletim Sistemi"],
            cpuType: attributes["İşlemci Tipi"],
            cpuGen: attributes["İşlemci Nesli"],
            ram: attributes["Ram (Sistem Belleği)"],
            diskSize: attributes["SSD Kapasitesi"],
            //diskType: attributes["Disk Türü"],
            screenSize: attributes["Ekran Boyutu"],
            title: document.querySelector(".product-name").textContent.trim(),
            price: parseFloat(document.querySelector("[data-bind= \"markupText:'currentPriceBeforePoint'\"]").textContent.split(' ')[0].replace(/\./g,'').replace(',','.'))
        }
        return newObj
    })

    browser.close()

    return new Promise((resolve, reject) => {
        resolve(laptop)
    })
} 

async function scrapeTeknosa(modelNo){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`https://www.teknosa.com/arama/?s=${modelNo}`,{timeout: 0})
    //takes all results from search and puts them in array
    //DOESNT WORK returning undefined and not printing console.logs written inside
    let firstLaptopUrl = '';
    let firstLaptopTitle = '';
    await page.evaluate(() => {
        firstLaptopUrl = document.querySelector(".prd-link").href
        firstLaptopTitle= document.querySelector(".prd").querySelector("h3.prd-title").textContent.trim()
    })

    if(firstLaptopTitle.title?.toUpperCase().includes(modelNo.trim())){
        scrapeTeknosaLaptop(firstLaptopUrl)
    }

    browser.close()
} 

async function scrapeTeknosaLaptop(url, modelNo){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url,{timeout: 0})

    const laptop = await page.evaluate(() => {
    
        const attributeNames = Array.from(document.querySelectorAll(".ptf-body th")).map(el => el.textContent)
        const attributeValues = Array.from(document.querySelectorAll(".ptf-body td")).map(el => el.textContent)
        let attributes = {}
        for (let i = 0; i < attributeNames.length; i++) {
            attributes[attributeNames[i]] = attributeValues[i]
        }
        //console.log(node)
        //document.querySelector(".prd").querySelector("h3.prd-title").textConten
        const newObj = {
            imgUrl: document.querySelector("img.entered.loaded.lazy-loaded").src,
            brand: document.querySelector("h2.name").textContent.split(' ')[0],
            modelNo: modelNo,
            ops: attributes["İşletim Sistemi Yazılımı"],
            cpuType: attributes["İşlemci"],
            cpuGen: attributes["İşlemci Nesli"],
            ram: attributes["Ram"],
            diskSize: attributes["SSD Kapasitesi"],
            diskType: attributes["Disk Türü"],
            screenSize: attributes["Ekran Boyutu"],
            title: document.querySelector("h2.name").textContent,
            price: parseFloat(document.querySelector(".prc.prc-last").textContent.split(' ')[0].replace(/\./g,'').replace(',','.'))
        }
        return newObj
    })

    browser.close()

    return new Promise((resolve, reject) => {
        resolve(laptop)
    })
}

function comparePrices(modelNo){
    const n11 = scrapeN11(modelNo)
    const trendyol = scrapeTrendyol(modelNo)
    const hepsiburada = scrapeHepsiburada(modelNo)
    const teknosa = scrapeTeknosa(modelNo)
    const arr = [n11, trendyol, hepsiburada, teknosa]
    let cheapest = n11

    for(let i=0 ; i < arr.length; i++){
        if(arr[i].price < cheapest.price) cheapest = arr[i]
    }

    //saves cheapest to database
}

const input = prompt("Enter Model Number: ")
comparePrices(input)