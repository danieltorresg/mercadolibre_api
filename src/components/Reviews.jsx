import React, { useState, useEffect } from "react";

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`https://api.mercadolibre.com/reviews/item/${props.id}`, {
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
  }, []);

  return (
    <div className="text">
      {reviews.reviews != undefined ? (
        <div>
          {reviews.reviews.map((rvw) => (
            <div key={rvw.id}>
              <h5>{rvw.title}</h5>
              <p>Calificación: {rvw.rate}</p>
              <p>
              {rvw.content}
              </p>
              <p>Fecha: {rvw.date_created}</p>
              
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Reviews;
