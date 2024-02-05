export enum NaverNewsCategoryEnum {
    Politics = 100,
    Economy = 101,
    Social = 102,
    LifeOrCulture = 103,
    ITOrScience = 105,
    Global = 104
}

export type NaverNewsCategory = keyof typeof NaverNewsCategoryEnum

function getCategoryKeys() {
    const keys = Object.values(NaverNewsCategoryEnum);
    return keys.filter((key) => typeof key == "string");
}

export const NaverNewsCategoryKeys = getCategoryKeys() as NaverNewsCategory[];

const BASE_URL = "https://news.naver.com/section/";

export function createCategoryURL(category: NaverNewsCategory) {
    return `${BASE_URL}${NaverNewsCategoryEnum[category]}`;
}

export const MORE_BUTTON_SELECTOR = "a.section_more_inner._CONTENT_LIST_LOAD_MORE_BUTTON";
export const ARTICLE_SELECTOR = "a.sa_text_title";


