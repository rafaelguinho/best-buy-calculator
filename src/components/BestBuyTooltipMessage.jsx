import React, {useState, useEffect} from 'react';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function BestBuyTooltipMessage({ isTheBestBuy, moreFavourableProduct }) {

    const [message, setMessage] = useState("");

    const formatMessage = (mostFavourable) =>{
        const resultMessage = `O mais favorável é comprar ${mostFavourable.amount} ${mostFavourable.unit.label} por R$ ${mostFavourable.price}, você economiza R$ ${mostFavourable.savedMoney} em cada ${mostFavourable.amount} ${mostFavourable.unit.label}`
        setMessage(resultMessage);
    }

    useEffect(() => {

        if(isTheBestBuy){
            formatMessage(moreFavourableProduct);
        }

    },[isTheBestBuy, moreFavourableProduct]);


    return (isTheBestBuy ? <p><FontAwesomeIcon icon={faInfoCircle} /> {message}</p> : <></>)
}

export default BestBuyTooltipMessage;