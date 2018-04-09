import React from 'react';

class EventCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }

    componentDidMount() {
        document.body.addEventListener('click', e => {
            this.setState({
                active: false,
            });
        });

        document.querySelector('.code').addEventListener('click', e => {
            e.stopPropagation();
        })
    }

    componentWillUnmount() {
        document.body.removeEventListener('click');
        document.querySelector('.qr').removeEventListener('click');
    }

    handleClick = () => {
        this.setState({
            active: !this.state.active,
        });
    }

    handleClickQr = (e) => {
        e.stopPropagation();
    }

    render() {
        return (
            <div className="qr-wrapper">
                <button className="qr" onClick={this.handleClick}>二维码</button>
                <div
                    className="code"
                    style={{display: this.state.active ? 'block' : 'none'}}
                    onClick={this.handleClickQr}
                >
                    <img src="./img/logo.png" alt="qr"/>
                </div>
            </div>
        );
    }
}

export default EventCode;