import React, { useState, useEffect } from './node_modules/react'
import Vidage from './node_modules/vidage'

export default function Banner(props) {
    let { src } = props
    useEffect(() => {
        new Vidage('#vidage')
    })
    return <video id="vidage" className="vidage-video" preload="metadata" src={src} loop autoPlay muted></video>
}