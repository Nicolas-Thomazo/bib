import React/*, { useState }*/ from 'react';
import './App.css';
import restaurant from './common.json';

function App() {
  //const [count, setCount] = useState(0);
  //const [password, setPassword] = useState('');
      /*<input  placeholder = "Renseigner un restaurant" onChange={event => setPassword(event.target.value)} />
       <button className="btn btn-outline-dark" onClick={() => setCount(count + 1)}>
        Chercher
      </button>*/

  return (
    <div className = "container-fluid">
      <div className = "App-header row">
        <h2>
          Restaurants
        </h2>
      </div>
      <br />
      <br />
     
        
      

      <div>
        <ul className="list-group list-group-flush">          
          {restaurant.map((res,index) => {
              return <li className="list-group-item">
                
                <row>
                  <nom className = "name">
                    {index+1} - {res.name} 
                  </nom>
                  <ad className = "tel">
                    {res.address}  |  telephone {res.telephone}
                  </ad> 
                  <des className = "description">
                      {res.description}
                  </des>      
                </row>
                
              </li>
            })}
        </ul>
        </div>
      
    </div>
  );  
  
}

export default App;
/*
const [count, setCount] = useState(0);

  return (
    <div className = 'container-fluid'>
      <div className = "App-header row">
        <h2>
          Restaurants
        </h2>
      </div>
      <br />
      <br />
      <div>
        <form className = "row">
            <input className="col-lg-offset-8 col-lg-2" placeholder = "Renseigner un restaurant"/>
            <p>Vous avez cliqué {count} fois</p>
            <button className="btn btn-outline-dark" onClick={() => setCount(count + 1)}>
              Chercher
            </button>
            
        </form>

        <br />
        <div>
        <ul className="list-group list-group-flush">          
          {restaurant.map((res,index) => {
              return <li className="list-group-item">
                {res.name} {res.address} {res.telephone}
              </li>
            })}
        </ul>
        </div>
        
      </div>
    </div>
  );
*/