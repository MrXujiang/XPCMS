import React from 'react'
import './index.less'
/**
 * 进度条
 * @param {*} props 
 * value 进度值
 * bgColor 进度的颜色
 * wrapBgColor 进度的底色
 * wrapWidth 进度条的宽度
 */
export default function ProgressBar(props) {
    let barOpt = {
            width: props.value || '50%',
            backgroundColor: props.bgColor || '#fff'
        },

        wrapOpt = {
            width: props.wrapWidth || '160px',
            backgroundColor: props.wrapBgColor || '#888'
        }
       
    return (
        <div className="progress-bar-wrap" style={wrapOpt}>
            <div className="bar" style={barOpt}></div>
        </div>
    )
}