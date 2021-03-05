import React, {useState, useRef} from 'react'

import KeyValPair from './components/KeyValPair'
import Footer from './components/Footer'
import AlertBox from './components/AlertBox'
import {capitalize,smashObj,splitArrByKeyword,copy,validResponse} from './utils/helpers'
import {validate,data} from './utils'
import './App.css'

import {Button,InputGroup, InputGroupAddon, Input, Container, Row, Col, Collapse, Alert} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faGithub,faInstagram} from '@fortawesome/free-brands-svg-icons'
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
    const res = validate(url)
    let obj = {}
    Object.keys(res[0]).forEach(key => obj[key] = res[0][key])
    setStatus(validResponse(obj))
    setUrlObj(obj)
    setErrs(res[1])
  }

  const errArr = splitArrByKeyword(errs,"fatal")
  let errors = errArr[0], warnings = errArr[1]

  const validUrl = smashObj(urlObj)

  return (
    <Container fluid={true} className="App light">
      <header>
        <h1>URL Validator</h1>
      </header>
      <main>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Input</InputGroupAddon>
          <Input placeholder="Add your URL here" innerRef={inputRef} />
          <InputGroupAddon addonType="append"><Button color="primary" onClick={checkUrl}>Validate</Button></InputGroupAddon>
        </InputGroup>
        <hr />
        <InputGroup>
          <InputGroupAddon addonType="prepend">Validated</InputGroupAddon>
          <Input disabled={true} value={
            status === null ? "Your validated/formatted URL will appear here!" : (
              status === true ? validUrl : "Unable to format this URL, check errors"
            )
          } invalid={status === false ? true : false} valid={status === true ? true : false} />
          <InputGroupAddon addonType="append"><Button onClick={copy(validUrl)} disabled={status === true ? false : true} color="info">Copy&nbsp;<FontAwesomeIcon icon={faCopy} /></Button></InputGroupAddon>
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
                      <Col key={i}>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">{key}</InputGroupAddon>
                          <Input disabled={true} value={val} />
                        </InputGroup>           
                      </Col>         
                    ) : ""
                  })
                }
              <br></br>
              </Row>
              <Row>
                <AlertBox title="Warning(s)" arr={warnings} />
                <AlertBox title="Error(s)" arr={errors} color="danger" />
              </Row>
            </div>
          )
        }
          <div>
            <Button color="gray-dark" onClick={toggle}>
              <Row className="light">&nbsp;How does it work?&nbsp;
                <p style={dropdownOpen === false ? {
                  transform:"rotate(270deg)"} : {transform:"rotate(90deg)"}
            }>&#8250;&nbsp;
            </p>
            </Row>
            </Button>
            <Collapse isOpen={dropdownOpen}>
              <article>
                <p>This is a URL validation function built with vanilla JavaScript. The example provided was bootstrapped in React.js using create-react-app.
                  The function breaks apart, and validates a URL using Regular Expressions and the&nbsp;
                  <a href="https://www.w3.org/Addressing/URL/url-spec.txt">URL Syntax Specifications</a>.
                </p>
                <p>This was built with the intention of being added into a larger JavaScript toolkit package.</p>
                <h4>Parts of URL Validation</h4>
                <p>This will breakdown the parts of a URL, and what is used to validate. This can be helpful documentation for understanding warnings 
                  and/or errors above.
                </p>
                {
                  Object.keys(data).map((key,i) => {
                    let obj = data[key]
                    return(
                      <div key={i} style={{textAlign:"left"}}>
                        <h5>{capitalize(obj.name)}</h5>
                        {
                          obj.example !== null ? (
                            <KeyValPair keyItem="Example(s)" valItem={obj.example} />
                          ) : ""
                        }
                        <KeyValPair keyItem="Required" valItem={(obj.req === true ? "True" : "False")} />
                        <KeyValPair keyItem="RegEx" valItem={obj.regex.toString()} />
                        <KeyValPair keyItem="Description" valItem={obj.description} />
                      </div>
                    )
                  })
                }
              </article>
            </Collapse>
          </div>
      </main>
      <br />
      <Footer 
        owner={{
          name: "Otho DuBois",
          link: "https://othodubois.com"
        }}
        socials={[
          {
            link: "https://www.instagram.com/okd_v/",
            icon: faInstagram,
            color: "purple"
          },
          {
            link: "https://github.com/okdv",
            icon: faGithub
          }
        ]}
      />
    </Container>
  );
}

export default App;
