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

import { getUserRole } from '@utils'
import {useDispatch, useSelector} from "react-redux"
import {canvasToString} from '../../utils'
const ROLE_PATIENT = 'patient'

const FinancialSelfPayAgreement = () => {

  const userRole = getUserRole()
  const dispatch = useDispatch()
  const store = useSelector(state => state.patient?.selectedData)

  const [patientSignRef, setPatientSignRef] = useState(null)
  const [patientSign, setPatientSign] = useState(store?.financialSelfPayAgreement?.patientSign || null)
  const [patientSignedDate, setPatientSignedDate] = useState(store?.financialSelfPayAgreement?.patientSignedDate || new Date())
  const [printedName, setPrintedName] = useState(store?.financialSelfPayAgreement?.printedName || null)

  function drawBase64Img(canvasRef, base64Data) {
    if (canvasRef !== null) return canvasRef.fromDataURL(base64Data)
    else return null
  }

  function clearSignature (name) {
    if (name === 'patientSign') {
      setPatientSign('')
      patientSignRef.clear()
    }
  }

  useEffect(() => {
    if (patientSign !== null) setPatientSign(canvasToString(patientSignRef))
    if (userRole !== ROLE_PATIENT) {
      if (patientSignRef !== null) patientSignRef.off()
    }
  }, [patientSignRef])

  useEffect(() => {
    let newData = store
    newData = {...newData,
      ["financialSelfPayAgreement"]: {
        patientSign,
        patientSignedDate,
        printedName
      }
    }
    dispatch({
      type: 'SELECTED_DATA',
      selectedData: newData
    })
  }, [patientSign, patientSignedDate, printedName])


  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  return (
      <Card>
        <CardHeader>
          <Col lg={'12'} className={'mt-1'} style={{textAlign: 'center'}}>
            <span className='font-weight-bold' style={{ textAlign: 'center', fontSize: 20 }}>
              FINANCIAL NEED BASED / SELF-PAY PATIENTS
            </span>
          </Col>
        </CardHeader>

        <CardBody>
          <Row>
            <Col className={'mt-1'} lg='12' style={{textAlign: 'left'}}>
              <span>Thank you for choosing Life Savers Emergency Room. We are a fully licensed freestanding emergency
                medical care facility providing full concierge emergency services including diagnostics, imaging and
                point of care lab testing. Life Savers ER was founded on the belief that each patient is an important
                customer and deserves the highest quality emergency medicine offered in an environment of efficiency,
                convenience, and comfort.
              </span>
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='12' style={{textAlign: 'left'}}>
              <span className='font-weight-bold'  style={{textDecorationLine: 'underline'}} >
                Our basic patient rate is $285</span>
              <span>
                &nbsp;The initial patient fee will increase in accordance to the urgency and complexity
                of your medical complaint.  This will be determined during the course of your treatment. Any
                diagnostic testing, treatment(s) and or procedure(s) will be an additional charge to the initial
                fee.
              </span>
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
              <span className='font-weight-bold' style={{textDecorationLine: 'underline'}}>
                THE BASIC RATE OF $285 WILL BE COLLECTED AT THE TIME OF THE VISIT AND
                A COPY OF YOUR DRIVER’S LICENSE WILL BE TAKEN. SHOULD THE VISIT BE MORE THAN THE INITIAL $285 , YOU
                WILL BE NOTIFIED BY OUR STAFF.
              </span>
            </Col>
          </Row>

          <Row className={'mt-2'}>
            <Col lg='12' style={{textAlign: 'left'}}>
              <span className='font-weight-bold'>We accept cash, and all major credit cards.  The self-pay rates
                apply only if payment is made at TIME OF SERVICE. Any unpaid balances will be billed at our Usual
                and Customary rate of pricing. Usual and Customary rates may be made available by contacting Life
                Savers Emergency Room at (insert phone number)
              </span>
            </Col>
          </Row>

          <Row className={'mt-2'}>
            <Col lg='12' style={{textAlign: 'left'}}>
              <span>
                If you have concerns about your medical expenses, please feel free to discuss these concerns with your
                healthcare provider. Our business office staff will inform you of the cost and or/medical necessities
                relating to your treatment. You have every right to refuse a treatment and/or procedure.  However,
                doing so may hinder treatment and/or limit an accurate diagnosis of your medical condition.
              </span>
            </Col>
            <Col lg={'12'} className={'mt-1 align-items-center'} style={{textAlign: 'center'}}>
              <span style={{  textAlign: 'center'}}>
                Again, THANK YOU for choosing Life Savers Emergency Room.
              </span>
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label>Signature of Patient or Legal Guardian</Label>
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
                <Label> Date</Label>
                <Flatpickr
                  id='patientSignedDate'
                  name='patientSignedDate'
                  options={{dateFormat: 'Y-m-d'}}
                  placeholder='YYYY-MM-DD'
                  defaultValue={patientSignedDate}
                  value={store?.financialSelfPayAgreement?.patientSignedDate}
                  onChange={date => setPatientSignedDate(date[0].toISOString().slice(0, 10))}
                  className={classnames('form-control')}
                  disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label for='printedName'>Print Patient Name</Label>
                <Input id='printedName' placeholder='' name='printedName'
                       className={classnames('form-control', {})}
                       defaultValue={store?.financialSelfPayAgreement?.printedName || null}
                       onChange={e => setPrintedName(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>

          </Row>
          
        </CardBody>
      </Card>

  )
}
export default FinancialSelfPayAgreement
