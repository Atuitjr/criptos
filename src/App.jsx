import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import Form from './components/Form';
import CriptoQuote from './components/CriptoQuote';

import image from './cryptomonedas.png';

const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
    @media (min-width: 992px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }
`;

const Image = styled.img`
    max-width: 100%;
    margin-top: 5rem;
`;

const Heading = styled.h1`
    font-family: 'Bebas Neue', cursive;
    color: #fff;
    text-align: left;
    font-weight: 700;
    font-size: 50px;
    margin-bottom: 50px;
    margin-top: 80px;
    &::after {
        content: '';
        width: 100px;
        height: 6px;
        background-color: #66a2fe;
        display: block;
    }
`;

function App() {
    const [coin, setCoin] = useState('');
    const [cripto, setCripto] = useState('');
    const [quote, setQuote] = useState({});

    useEffect(() => {
        const criptoQuote = async () => {
            if (coin.trim() === '' || cripto.trim() === '') return;

            const uri =
                'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=';
            const url = `${uri}${cripto}&tsyms=${coin}`;

            const result = await axios.get(url);
            setQuote(result.data.DISPLAY[cripto][coin]);
        };
        criptoQuote();
    }, [coin, cripto]);

    return (
        <Container>
            <div>
                <Image src={image} alt='Cripto image' />
            </div>
            <div>
                <Heading>cryptocurrency quote </Heading>
                <Form setCoin={setCoin} setCripto={setCripto} />
                <CriptoQuote data={quote} />
            </div>
        </Container>
    );
}

export default App;
