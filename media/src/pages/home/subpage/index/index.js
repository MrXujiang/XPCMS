import React, { useState, useEffect } from "react"
// import { Link } from 'react-router-dom'
import { Carousel } from 'antd'
import ArticleItem from '../../components/ArticleItem'
import { isPC, ajax, unparam } from 'utils/common'

import './index.less'

function Home(props) {
    let [articles, setArticles] = useState([])
    let { search } = props.location

    function getArticles(cate = '', num = 10, page = 0) {
        ajax({
            url: '/article/articleList',
            method: 'get',
            data: { cate, num, page }
        }).then(res => {
            setArticles(res.data || [])
        }).catch(err => console.log(err))
    }

    if(search && sessionStorage.getItem('prevCate') !== search) {
        getArticles(unparam(search).cate)
        sessionStorage.setItem('prevCate', search)
    }

    useEffect(() => {
        getArticles()
        return () => {
            sessionStorage.removeItem('prevCate')
        }
    }, [])
    return <div className="home-wrap">
        <div className="banner-wrap">
            {
                isPC ?
                <React.Fragment>
                    <div className="banner-sider">
                        <div className="tit">{ props.bannerSider.tit }</div>
                        <img src={props.bannerSider.imgUrl} alt="" />
                        <div className="desc">{ props.bannerSider.desc }</div>
                    </div>
                    {
                        +props.banner.type ?
                        <Carousel autoplay className="banner">
                            {
                                props.banner.bannerList.map((item, i) => (
                                    <div key={i}>
                                        <a className="banner-img" href="" style={{ backgroundImage: 'url('+ item.imgUrl +')'}}>
                                            <p className="tit">{ item.tit }</p>
                                        </a>
                                    </div>
                                ))
                            }
                        </Carousel>
                        :
                        <div className="banner">
                            <div className="banner-img" style={{backgroundImage: 'url('+ props.banner.bgUrl +')'}}>
                                {
                                    props.banner.label.map((item, i) => (
                                        <span className="banner-label" style={{left: 80*(i+1) + 'px'}} key={i}>
                                            { item }
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </React.Fragment>
                :
                <Carousel autoplay className="banner">
                    {
                        props.banner.bannerList.map((item, i) => (
                            <a className="banner-img" href="" key={i} style={{ backgroundImage: 'url('+ item.imgUrl +')'}}>
                                <p className="tit">{ item.tit }</p>
                            </a>
                        ))
                    }
                </Carousel>
            }
        </div>
        <div className="article-list">
            <div className="tit">最新文章</div>
            {
                articles.map((item, i) => (
                    <ArticleItem {...item} key={i} />
                ))
            }
        </div>
    </div>
}

export default Home