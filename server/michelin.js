const axios = require('axios');
const cheerio = require('cheerio');
var fs = require('fs');



// get all the différents pages next we open a stream for each pages we get all the links of the restaurants and then
// for each of theses restaurants we scrap he informations
//
/**
 * 
 */
module.exports.scraping = async function start(){

  tab_restaurants = [];
  tab_link = [];
let page = 1;
for (i = 0; i<16; i++)
{
  tab_link.push(`https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/${page}`);
  page++;
}

for(let page of tab_link){
  tab_link_one_page = await sandbox(page);
  for(link_one_page of tab_link_one_page)
  {
    for(link of link_one_page)
    {
      full_link = "https://guide.michelin.com/"+link;
      info = await scrapeInformationsRes(full_link);
      tab_restaurants.push(info);

      

    }
  }
}
write_in_file(tab_restaurants);

}


async function write_in_file(tab_restaurants){
  var stream = fs.createWriteStream("michelin.json", {flags:'a'});
  json = JSON.stringify(tab_restaurants,null,'\t');
  
  stream.write(json,function(err){
    if(err) return console.error(err);
   });
  stream.end();
}


scrapeInformationsRes = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return informations(data);
  }
  console.error(status);
  return null;
};

const extractImageUrl = cheerioData => cheerioData[0].attribs["data-image"];

/**
 * for each pages get all the data we need put them in a tab and return it
 * @param {Object} data 
 * @return {Array} tab
 */
const informations = data => {
  const $ = cheerio.load(data);
  regex = /[0-9] {0,1}[0-9]{2,} {0,1}[0-9]{2,} {0,1}[0-9]{2,} {0,1}[0-9]{2,}/g;
  const name = $('.section-main h2.restaurant-details__heading--title').text();
  //const experience = $('#experience-section > ul > li:nth-child(2)').text();
  const address = $('.section-main .restaurant-details__heading--list > li:nth-child(1)').text();
  const description = $('.js-show-description-text > p').text();
  
  const image = extractImageUrl($(".masthead__gallery-image-item"));


  telephone = $('.link.js-gtm-link').attr('href');
  telephone = telephone.replace('tel:+33 ',0);
  /*if(telephone)
  {
    telephone = telephone.match(regex);
    telephone ='0' + telephone.toString();
  }*/


  
  const site = $('.link.js-gtm-link:nth-child(2)').attr('href');
  prix = $('.restaurant-details__heading-price').first().text();
  size = prix.length;
  prix = prix.replace(/[\s]{2,}/g," ");
  //var description = $('.section-main .restaurant-details__heading-price').text();
  //description = description.trim();
  //console.log(telephone);

/*
  console.log(name);
  console.log(address);
  //console.log(description);
  console.log(site);
  console.log(prix);
*/
  tab = {"name" : name,"address" : address,"description" : description,"telephone" : telephone,"site" : site,"prix" : prix, "image":image};
  return tab;
};


/**
 * For each page get all the link of the restaurant
 * @param {String} searchLink 
 */
async function sandbox (searchLink) {
  tab_each_page = [];
  try {
    //console.log(`🕵️‍♀️browsing ${searchLink} source`);
    const link = await scrapelink(searchLink);
    tab_each_page.push(link);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  return tab_each_page;
}


/**
 * 
 * @param {String} url 
 */
scrapelink = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return link_each(data);
  }
  console.error(status);
  return null;
};

/**
 * for each page get all the link of the restaurants, put them in a tab and return it
 * @param {Object} data
 * @return {Array} tab
 */
const link_each = data => {
  const $ = cheerio.load(data);
  const tab = [];
  compteur = 0;
  $('.link').each((i,link) => {
    tab.push($(link).attr('href'));
  })
  return tab;
};

