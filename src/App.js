import React from "react";
import ProductsList from "./components/ProductsList";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Product from "./components/Product";
/* import AddUserForm from "./components/AddUserForm";
import EditUserForm from "./components/EditUserForm";
import UserTable from "./components/UserTable"; */

function App() {
  //state

  const [products, setProducts] = React.useState([]);
  const [name, setName] = React.useState("");

  const textInput = React.useRef(null);

  React.useEffect(() => {
    obtenerProducts();
  }, [name]);

  const obtenerProducts = async () => {
    await fetch(`https://api.mercadolibre.com/sites/MCO/search?q=${name}`, {
      mode: "cors",
    })
      .then(function (consult) {
        return consult.json();
      })
      .then(function (listJson) {
        const data = listJson.results.map((obj) => {
          let new_obj = {
            id: obj.id,
            tittle: obj.title,
            thumbnail: obj.thumbnail,
            price: obj.price,
            seller: obj.seller.id,
          };
          return new_obj;
        });
        setProducts(data);
      });
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
      const input = textInput.current.value;
      setName(input);
    }
  };

  const handleChange = (e) => {
    if (e) {
      e.preventDefault();
      const input = textInput.current.value;
      setName(input);
    }
  };

  return (
    <Router>
      <div className="container">
        <div className="myHeader">
          <div className="myDiv">
            <h1>DanielMarket's</h1>
          </div>
          <div>
            <h2>Lista de productos</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Buscar"
                name="Buscar"
                onChange={handleChange}
                ref={textInput}
              />
              <input type="submit" value="Buscar" />
            </form>
          </div>
        </div>
        <Switch>
          <Route path="/buscar/:parametro">
            <ProductsList products={products} />
          </Route>
          <Route path="/">
            <ProductsList products={products} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
