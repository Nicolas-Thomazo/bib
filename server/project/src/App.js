import React/*, { useState }*/ from 'react';
import './App.css';
import maitre from './maitre.png';
import bib from './bib.png';
import restaurant from './common.json';
import {Navbar,Row, Col,Container,NavDropdown,Nav,Form,FormControl,Button,Figure,Table,Image} from 'react-bootstrap';



function App() {
  //const [count, setCount] = useState(0);
  //const [password, setPassword] = useState('');
      /*<input  placeholder = "Renseigner un restaurant" onChange={event => setPassword(event.target.value)} />
       <button className="btn btn-outline-dark" onClick={() => setCount(count + 1)}>
        Chercher
      </button>*/



  return (
  <Container fluid={true}>
    <Navbar bg="dark" variant="dark">
    <Nav className="mr-auto">
    
      <Nav.Link href="#bib">
          <Figure.Image
              width={65}
              src={bib}
              rounded
            />
      </Nav.Link>
      <Nav.Link href="#maitre">
          <Figure.Image
              width={40}
              src={maitre}
              rounded
            />
      </Nav.Link>
      <Navbar.Brand href="#restaurants">Restaurants</Navbar.Brand>
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#pricing">infos</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>

<Table striped bordered hover >
<thead>
  <tr>
    
    <th>#</th>
    <th>Photo</th>
    <th>
      Nom
    </th>
    <th>Addresse</th>
    <th>Telephone</th>
    <th>Infos complémentaires</th>
  </tr>
</thead>
<tbody>
{restaurant.map((res,index) => {
  return(
  <tr>
 <td>{index+1}</td>
  <td>
   <img src = {res.image} rounded width = "100px" height= "auto"/>
  </td>
  <td>
    <a href={res.site} >
          {res.name}
        </a>
    </td>
  <td>{res.address}</td>
  <td>{res.telephone}</td>
  <td>{res.prix}</td>
</tr>)
})} 
</tbody>
</Table>

</Container>
  );  
  
}

export default App;

/*

*/
/*
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
*/