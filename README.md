# Naver News Crawler

## Prerequisites

* Install Node.js
* Install Yarn

## How to run

1. Install dependencies (`yarn install`)
2. Set configs in `src/main.ts`

| Key             | Value    | Describe                             | Example                 |
|-----------------|----------|--------------------------------------|-------------------------|
| CATEGORIES      | string[] | Naver news categories                | ["Politics", "Economy"] |
| MAX_PAGE        | number   | Maximum page of category             | 100                     |
| MAX_CONCURRENCY | number   | Number of concurrent crawling runner | 10                      |

> Key `CATEGORIES` must be an array of this values
> * Politics (정치)
> * Economy (경제)
> * Social (사회)
> * LifeOrCulture (생활/문화)
> * ITOrScience (IT/과학)
> * Global (세계)


3. Run script (`yarn run start`)
