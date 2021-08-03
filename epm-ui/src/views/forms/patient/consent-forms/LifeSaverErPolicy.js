// ** React Imports
import React, {useEffect, useState} from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import SignatureCanvas from 'react-signature-canvas'
import 'cleave.js/dist/addons/cleave-phone.us'
import {FileText} from "react-feather"
import { useForm, Controller } from 'react-hook-form'
import {Row, Col, Button, Label, FormGroup, Input, CustomInput, Card, CardHeader, CardBody} from 'reactstrap'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils
import { getUserRole } from '@utils'
import {useDispatch, useSelector} from "react-redux"
import {canvasToString} from "../../utils"

const ROLE_PATIENT = 'patient'

const LifeSaverErPolicy = () => {

  const userRole = getUserRole()
  const dispatch = useDispatch()
  const store = useSelector(state => state.patient?.selectedData)

  const [declareChk, setDeclareChk] = useState(store?.lifeSaverErPolicy?.declareChk || null)
  const [declareTxt, setDeclareTxt] = useState(store?.lifeSaverErPolicy?.declareTxt)

  const [payChk, setPayChk] = useState(store?.lifeSaverErPolicy?.payChk || null)

  const [printedName, setPrintedName] = useState(store?.lifeSaverErPolicy?.printedName || null)

  const [patientSignRef, setPatientSignRef] = useState(store?.lifeSaverErPolicy?.patientSignRef || null)
  const [patientSign, setPatientSign] = useState(store?.lifeSaverErPolicy?.patientSign || null)
  const [patientSignedDate, setPatientSignedDate] = useState(store?.lifeSaverErPolicy?.patientSignedDate || new Date())

  const [staffSignRef, setStaffSignRef] = useState(null)
  const [staffSign, setStaffSign] = useState(store?.lifeSaverErPolicy?.staffSign || null)
  const [staffWitness, setStaffWitness] = useState(store?.lifeSaverErPolicy?.staffWitness)
  const [staffSignDate, setStaffSignDate] = useState(store?.lifeSaverErPolicy?.staffSignDate || new Date())

  function clearSignature (name) {
    if (name === 'patientSign') {
      setPatientSign('')
      patientSignRef.clear()
    }
    if (name === 'staffSign') {
      setStaffSign('')
      staffSignRef.clear()
    }
  }

  useEffect(() => {
    if (patientSign !== null) setPatientSign(canvasToString(patientSignRef))
    if (staffSign !== null) setStaffSign(canvasToString(staffSignRef))

    if (userRole !== ROLE_PATIENT) {
      if (patientSignRef !== null) patientSignRef.off()
    }
    if (userRole === ROLE_PATIENT) {
      if (staffSignRef !== null) staffSignRef.off()
    }
  }, [patientSignRef, staffSignRef])

  useEffect(() => {
    let newData = store
    newData = {...newData,
      ["lifeSaverErPolicy"]: {
        declareChk,
        declareTxt,
        payChk,
        printedName,
        patientSign,
        patientSignedDate,
        staffSign,
        staffWitness,
        staffSignDate
      }
    }
    dispatch({
      type: 'SELECTED_DATA',
      selectedData: newData
    })

  }, [
    declareChk, declareTxt, payChk, printedName, patientSign, patientSignedDate, staffSign,
    staffWitness, staffSign, staffSignDate
  ])

  return (

      <Card>
        <CardHeader>
          <Col lg={'12'} className={'mt-1'} style={{textAlign: 'center'}}>
            <span className='font-weight-bold' style={{ textAlign: 'center', fontSize: 20 }}>
              LIFE SAVERS ER PATIENT PAYMENT POLICY & AGREEMENT
            </span>
          </Col>
        </CardHeader>

        <CardBody>
          <Row>
            <Col className={'mt-1'} lg='12' style={{textAlign: 'left'}}>
              <span>In consideration of my particular Medical needs and Care expenses to be incurred solely based on
                such Medical needs, and my financial ability to pay for such recommended Medical services without or
                even with applicable Insurance Coverage, and with understanding and agreement that I am personally
                financially and legally obligated to and responsible for any and all professional actual total charges
                regardless of any applicable insurance coverage.
              </span>
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='12' style={{textAlign: 'left'}}>
              <CustomInput inline type='checkbox' id='declareChk' name='declareChk'
                           label={<span className='font-weight-bold'>
                             I hereby declare that I have financial difficulty to pay for part or all expenses because
                             of the following:</span>}
                           checked={store?.lifeSaverErPolicy?.declareChk === true}
                           onChange={() => setDeclareChk(!store?.lifeSaverErPolicy?.declareChk)}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
            <Col>
              <Input type='textarea' id='declareTxt' placeholder='' name='declareTxt'  rows='4'
                     defaultValue={store?.lifeSaverErPolicy?.declareTxt || null}
                     className={classnames('form-control', {})}
                     onChange={e => setDeclareTxt(e.target.value)}
                     disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='12' style={{textAlign: 'left'}}>
              <CustomInput inline type='checkbox' id='payChk' name='payChk'
                           label={<span className='font-weight-bold' >
                             I will pay Full or any charges for my medically necessary care expenses. </span>}
                           checked={store?.lifeSaverErPolicy?.payChk === true}
                           onChange={() => setPayChk(!store?.lifeSaverErPolicy?.payChk)}
                           disabled={userRole !== ROLE_PATIENT}
              />

            </Col>
          </Row>

          <Row className={'mt-2'}>
            <Col lg='12' style={{textAlign: 'left'}}>
              <span className='font-weight-bold'>Life Savers Emergency Room will provide a Medical Screening Exam
                and stabilization regardless of ability to pay.
              </span>
            </Col>
          </Row>

          <Row className={'mt-2'}>
            <Col lg='12' style={{textAlign: 'left' }}>
              <span className='font-weight-bold' style={{fontStyle: 'italic', textDecorationLine: 'underline'}}>
                If the responsible party or the responsible party insurance does not cover some or all of
                the my medically necessary care expenses or if my claim is denied. I was fully informed of
                my important medical treatment options and necessity solely based on my particular medical
                needs.
              </span>
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label for='printedName'>Patient Name:</Label>
                <Input id='printedName' placeholder='' name='printedName'
                       className={classnames('form-control', {})}
                       defaultValue={store?.lifeSaverErPolicy?.printedName || null}
                       onChange={e => setPrintedName(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className={'mt-0'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label>Signature of Patient</Label>
                <div className={'block-example border border-gray'}>
                  <SignatureCanvas id='patientSign' penColor='black'
                                   canvasProps={{width: 450, height: 100, className: 'sigCanvas'}}
                                   ref={(ref) => { setPatientSignRef(ref) }}
                                   onEnd={() => setPatientSign(canvasToString(patientSignRef))}
                  />
                </div>
                <Button className={'mt-0'} onClick={() => clearSignature('patientSign')} outline
                        disabled={userRole !== ROLE_PATIENT}>
                  Clear
                </Button>
              </FormGroup>
            </Col>
            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label for='patientSignedDate'> Date</Label>
                <Flatpickr
                  id='patientSignedDate'
                  name='patientSignedDate'
                  options={{dateFormat: 'Y-m-d'}}
                  placeholder='YYYY-MM-DD'
                  defaultValue={patientSignedDate}
                  value={store?.lifeSaverErPolicy?.patientSignedDate}
                  onChange={date => setPatientSignedDate(date[0].toISOString().slice(0, 10))}
                  className={classnames('form-control')}
                  disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label for='staffWitness'>Staff Witness:</Label>
                <Input id='staffWitness' placeholder='' name='staffWitness'
                       className={classnames('form-control', {})}
                       defaultValue={store?.lifeSaverErPolicy?.staffWitness || null}
                       onChange={e => setStaffWitness(e.target.value)}
                       disabled={userRole === ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className={'mt-0'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label>Signature of Staff: </Label>
                <div className={'block-example border border-gray'}>
                  <SignatureCanvas id='staffSign' penColor='black'
                                   canvasProps={{width: 450, height: 100, className: 'sigCanvas'}}
                                   ref={(ref) => { setStaffSignRef(ref) }}
                                   onEnd={() => setStaffSign(canvasToString(staffSignRef))}
                  />
                </div>
                <Button className={'mt-0'} onClick={() => clearSignature('staffSign')} outline
                        disabled={userRole === ROLE_PATIENT}
                >
                  Clear
                </Button>
              </FormGroup>
            </Col>

            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label for='staffSignDate'> Date</Label>
                <Flatpickr
                  id='staffSignDate'
                  name='staffSignDate'
                  options={{dateFormat: 'Y-m-d'}}
                  placeholder='YYYY-MM-DD'
                  defaultValue={staffSignDate}
                  value={store?.lifeSaverErPolicy?.staffSignDate}
                  onChange={date => setStaffSignDate(date[0].toISOString().slice(0, 10))}
                  className={classnames('form-control')}
                  disabled={userRole === ROLE_PATIENT}
                />
              </FormGroup>
            </Col>

          </Row>
          
        </CardBody>
      </Card>

  )
}
export default LifeSaverErPolicy
