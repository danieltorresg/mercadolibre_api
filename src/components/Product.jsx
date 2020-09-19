import React from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    obtenerProducts();
  }, []);

  const obtenerProducts = async () => {
    await fetch(`https://api.mercadolibre.com/items/${id}`, {
      mode: "cors",
    })
      .then(function (consult) {
        return consult.json();
      })
      .then(function (productJson) {
        let new_obj = {
          id: productJson.id,
          tittle: productJson.title,
          imgMain: productJson.pictures[0].url,
          thumbnail: productJson.thumbnail,
          price: productJson.price,
          originalPrice: productJson.original_price,
        };
        setProduct(new_obj);
      });
  };

  //https://api.mercadolibre.com/reviews/item/
  const obtenerReviews = async () => {
    await fetch(`https://api.mercadolibre.com/reviews/item/${id}`, {
      mode: "cors",
    })
      .then(function (consult) {
        return consult.json();
      })
      .then(function (reviewsJson) {
        let rvw = {
          rating_average: reviewsJson.rating_average,
          reviews: reviewsJson.reviews,
        };
        setReviews(rvw);
      });
  };

  return (
    <div>
      <h1>{product.tittle}</h1>
      <div className="card-deck">
        <div className="cards">
          <img src={product.imgMain} alt="" />
        </div>
        <div className="vl"></div>
        <div className="cards">
          {product.originalPrice != null ? (
            <div>
              <span className="tachado">$ {product.originalPrice}</span>
              <hr />
              <label> $ {product.price}</label>
              <hr />
              <label>
                Descuento del:{" "}
                {Math.trunc((product.price / product.originalPrice) * 100)}%
              </label>
            </div>
          ) : (
            <div>
              <label>$ {product.price}</label>
            </div>
          )}
        </div>
      </div>
      <div className="card-deck">
        {product.id != undefined ? (
          <div>
            <Reviews id={product.id} />
            {console.log("Entro", product.id )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Product;
