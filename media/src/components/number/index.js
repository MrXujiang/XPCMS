import React from 'react'

import './index.less'

export default class NumberInput extends React.Component {

    state = {
        max: this.props.max || 99,
        min: this.props.min || 1,
        value: 0
    }

    substract = () => {
        this.setState((prevState,props) => {
            return {
                value: prevState.value <= prevState.min ?  prevState.min : --prevState.value
            }
        }, () => {
            this.props.sendValue(this.state.value)
        })
    }

    add = () => {
        this.setState((prevState,props) => {
            return {
                value: prevState.value >= prevState.max ?  prevState.max : ++prevState.value
            }
        }, ()=> {
            this.props.sendValue(this.state.value)
        })
    }

    handleChange = (e) => {
        let reg = /^[0-9]*$/g,
            value = e.target.value;
        if(!reg.test(value)) return

        this.setState({
            value: value >= this.state.max ? this.state.max : (value <= this.state.min ? this.state.min : value)
        }, () => {
            this.props.sendValue(this.state.value)
        })
    }

    render() {
        return (
            <div className="number-ipt-wrap">
                <span className="substract" onClick={this.substract}>-</span>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <span className="add" onClick={this.add}>+</span>
            </div>
        )
    }
}