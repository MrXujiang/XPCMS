import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import './index.less'

export default function ArticleItem(props) {
    return <div className="article-item">
                <div className="img-wrap">
                    <img src={props.faceUrl} alt="" />
                    <span className="label">{ props.label }</span>
                </div>
                <div className="article-content">
                    <Link className="article-tit" to={`/detail?label=${props.label}&id=${props.id}`}>{ props.tit }</Link>
                    <div className="article-desc">
                        { props.desc }
                    </div>
                    <div className="article-ft">
                        <div className="article-pubtime">{ props.time }</div>
                        <div className="view"><Icon type="eye" />&nbsp;{ props.views }</div>
                        <div className="article-flover"><Icon type="fire" />&nbsp;{ props.flover }</div>
                    </div>
                </div>
            </div>
}