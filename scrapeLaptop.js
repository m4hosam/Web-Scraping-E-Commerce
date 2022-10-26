const puppeteer = require('puppeteer');
const mongoose = require('mongoose')
const { Product } = require("./Database")

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
    console.log(`https://www.n11.com/arama?q=${modelNo}`)
    
    const laptopArray = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".pro a")).map(el=>el.href)
        
    })

    let matchLaptop;

    for (let i = 0; i < 5; i++) {
        console.log(laptopArray[i])
        if(laptopArray[i].toUpperCase().includes(modelNo.replace(/-/g,'').replace(/./g,''))){
            matchLaptop = laptopArray[i]
            break
        }
    }

    browser.close()

    const laptop = await scrapeN11Laptop(matchLaptop, modelNo)
    console.log("1")
    return new Promise((resolve, reject) => {
        resolve(laptop)
    })
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
            attributes[`${attributeNames[i]}`] = attributeValues[i]
        }

        const newObj = {
            name: document.querySelector("h1.proName").textContent.trim(),
            imgUrl: document.querySelector(".imgObj img").src,
            brand: attributes["Marka"],
            //modelNo: modelNo,
            ops: attributes["İşletim Sistemi"],
            cpuType: attributes["İşlemci"],
            //cpuGen: attributes["İşlemci Nesli"],
            ram: attributes["Bellek Kapasitesi"],
            diskSize: attributes["Disk Kapasitesi"],
            diskType: attributes["Disk Türü"],
            screenSize: attributes["Ekran Boyutu"],
            price: parseFloat(document.querySelector(".newPrice ins").textContent.split(' ')[0].replace(/\./g,'').replace(',','.')),
            score: document.querySelector(".ratingScore").textContent
        }
        return newObj
    })
    laptop["modelNo"] = modelNo

    browser.close()

    return new Promise((resolve, reject) => {
        resolve(laptop)
    })
}

async function scrapeTrendyol(modelNo){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`https://www.trendyol.com/sr?q=${modelNo}`,{timeout: 0})
    
    const laptopArray = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".p-card-chldrn-cntnr.card-border")).map(el => el.firstChild.href)
    })

    let matchLaptop;

    for (let i = 0; i < 5; i++) {
        console.log(laptopArray[i])
        if(laptopArray[i].toUpperCase().includes(modelNo.replace(/-/g,'').replace(/./g,''))){
            matchLaptop = laptopArray[i]
            break
        }
    }

    browser.close()

    const laptop = await scrapeTrendyolLaptop(matchLaptop, modelNo)

    return new Promise((resolve, reject) => {
        resolve(laptop)
    })
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

        const newObj = {
            title: document.querySelector(".pr-new-br span").textContent,
            imgUrl: document.querySelector(".base-product-image img").src,
            brand: document.querySelector(".pr-new-br a").textContent,
            ops: attributes["İşletim Sistemi"],
            cpuType: attributes["İşlemci Tipi"],
            cpuGen: attributes["İşlemci Nesli"],
            ram: attributes["Ram (Sistem Belleği)"],
            diskSize: attributes["SSD Kapasitesi"],
            screenSize: attributes["Ekran Boyutu"],
            price: parseFloat(document.querySelector(".prc-dsc").textContent.split(' ')[0].replace(/\./g,'').replace(',','.')),
            score: document.querySelector(".tltp-avg-cnt").textContent.trim()
        }
        //console.log(newObj)
        return newObj
    })
    laptop["modelNo"] = modelNo

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
    
    const laptopArray = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".moria-ProductCard-joawUM")).map(el=>el.firstChild.href)
        
    })

    let matchLaptop;

    for (let i = 0; i < 5; i++) {
        console.log(laptopArray[i])
        if(laptopArray[i].toUpperCase().includes(modelNo.replace(/-/g,'').replace(/./g,''))){
            matchLaptop = laptopArray[i]
            break
        }
    }
    
    browser.close()
    const laptop = await scrapeHepsiburadaLaptop(matchLaptop, modelNo)

    return new Promise((resolve, reject) => {
        resolve(laptop)
    })

    
} 

async function scrapeHepsiburadaLaptop(url, modelNo){
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: false
    })
    const page = await browser.newPage()
    await page.goto(url,{timeout: 0})
    const laptop = await page.evaluate(() => {
    
        const attributeNames = Array.from(document.querySelectorAll(".data-list.tech-spec th")).map(el => el.textContent)
        const attributeValues = Array.from(document.querySelectorAll(".data-list.tech-spec tr td :nth-child(1)")).map(el => el.textContent.trim())
        let attributes = {}
        for (let i = 1; i < attributeNames.length; i++) {
            attributes[attributeNames[i]] = attributeValues[i]
        }

        const newObj = {
            name: document.querySelector(".product-name").textContent.trim(),
            imgUrl: document.querySelector("img.product-image").src,
            brand: Array.from(document.querySelectorAll(".data-list.tech-spec td a"))[0].textContent,
            ops: attributes["İşletim Sistemi"],
            cpuType: attributes["İşlemci Tipi"],
            cpuGen: attributes["İşlemci Nesli"],
            ram: attributes["Ram (Sistem Belleği)"],
            diskSize: attributes["SSD Kapasitesi"],
            screenSize: attributes["Ekran Boyutu"],
            price: parseFloat(document.querySelector("[data-bind= \"markupText:'currentPriceBeforePoint'\"]").textContent.split(' ')[0].replace(/\./g,'').replace(',','.')),
            score: document.querySelector(".rating-star").textContent.trim()
        }
        return newObj
    })
    laptop["modelNo"] = modelNo

    browser.close()

    return new Promise((resolve, reject) => {
        resolve(laptop)
    })
} 

async function scrapeTeknosa(modelNo){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`https://www.teknosa.com/arama/?s=${modelNo}`,{timeout: 0})

    const laptopArray = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".prd-link")).map(el => el.href)
        
    })

    let matchLaptop;

    for (let i = 0; i < 5; i++) {
        // console.log(laptopArray[i])
        if(laptopArray[i].toUpperCase().includes(modelNo.replace(/-/g,'').replace(/./g,''))){
            matchLaptop = laptopArray[i]
            break
        }
    }
    
    //if(!matchLaptop) return "laptop not found"
    console.log(matchLaptop)
    browser.close()

    if(matchLaptop){
        const laptop = await scrapeTeknosaLaptop(matchLaptop, modelNo)

        return new Promise((resolve, reject) => {
            resolve(laptop)
        })
    }
    return "laptop not found"
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
            name: document.querySelector("h2.name").textContent,
            //imgUrl: document.querySelector("img.entered.loaded.lazy-loaded").src,
            brand: document.querySelector("h2.name").textContent.split(' ')[0],
            //modelNo: modelNo,
            ops: attributes["İşletim Sistemi Yazılımı"],
            cpuType: attributes["İşlemci"],
            //cpuGen: attributes["İşlemci Nesli"],
            ram: attributes["Ram"],
            diskSize: attributes["SSD Kapasitesi"],
            diskType: attributes["Disk Türü"],
            screenSize: attributes["Ekran Boyutu"],
            price: parseFloat(document.querySelector(".prc.prc-last").textContent.split(' ')[0].replace(/\./g,'').replace(',','.'))
        }
        return newObj
    })
    laptop["modelNo"] = modelNo

    browser.close()

    return new Promise((resolve, reject) => {
        resolve(laptop)
    })
}

async function srapeForLaptops(modelNo){


    const n11 = await scrapeN11(modelNo)
    const trendyol = await scrapeTrendyol(modelNo)
    const hepsiburada = await scrapeHepsiburada(modelNo)
    const teknosa = await scrapeTeknosa(modelNo)

    hepsiburada["diskType"] = n11["diskType"]
    trendyol["diskType"] = n11["diskType"]

    teknosa["cpuGen"] = trendyol["cpuGen"]
    n11["cpuGen"] = trendyol["cpuGen"]
    hepsiburada["cpuGen"] = trendyol["cpuGen"]
    
    const arr = [n11, trendyol, hepsiburada, teknosa]
    let cheapest = n11

    console.log(n11)
    console.log(trendyol)
    console.log(hepsiburada)
    console.log(teknosa)
    for(let i=0 ; i < arr.length; i++){
        if(arr[i].price < cheapest.price) cheapest = arr[i]
    }

    console.log(cheapest)


}



module.exports = srapeForLaptops();


//srapeForLaptops("82H802F7TX")
