import React, {useRef} from 'react'
import {copy} from "../utils/helpers"

import {InputGroup,InputGroupAddon,Input,Button} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

export default function InputItem(props) {
    const val = props.val || null
    const status = props.status || null
    const valid = status === true ? true : false
    return(
        <InputGroup>
            {
                props.prepend ? (
                    <InputGroupAddon addonType="prepend">
                        {props.prepend}
                    </InputGroupAddon>
                ) : ""
            }
            <Input 
                placeholder={props.placeholder || null}
                innerRef={props.innerRef || null}
                value={props.val || null}
                disabled={props.disabled || false}
                invalid={props.validityCheck === true ? !valid : false}
                valid={props.validityCheck === true ? valid : false}
            />
            {
                props.append !== null ? (
                    <InputGroupAddon addonType="append">
                        {
                            props.append ? props.append :
                            <Button
                                onClick={copy(props.val)}
                                disabled={props.copyStatus ? !props.copyStatus : status === true ? false : true}
                                color={props.btnColor || "info"}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </Button>
                        }
                    </InputGroupAddon>
                ) : ""
            }
        </InputGroup>
    )
}