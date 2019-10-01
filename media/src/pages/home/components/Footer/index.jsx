import React, { useState, useEffect } from 'react'
import { ajax } from 'utils/common'
import './index.less'

export default function Footer(props) {
    let [views, setViews] = useState(0)
    useEffect(() => {
        ajax({
            url: '/siteStatistics/all'
        }).then(res => {
            setViews(+res.data.views)
        })
    }, [])
    return <div className="common-footer">
        @众学智库出品 | 总访问量:{ views }
    </div>
}