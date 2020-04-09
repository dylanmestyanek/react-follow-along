import React from 'react';
import NavigationItem from './NavigationItem.jsx';
import styled from '@emotion/styled';

const NavigationItems = () => (
    <NavigationList>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/auth">Sign Up</NavigationItem>
    </NavigationList>
);

export default NavigationItems;

const NavigationList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    @media (min-width: 500px) {
        flex-direction: row;
    }
`;