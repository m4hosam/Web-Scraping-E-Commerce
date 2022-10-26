const n11 = require('./n11')
const trendyol = require('./trendyol')
const teknosa = require('./teknosa')
const hepsiburada = require('./hepsiburada')



function priceDecending(a, b) {
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

function priceAscending(a, b) {
    let price1 = a.price.replace('TL', '')
    price1 = parseFloat(price1)
    let price2 = b.price.replace('TL', '')
    price2 = parseFloat(price2)
    if (price1 < price2) {
        return 1;
    }
    if (price2 < price1) {
        return -1;
    }
    return 0;
}

function sellersPriceLowToHigh(a, b) {
    let price1 = a.sellers[0].price.replace('TL', '')
    price1 = parseFloat(price1)
    let price2 = b.sellers[0].price.replace('TL', '')
    price2 = parseFloat(price2)
    if (price1 < price2) {
        return -1;
    }
    if (price2 < price1) {
        return 1;
    }
    return 0;
}
function sellersPriceHighToLow(a, b) {
    let price1 = a.sellers[0].price.replace('TL', '')
    price1 = parseFloat(price1)
    let price2 = b.sellers[0].price.replace('TL', '')
    price2 = parseFloat(price2)
    if (price1 < price2) {
        return 1;
    }
    if (price2 < price1) {
        return -1;
    }
    return 0;
}

function sellersDynamicSearchArray(arr, word) {
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
    }

    const items = arr.filter(data);
    return items;
}



// scraping part
async function scrapSites() {
    // limit n11 to one page scraping
    await n11(7);
    await trendyol();
    await hepsiburada();
    await teknosa()
}


exports.priceDecending = priceDecending
exports.priceAscending = priceAscending
exports.sellersPriceLowToHigh = sellersPriceLowToHigh
exports.sellersPricesHighToLow = sellersPriceHighToLow
exports.scrapSites = scrapSites
exports.sellersDynamicSearchArray = sellersDynamicSearchArray
exports.dynamicSearchArray = dynamicSearchArray