import React from 'react';
class Error extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if(this.state.hasError) {
            return (
                <h2>Couldn't display.</h2>
            );
        }
        return this.props.children;
    }
}

export default Error;