const puppeteer = require("puppeteer-core");


async function runWebThing() {
    const ChromeLauncher = await import("chrome-launcher");
    const chrome = await ChromeLauncher.launch({
    startingUrl: "google.com",
    })
    console.log(`Chrome debuggingport running on ${chrome.port}`);

    const browserUrl = `http://localhost:${chrome.port}/json/version`;

    const res = await fetch(browserUrl);
    const data = await res.json();

    const browser = await puppeteer.connect({
        browserWSEndpoint: data.webSocketDebuggerUrl
    });
    let [page] = await browser.pages();
    if (!page) page = await browser.newPage();

    await page.goto("https://www.fedex.com/en-us/home.html", {waitUntil: "domcontentloaded"});
    await page.waitForSelector("#trackingnumber");
    await page.type("#trackingnumber", "this is sparta", {delay:100});
    // await page.click("#HomeTrackingApp button");

}

module.exports = {runWebThing}