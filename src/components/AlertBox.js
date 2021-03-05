import React from 'react'
import {Alert,Col} from 'reactstrap'

export default function AlertBox(props) {
    return props.arr && props.arr.length > 0 ? (
        <Col>
            {props.title ? <h3>{props.title}</h3> : ""}
            {props.arr.map((x,i) => {
                return (
                    <Alert 
                        key={i}
                        color={props.color || "warning"}
                    >{x}</Alert>
                )
            })}
        </Col>
    ) : ""
}
