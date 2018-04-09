import React from 'react';
const emoji = require('emoji');
import 'emoji/lib/emoji.css';
export default class Eg extends React.Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            index: 0
        }
    }

    componentDidMount () {
        this.setState({value: this.state.value + 1})
        console.log(this.state.value) // 第一次输出
        this.setState({value: this.state.value + 1})
        console.log(this.state.value) // 第二次输出
        setTimeout(() => {
            this.setState({value: this.state.value + 1})
            console.log(this.state.value) // 第三次输出
            this.setState({value: this.state.value + 1})
            console.log(this.state.value) // 第四次输出
        }, 0);
        this.refs.button.addEventListener('click', this.click);
        console.log('😀', emoji.unifiedToHTML('😝'));
    }

    click = () => {
        this.setState({value: this.state.index + 1})
        this.setState({value: this.state.index + 1})
    }

    render () {
       /* const f =   ;*/

      /*  console.log(f);*/
        return (
            <div><span>value: {this.state.value}index: {this.props.index}</span>
                <button ref="button" onClick={this.click}>点击</button>
                <input value={emoji.unifiedToHTML('😝') + 'ddddd'}/>
                <span dangerouslySetInnerHTML={{__html: emoji.unifiedToHTML('😝') + 'ddddd'}} ></span>
            </div>
        )
    }
}

