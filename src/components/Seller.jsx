  
import React, {  useState, useEffect } from 'react';

const Seller = (props) => {

    const [seller, setSeller] = useState("");

    useEffect(()=>{

        fetch(`https://api.mercadolibre.com/users/${props.id}`, { mode: "cors" })
            .then(function (consult) {
                return consult.json();
            })
            .then(function (sellerJson) {
                setSeller(sellerJson.nickname);
            });
    }, [props.id]);

    return(
        <div className="text">Vendedor: {seller} </div>
    )
}

export default Seller;