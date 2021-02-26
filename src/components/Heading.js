import React from 'react'

export default function Heading(props) {

    let tag = props.tag && props.tag !== null ? props.tag : 'h1'
    let title = props.title && props.title !== null ? (React.createElement(tag, {className:"Title"}, props.title)) : null
    let subtitle = props.subtitle && props.subtitle !== null ? (React.createElement('p', {className:"Para"}, props.subtitle)) : null

    return(
        <div>
            { title ? title : null }
            { subtitle ? subtitle : null }
        </div>
    )
}