import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// 公共组件
import Header from './components/Header'
import Footer from './components/Footer'
import { Skeleton } from 'antd'

// 页面组件
import Index from "./subpage/index";
import ArticleDetail from "./subpage/articleDetail";

// 公共方法
import { ajax } from 'utils/common'

// 全局样式
import 'styles/common.less'

function RouterWrap() {
    let [config, setConfig] = useState({})
    useEffect(() => {
        ajax({
            url: '/config/all',
            method: 'get'
        }).then(res => {
            if(res.state === 200) {
                setConfig(res.data)
            }
        })
    }, [])
    return Object.keys(config).length ? 
            <Router basename={''}>
                <div>
                    <Header headerData={config.header}></Header>
                    <Switch>
                        <Route exact path="/" render={props => <Index {...props} {...config} />} />
                        <Route path="/detail" render={props => <ArticleDetail {...props} supportPay={config.supportPay} />} />
                    </Switch>
                    <Footer></Footer>
                </div>
            </Router>
            : <Skeleton active />

            
}

export default RouterWrap;