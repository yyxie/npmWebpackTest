import {Component} from 'react';
export default class Lazyload extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentDidMount() {
      /*  Util.requireAuth(history);*/
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load = (props) => {
        this.setState({
            mod: null
        })

        props.load((mod) => {
            this.setState({
                mod: mod.default ? mod.default : mod
            })
        })
    }

    render() {
        return this.props.children(this.state.mod)
    }
}