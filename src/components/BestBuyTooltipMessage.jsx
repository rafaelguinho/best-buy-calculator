import React, {useState, useEffect} from 'react';

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


    return (isTheBestBuy ? <span data-tooltip="Tooltip" aria-describedby="tooltipText" tabindex="0">{message}</span> : <></>)
}

export default BestBuyTooltipMessage;