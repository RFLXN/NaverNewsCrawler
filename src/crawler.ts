import { createCategoryURL, MORE_BUTTON_SELECTOR, NaverNewsCategory } from "./naver-news.js";
import { openURL } from "./browser.js";
import { parseArticle, parseTopicList } from "./parser.js";
import { splitSizedArray } from "./util/array.js";
import initProgress from "./util/progress.js";

async function createTopicHTML(topic: NaverNewsCategory, maxPage: number) {
    const targetURL = createCategoryURL(topic);

    const page = await openURL(targetURL);
    await page.waitForNetworkIdle();

    const moreButton = await page.$(MORE_BUTTON_SELECTOR);

    const progress = initProgress(`Collecting list: ${topic}`);
    progress.start(maxPage, 1);

    for (let i = 0; i < maxPage ; i++) {
        try {
            await Promise.all([
                moreButton?.click(),
                page.waitForNetworkIdle()
            ]);
            progress.update(i+1);
        } catch (e) {
            progress.update(progress.getTotal());
            break;
        }
    }

    progress.stop();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const html = await page.evaluate(() => document.querySelector("*").outerHTML);

    await page.close();

    return html;
}

async function crawlTopic(topic: NaverNewsCategory, maxPage: number) {
    const html = await createTopicHTML(topic, maxPage);
    return parseTopicList(html);
}

export interface ArticleBase {
    title: string,
    author: string,
    date: string,
    content: string
}

export interface Article extends ArticleBase{
    url: string;
}

async function createArticleHTML(url: string) {
    const page = await openURL(url);
    await page.waitForNetworkIdle();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const html = await page.evaluate(() => document.querySelector("*").outerHTML);

    await page.close();

    return html;
}
let current = 0;
let crawlProgress = initProgress("");

async function crawlArticle(url: string) {
    const html = await createArticleHTML(url);
    const article = parseArticle(html);

    current++;
    crawlProgress.update(current);

    return { ...article, url };
}

export async function crawl(topic: NaverNewsCategory, maxPage: number = 1, maxConcurrency = 10) {
    console.log(`Start crawling: ${topic}`);

    console.log(`Collecting article list: ${topic}`);
    const urls = await crawlTopic(topic, maxPage);
    console.log(`Article list collected: ${topic} / ${urls.length} articles`);

    const crawled: Article[] = [];
    const partedUrls: string[][] = splitSizedArray(urls, maxConcurrency);

    console.log(`Collecting article contents: ${topic} / ${urls.length} articles`);
    crawlProgress = initProgress(`Collecting contents: ${topic}`);

    current = 1;
    crawlProgress.start(urls.length, 1);
    for (const partedUrl of partedUrls) {
        const promises = partedUrl.map((url) => {
            return crawlArticle(url);
        });

        const settled = await Promise.allSettled(promises);

        settled.map((s) => {
            if (s.status == "fulfilled") {
                crawled.push(s.value);
            }
        });
    }

    crawlProgress.stop();
    console.log(`Article contents collected: ${topic} / ${urls.length} articles`);

    console.log(`Crawling completed: ${topic} / ${urls.length} articles`);
    return crawled;
}
