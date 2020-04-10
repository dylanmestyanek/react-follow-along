import React from 'react';
import NavigationItems from '../NavigationItems';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NavigationItem from '../NavigationItem';

describe('Navigation Items', () => {
    it('should render "Burger Builder" and "Sign Up" Navigation Items if not authenticated', () => {
        const { getByText } = render(<BrowserRouter><NavigationItems /></BrowserRouter>);

        expect(getByText('Burger Builder')).toBeTruthy();
        expect(getByText('Sign Up')).toBeTruthy();
    });

    it('should render "Burger Builder" "Orders" and "Log Out" Navigation Items when authenticated', () => {
        const { getByText } = render(<BrowserRouter><NavigationItems isAuthenticated={true} /></BrowserRouter>);

        expect(getByText('Burger Builder')).toBeTruthy();
        expect(getByText('Orders')).toBeTruthy();
        expect(getByText('Log Out')).toBeTruthy();
    });
});