import React from 'react';
import { css, jsx } from '@emotion/core'
import Burger from './Burger/Burger';
import Button from './UI/Button';
import styled from '@emotion/styled';

const CheckoutSummary = props => {
    return (
        <CheckoutSummaryContainer>
            <h1>We hope it tastes great!</h1>
            <div css={css`
                width: 10px;
                margin: auto;
            `}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button buttonType="Danger" clicked> Cancel </Button>
            <Button buttonType="Success" clicked> Continue </Button>
        </CheckoutSummaryContainer>
    );
};

export default CheckoutSummary;

const CheckoutSummaryContainer = styled.div`
    text-align: center;
    width: 80%;
    margin: auto;

    @media (min-width: 600px) {
        width: 500px;
    }
`;