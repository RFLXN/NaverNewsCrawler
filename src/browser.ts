import { Browser, launch } from "puppeteer";

let browser: Browser;

async function init() {
    browser = await launch();
    return browser;
}

async function destroy() {
    if (typeof browser != "undefined") {
        await browser.close();
    }
}

async function openURL(url: string) {
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: "domcontentloaded" });
    return page;
}


export { init, destroy, openURL };
