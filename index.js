const request = require('request-promise');
const cheerio = require('cheerio');

const start = async () => {
    const SUBREDIT = 'science';
    const BASE_URL = `https://old.reddit.com/r/${SUBREDIT}/`;

    let response = await request(
        BASE_URL,
        {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
            'cache-control': 'max-age=0',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
        }
    );
    
    let $ = cheerio.load(response);

    let posts = [];

    $('#siteTable > .thing').each((i, elm) => {
        let score = {
            upvotes: $(elm).find('.score.unvoted').text().trim(),
            likes: $(elm).find('.score.likes').text().trim(),
            dislikes: $(elm).find('.score.dislikes').text().trim(),
        }

        let title = $(elm).find('.title').text().trim();
        let comments = $(elm).find('.comments').text().trim();
        let time = $(elm).find('.tagline > time').attr('title').trim();
        let author = $(elm).find('.tagline > .author').text().trim();

        posts.push({
            title,
            comments,
            score,
            time,
            author
        });
    })

    console.log(posts);

}

start();