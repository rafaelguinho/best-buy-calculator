import React, {useState, useEffect} from 'react';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function BestBuyTooltipMessage({ isTheBestBuy, moreFavourableProduct }) {

    const [message, setMessage] = useState("");

    const formatMessage = (mostFavourable) =>{
        const resultMessage = `O mais favorável é comprar ${mostFavourable.amount} ${mostFavourable.unit.label} por ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(mostFavourable.price)}, você economiza ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(mostFavourable.savedMoney)} em cada ${mostFavourable.amount} ${mostFavourable.unit.label}`
        setMessage(resultMessage);
    }

    useEffect(() => {

        if(isTheBestBuy){
            formatMessage(moreFavourableProduct);
        }

    },[isTheBestBuy, moreFavourableProduct]);


    return (isTheBestBuy ? <p className="best-info"><FontAwesomeIcon icon={faInfoCircle} /> {message}</p> : <></>)
}

export default BestBuyTooltipMessage;