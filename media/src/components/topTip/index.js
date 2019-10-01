import React from 'react'
import { Icon } from 'antd'

import './index.less'

export default function TopTip(props) {
    let tip = null;

    function hideTip() {
        tip.style.display = 'none';
    }
    return (
        <div className="top-tip" ref={(topTip) => { tip = topTip }}>
            {
                props.children
            }
            <span className="close-btn" onClick={hideTip}><Icon type="close" /></span>
        </div>
    )
}