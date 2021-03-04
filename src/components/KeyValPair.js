import React from 'react'

export default function keyValPair(props) {
    return React.createElement(
        props.tag || 'p', 
        props.parentProps || null, 
        <span><b>{props.keyItem || "key"}:&nbsp;</b>{props.valItem || "value"}</span>)
}