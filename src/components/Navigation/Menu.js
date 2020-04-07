import React from 'react';
import styled from '@emotion/styled';

const Menu = props => (
    <MenuContainer onClick={() => props.toggleSideDrawer()}>
        <div></div>
        <div></div>
        <div></div>
    </MenuContainer>
);

export default Menu;

const MenuContainer = styled.div`
    width: 40px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
    cursor: pointer;

    div {
        width: 90%;
        height: 3px;
        background-color: white;
    }

    @media (min-width: 500px) {
        display: none;
    }
`;