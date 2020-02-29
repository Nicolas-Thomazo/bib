const axios = require('axios');
const cheerio = require('cheerio');
var fs = require('fs');


/**
 * We go through all the page of the website maitre restaurateur and for each page we call the fonction scrap_informations and then write_in_file  
 */
module.exports.scraping = async function get_all_pages(){
  tab_restaurants = [];
  for(page = 1; page < 156; page++)
  {
   options = {
    'url' : 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult',
    'method' : 'post',
    'headers' : {'content-type':'application/x-www-form-urlencoded'},
    'data': `page=${page}&sort=undefined&request_id=a490edcdefedc3f57a695ce1a363969f&annuaire_mode=&annuaire_action=&annuaire_action_arg=&annuaire_appli=&annuaire_as_no=`//querystring.stringify(playload)
  }
  const response = await axios(options);
  const {data, status} = response;
  if (status >= 200 && status < 300) {
    scrap_informations(data,tab_restaurants);
  }
}
tab_restaurants.forEach(restaurant => {
  /*console.log(restaurant.name);
  console.log(restaurant.phone);
  console.log(restaurant.address);
  console.log("\n");*/
});

write_in_file(tab_restaurants);
}

/**
 * For each page scrape the informations of the 10 restaurants in the current page
 * @param {Object} data 
 */
async function scrap_informations(data, tab_restaurants){
  const $ = cheerio.load(data);
  regex_name = /\((\w|\s)+\)/;
  tab_name = [];
  $('.single_libel a').each((index,value) => {
     temp = $(value).text();
     temp = temp.trim();
     //temp = temp.replace(regex_name,'');
     if(!temp)
    {
      tab_name.push('pas definit');
    }
    else
    {
      tab_name.push(temp);
    }
  });
  
  regex = /[0-9]{2,} {0,1}[0-9]{2,} {0,1}[0-9]{2,} {0,1}[0-9]{2,} {0,1}[0-9]{2,}/g;
  phone_tab = [];
  $('.single_info3').each((index,value) => {
    temp = $(value).text();
    temp = temp.match(regex);

    if(!temp)
    {
      phone_tab.push('pas definit');
    }
    else
    {
      temp_tostring = temp.toString();
      phone_tab.push(temp_tostring);
    }
    
  });
  
  tab_address = []
  $('.single_info3').each((index,value) => {
    
    temp = $(value).text();

    regex2 = /\n/g;
    regex3= / {2,}/g;
    regex4 = / /;
    temp = temp.replace(regex,'');
    temp = temp.replace(regex2,' ');
    temp = temp.trim();
    temp = temp.replace(regex3,' ');


    if(!temp)
    {
      tab_address.push('pas definit');
    }
    else
    {
      tab_address.push(temp);
    }
 });
  
  for(i = 0; i <10; i++)
  {
    restau = {"name": tab_name[i], "address":tab_address[i],"phone":phone_tab[i]};
    tab_restaurants.push(restau);
  }

 /*
  tab_address.forEach(address =>{
  console.log(address);
  });
  
  console.log("\n\n");
  tab_name.forEach(name =>{
    console.log(name);
  });
  console.log('\n\n');
  
  phone_tab.forEach(phone =>{
    console.log(phone);
  });*/
}


/**
 * get the array of all the restaurant and write them in a json file 
 * @param {Array} tab_restaurants 
 */
async function write_in_file(tab_restaurants){
  var stream = fs.createWriteStream("maitre.json", {flags:'a'});
  json = JSON.stringify(tab_restaurants,null,'\t');
  
  stream.write(json,function(err){
    if(err) return console.error(err);
   });
  stream.end();
}


