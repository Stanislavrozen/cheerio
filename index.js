const axios = require("axios");
const cheerio = require("cheerio");

const scrape = async (url) =>
{
    const { data } = await axios.get(url);
    return cheerio.load(data);
}

const colors = [];

const scrapped = scrape("https://htmlcolorcodes.com/color-names/").then((data) =>
{
    data('.color-table__body .color-table__row', '#names').each((idx, el) => 
    {
        colors.push({
            group: data(el).closest('section[id]').prop('id'),
            name: data(el).find('.color-table__cell--hex').text(),
            hex: data(el).find('.color-table__cell--name').text(),
        })
    })
}).then(() => 
{
    console.log(colors.length);

}).catch(err => console.log(err))