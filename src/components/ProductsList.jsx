import React from "react";
import Seller from "./Seller";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import Product from "./Product";

const ProductsList = (props) => {
  return (
    <form>
      <Router>
        <Switch>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/">
            <div className="container p-4">
              <div className="row">
                {props.products.length > 0 ? (
                  props.products.map((product) => (
                    <div key={product.id} className="col-md-4">
                      <div className="card">
                        <div className="card text-center">
                          <img
                            className="center"
                            src={product.thumbnail}
                            width="90"
                            height="90"
                            alt=""
                          />
                          <div className="card-body">
                            <Link to={`/product/${product.id}`}>
                              <h5 className="card-title">{product.tittle}</h5>
                            </Link>
                            <h5 className="card-title">${product.price}</h5>
                            <Seller id={product.seller} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-md-4 mx-auto">
                    <p>Escriba el producto que quiere buscar</p>
                  </div>
                )}
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </form>
  );
};

export default ProductsList;
