import React from 'react';
import {emojify} from 'react-emojione';
const options = {
    convertShortnames: true,
    convertUnicode: true,
    convertAscii: true,
    styles: {
        backgroundImage: 'url(emojione.sprites.png)',
        width: '32px',
        height: '32px',
        margin: '4px'
    },
    // this click handler will be set on every emoji
    handleClick: event => alert(event.target.title)
};
export default class EmojifyDemo extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div>{emojify('Easy! :wink: 😸 :D  ^__^', options)}</div>
        )
    }
}