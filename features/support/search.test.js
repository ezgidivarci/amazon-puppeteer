const { When, Then, Given, Before, AfterAll } = require("cucumber")
const puppeteer = require("puppeteer")
var { setDefaultTimeout } = require('cucumber');
const { expect } = require("chai");

setDefaultTimeout(60 * 1000);
let browser, page;
Before(async function () {
    browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 10,
        devtools: false,
        args:
            [
                '--start-maximized',
                '--window-size=1920,1080'
            ]
    });
    page = await browser.newPage();
})
Given("User visits amazon website", async function () {
    await page.goto("https://www.amazon.com/")
})

When('User search by product name', async function () {
    let inputSelector = '[type=text]'
    await page.waitForSelector(inputSelector);
    let input = await page.$(inputSelector);
    await input.type('Mobile');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

});

Then('Count the results', async function () {
    let resultXPath = "//span[contains(text(),'results for')]";
    await page.waitForXPath(resultXPath);
    let [resultElement] = await page.$x(resultXPath);
    let result = await page.evaluate(e => e.textContent, resultElement);
    console.log(result);
    expect(result).includes('results for')

});

When('User clears first search from input', async function () {
    let inputSelector = '[type=text]'
    await page.waitForSelector(inputSelector);
    let input = await page.$(inputSelector);
    await input.click({ clickCount: 3 });
    await input.type('Watch');
    //await page.keyboard.press('Enter');
    await page.click('#nav-search-submit-button');
    await page.waitForNavigation();

});
Then('Add a product to the basket', async function () {
    //await page.click('a[href="/gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_1?ie=UTF8&amp;adId=A02949963CGCHVZG8KU6Y&amp;url=%2FDonerton-Smart-Watch%2Fdp%2FB08T75R5C5%2Fref%3Dsr_1_1_sspa%3Fcrid%3D3P6ODID43QF4B%26keywords%3Dwatch%26qid%3D1643582126%26sprefix%3Dwatch%252Caps%252C234%26sr%3D8-1-spons%26psc%3D1&amp;qualifier=1643582126&amp;id=8851887031283416&amp;widgetName=sp_atf"]');
    //await Promise.all([page.waitForNavigation(), page.click('a[href="/gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_1?ie=UTF8&amp;adId=A02949963CGCHVZG8KU6Y&amp;url=%2FDonerton-Smart-Watch%2Fdp%2FB08T75R5C5%2Fref%3Dsr_1_1_sspa%3Fcrid%3D3P6ODID43QF4B%26keywords%3Dwatch%26qid%3D1643582126%26sprefix%3Dwatch%252Caps%252C234%26sr%3D8-1-spons%26psc%3D1&amp;qualifier=1643582126&amp;id=8851887031283416&amp;widgetName=sp_atf"]')]);
    /* let imgSelector = '#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(1) > div > div > div > div > div > div > div.s-product-image-container.aok-relative.s-image-overlay-grey.s-text-center.s-padding-left-small.s-padding-right-small.s-spacing-small.s-height-equalized > span > a > div > img'
    await page.waitForSelector(imgSelector);
    await Promise.all([
        await page.click(imgSelector)
      ]);*/
      await page.waitForSelector('.s-image-square-aspect');
      const products = await page.$$('.s-image-square-aspect');
      await products[2].click();
      await page.click('#add-to-cart-button');  
});

Then('Go to basket screen and check product exists', async function () {
    

});



AfterAll(async () => {
    await browser.close();
});