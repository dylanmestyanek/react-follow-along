import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

const NavigationItem = props => (
    <NavLinkContainer>
        <NavLink exact to={props.link}>
            {props.children}
        </NavLink>
    </NavLinkContainer>
);

export default NavigationItem;

const NavLinkContainer = styled.li`
    margin: 10px 0;
    box-sizing: border-box;
    display: block;
    width: 100%;

    a {
        color: #8F5C2C;
        text-decoration: none;
        width: 100%;
        box-sizing: border-box;
        display: block;
    }

    a:hover,
    a:active,
    a.active {
        color: #40A4C8;
    }

    @media (min-width: 500px) {
        margin: 0;
        display: flex;
        height: 100%;
        width: auto;
        align-items: center;

        a {
            color: white;
            height: 100%;
            padding: 16px 10px;
            border-bottom: 4px solid transparent;
        }
        
        a:hover,
        a:active,
        a.active {
            background-color: #8F5C2C;
            border-bottom: 4px solid #40A4C8;
            color: white;
        }
    }
`;