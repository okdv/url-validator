import React, {useState, useRef} from 'react'
import Heading from './components/Heading'
import validateUrl from './validate'
import './App.css'

import {
  Button,
  InputGroup, InputGroupAddon, Input, Container, Row, Col, Card, CardTitle, CardText, Collapse
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faExclamationTriangle, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [returnVal, setReturnVal] = useState(null)
  const [returnErrs, setReturnErrs] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const inputRef = useRef(null)

  const toggle = () => setDropdownOpen(!dropdownOpen)
  const updateCycle = () => {
    let input = inputRef.current.value || null
    if (input !== null && input !== returnVal) {
      let urlResponse = validateUrl(input)
      setReturnVal(urlResponse.response)
      setReturnErrs(urlResponse.errors)
    }
  }

  return (
    <div className="App">
      <header>
        <Heading 
          title="URL Validator"
          subtitle="This is a basic url validation tool built with vanilla JavaScript, however the example displayed here uses React.js and was bootstrapped with create-react-app"
        />
      </header>
      <Container>
          <Row>
            <InputGroup>
              <InputGroupAddon addonType="prepend">URL:</InputGroupAddon>
              <Input innerRef={inputRef} />
              <InputGroupAddon addonType="append"><Button onClick={updateCycle}>Validate!</Button></InputGroupAddon>
            </InputGroup>
          </Row>
          <br></br>
          <Row>
            <Col>
            <Row>
              <Heading title="Pass:" tag="h2" />
              {
                returnVal === null ? (<FontAwesomeIcon size="2x" icon={faHourglassHalf} />) : (
                  returnErrs && returnErrs.length === 0 ? (<FontAwesomeIcon style={{color:'green'}} size="2x" icon={faCheck} />) : (<FontAwesomeIcon style={{color:'orange'}} size='2x' icon={faExclamationTriangle} />)
                )
              }
            </Row>
            </Col>
            <Col>
            <Card className="Card" body>
              <CardTitle tag="h3">Issues found:</CardTitle>
              {
                returnErrs && returnErrs.length === 0 ? (<CardText>Any errors will appear here!</CardText>) : (
                  returnErrs.map((err) => {
                    return <CardText>{err}</CardText>
                  })
                )
              }
              <Button>Read about URL specifications</Button>
            </Card>
            </Col>
          </Row>
          <Row>
          <Heading 
            title="Formatted URL:" 
            tag="h2" 
            subtitle={returnVal !== null ? returnVal : "Validate a URL with the input above and it will appear here!"}
          />
          </Row>
          <div>
            <Button onClick={toggle}>How does it work?</Button>
            <Collapse isOpen={dropdownOpen}>
              Im Collapsed
            </Collapse>
          </div>
      </Container>
      <footer></footer>
    </div>
  );
}

export default App;
