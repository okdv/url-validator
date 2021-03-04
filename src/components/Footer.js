import React from 'react'
import {Row,Col} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeadphones, faCopyright } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer(props) {
    const full = props.owner.name || null
    const first = full.split(' ')[0] || null
    const year = new Date().getFullYear()

    return(
        <Row tag="footer">
            {
                full !== null ? (
                    <Col>
                        <p>
                            <span>Made with&nbsp;</span>
                            <FontAwesomeIcon color="red" icon={faHeart} />
                            <span>&nbsp;&amp;&nbsp;</span>
                            <FontAwesomeIcon color="purple" icon={faHeadphones} />
                            {
                                first !== null ? (
                                    <span>&nbsp;by&nbsp;
                                        <a 
                                            className="link" 
                                            href={props.owner.link && props.owner.link !==null ? props.owner.link : "#"}
                                        >
                                            {first}
                                        </a>
                                    </span>
                                ) : ""
                            }
                        </p>
                    </Col>
                ) : ""
            }
            <Col>
                <p>
                    <span>{year}&nbsp;</span>
                    <FontAwesomeIcon color="white" icon={faCopyright} />
                    {full !== null ? <span>&nbsp;{full}</span> : ""}
                </p>
            </Col>
            {
                props.socials && props.socials !== null ? (
                    <Col>
                        <Row>
                            {
                                props.socials.length > 0 ? (
                                    props.socials.map((obj,i) => {
                                        return (
                                        <a 
                                            className="padding" 
                                            key={i} 
                                            href={obj.link && obj.link !== null ? obj.link : "#"}
                                        >
                                            <FontAwesomeIcon 
                                                size="2x" 
                                                color={obj.color || "white"} 
                                                icon={obj.icon} 
                                            />
                                        </a>
                                        )
                                    })
                                ) : ""
                            }
                        </Row>
                    </Col>
                ) : ""
            }
        </Row>
    )
}