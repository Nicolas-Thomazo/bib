var fs = require('fs');




module.exports.get_common = async function get_common_restaurant(){
    let fichier_bib = fs.readFileSync('michelin.json');
    let restaurants_bib = JSON.parse(fichier_bib);
    
    let fichier_maitre = fs.readFileSync('maitre.json');
    let restaurants_maitre = JSON.parse(fichier_maitre);

    restaurant_common = []
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

      write_in_file(restaurant_common);
 }

  async function write_in_file(tab_restaurants){
    var stream = fs.createWriteStream("common.json", {flags:'a'});
    json = JSON.stringify(tab_restaurants,null,'\t');
    
    stream.write(json,function(err){
      if(err) return console.error(err);
     });
    stream.end();
  }

/*
  <div>
      <h2>
        Voici la liste des restaurants appartenant à la fois au site maitre restaurateur et à celui bib gourmand de michelin
      </h2>
      <form>
        <input type = "text" placeholder = "Renseigner un restaurant"/>
        <button>Chercher</button>
      </form>
      <text>          
        {restaurant.map((res,index) => {
            return <div>
            <h2>{res.name}</h2>
            <h3>{res.address}</h3>
            <h3>{res.telephone}</h3>
            </div>
          })}
      </text>
    </div>*/