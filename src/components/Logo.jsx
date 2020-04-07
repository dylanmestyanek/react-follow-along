import React from 'react';
import burgerLogo from '../assets/Images/original.png';
import styled from '@emotion/styled';

const Logo = props => (
    <LogoContainer style={{ height: props.height }}>
        <img src={burgerLogo} alt="My Burger" />
    </LogoContainer>
);

export default Logo;

const LogoContainer = styled.div`
    background-color: white;
    padding: 8px;
    height: 100%;
    box-sizing: border-box;
    border-radius: 5px;

    img {
        height: 100%;
}
`;