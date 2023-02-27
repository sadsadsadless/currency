import React, { useState } from "react";
import { Block } from './Block';
import './index.scss';


function App() {
    const [fromCurrency, setFromCurrency] = React.useState('rub')
    const [toCurrency, setToCurrency] = React.useState('usd')
    const [fromPrice, setFromPrice] = React.useState('0')
    const [toPrice, setToPrice] = React.useState('1')

    const ratesRef = React.useRef({});

    React.useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json")
        .then(res => res.json())
        .then((json) => {
            ratesRef.current = json.eur;
            onChangeToPrice(1)
        })
        .catch((error) => console.log('error', error));
    }, []);
    
    const onChangeFromPrice = (value) => {
        const price = value / ratesRef.current[fromCurrency]
        const result = price * ratesRef.current[toCurrency]
        setToPrice(result.toFixed(3))
        setFromPrice(value)
    }

    const onChangeToPrice = (value) => {
        const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
        setFromPrice(result.toFixed(3))
        setToPrice(value)
    }

    React.useEffect(()=>{
        onChangeFromPrice(fromPrice)
    }, [fromCurrency])

    React.useEffect(()=>{
        onChangeToPrice(toPrice)
    }, [toCurrency])

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
