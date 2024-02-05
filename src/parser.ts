import { load } from "cheerio";
import { ARTICLE_SELECTOR } from "./naver-news.js";
import removeDuplicatedSpace from "./util/duplicate-space.js";
import { ArticleBase } from "./crawler.js";

function $(html: string) {
    return load(html);
}

export function parseTopicList(html: string) {
    const $page = $(html);
    const $articles = $page(ARTICLE_SELECTOR);

    const urls: string[] = [];

    $articles.map((i, article) => {
        urls.push(article.attribs.href.toString());
    });

    return urls;
}

export function parseArticle(html: string) {
    const $page = $(html);
    $page("em.img_desc").remove();
    $page("table.nbd_table").remove();
    $page("div.vod_player_wrap._VIDEO_AREA_WRAP").remove();

    const $articleTitleWrapper = $page("h2.media_end_head_headline");
    const $articleTitle = $articleTitleWrapper.children("span");
    const title = $articleTitle.contents().text();

    const $articleAuthor = $page("em.media_end_head_journalist_name");
    const author = $articleAuthor.contents().text().replaceAll(" 기자", "");

    const $articleDate = $page("span.media_end_head_info_datestamp_time._ARTICLE_DATE_TIME");
    const date = $articleDate.contents().text();

    const $articleContent = $page("article._article_content");

    const content = removeDuplicatedSpace($articleContent.contents().text());

    return { title, author, date, content } as ArticleBase;

}
