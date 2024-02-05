import { destroy, init } from "./browser.js";
import { NaverNewsCategory, NaverNewsCategoryKeys } from "./naver-news.js";
import { crawl } from "./crawler.js";
import save from "./save.js";

const ALL_CATEGORIES: NaverNewsCategory[] = NaverNewsCategoryKeys;

const CATEGORIES: NaverNewsCategory[] = ALL_CATEGORIES      // News category
const MAX_PAGE: number = 500;                               // Max page
const MAX_CONCURRENCY: number = 10;                         // Number of concurrent parser/crawler


await init();

for (const topic of CATEGORIES) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const currentCrawled = await crawl(topic, MAX_PAGE, MAX_CONCURRENCY);
    await save(`./${topic}.json`, JSON.stringify(currentCrawled));
}

process.on("exit", async () => {
    // Destroy browser instance before application exit.
    await destroy();
});

process.exit();
