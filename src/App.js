import React, {useState, useRef} from 'react'
import {fullRegex,validate} from './utils'
import './App.css'

import {
  Button,
  InputGroup, InputGroupAddon, Input, Container, Row, Col, Collapse, Alert
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeadphones, faCopyright } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [status,setStatus] = useState(null)
  const [urlObj, setUrlObj] = useState({
    protocol: null,
    domain: null,
    path: null,
    query: null,
    fragment: null
  })
  const [errs, setErrs] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const inputRef = useRef(null)

  const toggle = () => setDropdownOpen(!dropdownOpen)

  const checkUrl = () => {
    const url = inputRef.current.value || null
    const rgx = fullRegex(url)
    const res = validate(url)
    console.log(rgx)
    let obj = {}
    Object.keys(res[0]).forEach(key => obj[key] = res[0][key])
    if (obj.protocol && obj.protocol !== null &&
      obj.domain && obj.domain !== null &&
      obj.path && obj.path !== null) {
        setStatus(true)
      } else {
        setStatus(false)
      }
    setUrlObj(obj)
    setErrs(res[1])
  }

  let errors = [], warnings = []

  if (errs.length > 0) {
    errs.map(err => err.toLowerCase().includes("fatal") ? errors.push(err) : warnings.push(err))
  }

  let validUrl = ""
  Object.keys(urlObj).forEach(key => {
    const str = urlObj[key]
    validUrl += str === null ? "" : str
  })

  console.log(status)

  return (
    <div className="App">
      <header>
        <h1>URL Validator</h1>
      </header>
      <Container>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Input URL</InputGroupAddon>
          <Input innerRef={inputRef} />
          <InputGroupAddon addonType="append"><Button onClick={checkUrl}>Validate</Button></InputGroupAddon>
        </InputGroup>
        <hr className="dash" />
        <InputGroup>
          <InputGroupAddon addonType="prepend">Validated URL</InputGroupAddon>
          <Input disabled={true} value={
            status === null ? "Your validated/formatted URL will appear here!" : (
              status === true ? validUrl : "Unable to format this URL, check errors"
            )
          } valid={status !== null ? status : null} />
          <InputGroupAddon addonType="append"><Button>Copy</Button></InputGroupAddon>
        </InputGroup>
        <br />
        {
          status === null ? "" : (
            <div>
              <Row>
                {
                  Object.keys(urlObj).map((key,i) => {
                    const val = urlObj[key]
                    return val !== null ? (
                      <Col>
                        <InputGroup key={i}>
                          <InputGroupAddon addonType="prepend">{key}</InputGroupAddon>
                          <Input disabled={true} defaultValue={val} />
                        </InputGroup>           
                      </Col>         
                    ) : ""
                  })
                }
              <br></br>
              </Row>
              <Row>
                {
                  warnings.length > 0 ? (
                    <Col>
                      <h3>Warnings</h3>
                      {
                        warnings.map((warn,i) => <Alert key={i} color="warning">{warn}</Alert>)
                      }
                    </Col>
                  ) : ""
                }
                {
                  errors.length > 0 ? (
                    <Col>
                      <h3>Errors</h3>
                      {
                        errors.map((error,i) => <Alert key={i} color="danger">{error}</Alert>)
                      }
                    </Col>
                  ) : ""
                }
              </Row>
            </div>
          )
        }
          <div>
            <Button onClick={toggle}>
              <Row>How does it work?
                <p className="transition" style={dropdownOpen === false ? {
                  transform:"rotate(270deg)"} : {transform:"rotate(90deg)"}
            }>&#8250;
            </p>
            </Row>
            </Button>
            <Collapse isOpen={dropdownOpen}>
              Im Collapsed
            </Collapse>
          </div>
      </Container>
        <Row tag="footer">
          <Col>
            <Row>
              <span>Made with&nbsp;</span>
              <FontAwesomeIcon icon={faHeart} />
              <span>&nbsp;&amp;&nbsp;</span>
              <FontAwesomeIcon icon={faHeadphones} />
              <span>&nbsp;by Otho</span>
            </Row>
          </Col>
          <Col>
            <Row>
              <span>2021 &nbsp;</span>
              <FontAwesomeIcon icon={faCopyright} />
              <span>&nbsp; Otho DuBois</span>
            </Row>
          </Col>
          <Col>
            <Row>
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faGithub} />
            </Row>
          </Col>
        </Row>
    </div>
  );
}

export default App;
