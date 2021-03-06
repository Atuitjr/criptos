import styled from '@emotion/styled';

const DataDiv = styled.div`
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;
    span {
        font-weight: bold;
    }
`;

const Price = styled.span`
    font-size: 30px;
    span {
        font-weight: bold;
    }
`;

const CriptoQuote = ({ data }) => {
    if (Object.keys(data).length === 0) return null;
    return (
        <DataDiv>
            <Price>
                The price is: <span>{data.PRICE}</span>
            </Price>
            <Info>
                The highest price of the day was: <span>{data.HIGHDAY}</span>
            </Info>
            <Info>
                The lowest price of the day was: <span>{data.LOWDAY}</span>
            </Info>
            <Info>
                The last 24 hour variation is:{' '}
                <span>{data.CHANGEPCT24HOUR}</span>
            </Info>
            <Info>
                Last update: <span>{data.LASTUPDATE}</span>
            </Info>
        </DataDiv>
    );
};

export default CriptoQuote;
