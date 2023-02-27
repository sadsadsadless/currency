import React, { useState } from "react";
import { Block } from './Block';
import './index.scss';


function App() {
    const [fromCurrency, setFromCurrency] = React.useState('rub')
    const [toCurrency, setToCurrency] = React.useState('usd')
    const [fromPrice, setFromPrice] = React.useState('0')
    const [toPrice, setToPrice] = React.useState('0')

    const [rates, setRates] = React.useState({})
 
    React.useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json")
        .then(res => res.json())
        .then((json) => {
            setRates(json.eur);
            console.log(json.eur)
        })
        .catch((error) => console.log('error', error));
    }, []);
    
    const onChangeFromPrice = (value) => {
        const price = value / rates[fromCurrency]
        const result = price * rates[toCurrency]
        setToPrice(result)
        setFromPrice(value)
    }

    const onChangeToPrice = (value) => {
        const result = (rates[fromCurrency] / rates[toCurrency]) * value
        setFromPrice(result)
        setToPrice(value)
    }

    return (
        <div className="App">
            <Block 
                value={fromPrice} 
                currency={fromCurrency}
                onChangeCurrency={setFromCurrency} 
                onChangeValue={onChangeFromPrice} />
            <Block 
                value={toPrice} 
                currency={toCurrency} 
                onChangeCurrency={setToCurrency} 
                onChangeValue={onChangeToPrice} />
        </div>
    );
}

export default App;
