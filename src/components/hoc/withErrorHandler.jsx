import React from 'react';

import Modal from '../UI/Modal.jsx';
import useHttpErrorHandler from '../../hooks/httpErrorHandler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
       const [error, clearError] = useHttpErrorHandler(axios);
    
        return (
            <>
                <Modal 
                    ordering={error}
                    stopOrdering={clearError}>
                    {error && error.message}
                </Modal>
                <WrappedComponent {...props} />
            </>
        )
    }
}

export default withErrorHandler