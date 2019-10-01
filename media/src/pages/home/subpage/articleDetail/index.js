import React, { useState, useEffect } from "react"
import { Button, Modal, Skeleton, Icon } from 'antd'
import { ajax, unparam } from 'utils/common'
import QTQD from 'images/logo.png'
import './index.less'

function ArticleDetail(props) {
    let [isPayShow, setIsPayShow] = useState(false)
    let [detail, setDetail] = useState(null)
    let [likeNum, setLikeNum] = useState(0)
    let [articleContent, setArticleContent] = useState(null)
    let [isShowLike, setShowLike] = useState(false)

    function toggleModal(flag) {
        setIsPayShow(flag)
    }

    function getcontent(url) {
        ajax({
            url
        }).then(res => {
            setArticleContent(res.content)
            
        })
    }

    function showLike() {
        if(!isShowLike) {
            ajax({
                url: `/article/likeArticle/${unparam(props.location.search).id}`,
                method: 'post'
            }).then(res => {
                setShowLike(true)
                setLikeNum(prev => prev + 1)
            })
        }
    }

    useEffect(() => {
        ajax({
            url: `/article/${unparam(props.location.search).id}`
        }).then(res => {
            setDetail(res.data)
            setLikeNum(res.data.flover)
            getcontent(res.data.articleUrl)
        })
        return () => {
            
        };
    }, [])

    return !detail ? <Skeleton active /> 
        :
    <div className="article-wrap">
        <div className="article">
            <div className="tit">{ detail.tit }</div>
            <div className="article-info">
                <span className="article-type">{ detail.label }</span>
                <span className="article-time">{ detail.time }</span>
                <span className="article-views"><Icon type="eye" />&nbsp;{ detail.views }</span>
                <span className="article-flover"><Icon type="fire" />&nbsp;{ likeNum }</span>
            </div>
            <div className="article-content" dangerouslySetInnerHTML={{__html: articleContent}}></div>
            <div className="article-ft">
                <div className="article-label">

                </div>
                <div className="support-author">
                    <p>给作者打赏，鼓励TA抓紧创作！</p>
                    <div className="support-wrap">
                        <Button className="btn-pay" type="danger" ghost onClick={() => toggleModal(true)}>赞赏</Button>
                        <Button className="btn-flover" type="primary" onClick={showLike} disabled={isShowLike}>{ !isShowLike ? '点赞' : '已赞'}({likeNum})</Button>
                        {
                            isShowLike && <Icon type="like" className="like-animation" />
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="sider-bar">
            <h2>友情赞助</h2>
            <div className="sider-item">
                <img src={QTQD} alt=""/>
                <p>公众号《趣谈前端》</p>
            </div>
        </div>
        <Modal 
            visible={isPayShow} 
            onCancel={() => toggleModal(false)} 
            width="300px"
            footer={null}
        >
            <div className="img-wrap">
                <img src={props.supportPay.imgUrl} alt={props.supportPay.tit} />
                <p>{ props.supportPay.tit }</p>
            </div>
        </Modal>
    </div>
}

export default ArticleDetail