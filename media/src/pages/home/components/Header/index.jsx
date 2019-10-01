import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'antd'
import './index.less'

const { Search } = Input

export default function Header(props) {
    let headerData = props.headerData && props.headerData || ['首页', '前端', '产品']
    return <div className="common-header">
        <div className="logo">
            <img src={headerData.logo} alt=""/>
        </div>
        <div className="nav">
            {
                headerData.columns.map((item, i) => (
                    <div className="nav-link" key={i}>
                        <Link to={`/?cate=${item}`}>{ item }</Link>
                    </div>
                ))
            }
        </div>
        <div className="search-bar">
            <Search placeholder="搜索内容自己实现哦" onSearch={value => console.log(value)} enterButton />
        </div>
    </div>
}