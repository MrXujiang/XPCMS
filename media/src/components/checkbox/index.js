import React from 'react'
import { Checkbox } from 'antd'

/**
 * 对checkbox二次封装，使其可以被antdesign的form控制
 */
export default class WrapCheckBox extends React.Component {
    render() {
        let status = true;
        if(this.props.value === false || this.props.value === 'false') status = false;

        return (
            <Checkbox
                checked={status}
                onChange={this.props.onChange}>
                {this.props.children}
            </Checkbox>
        )
    }
}