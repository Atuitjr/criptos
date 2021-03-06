import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import useCoin from '../hooks/useCoin';
import useCryptocurrency from '../hooks/useCryptocurrency';

import Error from './Error';

const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Form = ({ setCripto, setCoin }) => {
    const [criptoList, setCriptoList] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const APIQuery = async () => {
            const url =
                'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const result = await axios.get(url);

            setCriptoList(result.data.Data);
        };
        APIQuery();
    }, []);

    const COINS = [
        { code: 'USD', name: 'United States Dolar' },
        { code: 'MXN', name: 'Mexican Peso' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'Pound Sterling' },
    ];

    const [coin, SelectCoin] = useCoin('Choose your coin', '', COINS);
    const [cryptocurrency, SelectCripto] = useCryptocurrency(
        'Choose your cryptocurrency',
        '',
        criptoList
    );

    const submitHandle = (e) => {
        e.preventDefault();
        if (coin.trim() === '' || cryptocurrency.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        setCoin(coin);
        setCripto(cryptocurrency);
    };

    return (
        <form onSubmit={submitHandle}>
            {error && <Error message='All fields are required' />}
            <SelectCoin />
            <SelectCripto />
            <Button type='submit' value='Calculate' />
        </form>
    );
};

export default Form;
