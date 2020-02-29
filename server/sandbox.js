/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const maitre = require('./maitre');

var fs = require('fs');

//This to scrap all the elements from the website and put them in 2 different files
//michelin.scraping();
//maitre.scraping();


restaurant_common = [];

let fichier_bib = fs.readFileSync('michelin.json');
  let restaurants_bib = JSON.parse(fichier_bib);
  


  let fichier_maitre = fs.readFileSync('maitre.json');
  let restaurants_maitre = JSON.parse(fichier_maitre);

/*
  compteur_michelin = 0;
  restaurants_bib.forEach(restaurant => {
    compteur_michelin++;
  });
  console.log("Il y a " + compteur_michelin + " restaurants dans michelin");
  
  compteur_maitre = 0;
  restaurants_maitre.forEach(restaurant => {
    compteur_maitre++;
  });
  console.log("Il y a " + compteur_maitre + " restaurants dans maitre");
*/

  
  restaurants_bib.forEach(restaurant_bib => {
    restaurants_maitre.forEach(restaurant_maitre => {
      if(restaurant_bib.telephone == restaurant_maitre.phone)
      {
        restaurant_common.push(restaurant_bib);
      }
    });
  });

  count_common = 0;
  restaurant_common.forEach(restaurant => {
    //console.log(restaurant.description);
    count_common++;
  });
  console.log(count_common);

