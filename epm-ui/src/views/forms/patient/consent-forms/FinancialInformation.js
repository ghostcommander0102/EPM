// ** React Imports
import React, {useEffect, useState} from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import SignatureCanvas from 'react-signature-canvas'
import 'cleave.js/dist/addons/cleave-phone.us'
import {FileText} from "react-feather"
import { useForm, Controller } from 'react-hook-form'

import {
  Row,
  Col,
  Form,
  CardBody,
  Card,
  Label,
  FormGroup,
  Input,
  CustomInput,
  Button,
  CardHeader,
  CardTitle
} from 'reactstrap'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'


import { getUserRole } from '@utils'
import {useDispatch, useSelector} from "react-redux"
import {canvasToString} from '../../utils'
const ROLE_PATIENT = 'patient'


const FinancialInformation = () => {
  const userRole = getUserRole()
  const dispatch = useDispatch()
  const store = useSelector(state => state.patient?.selectedData)

  const [patientSignRef, setPatientSignRef] = useState(null)
  const [patientSign, setPatientSign] = useState(store?.financialInformation?.patientSign || null)
  const [patientSignedDate, setPatientSignedDate] = useState(store?.financialInformation?.patientSignedDate || new Date())
  const [printedName, setPrintedName] = useState(store?.financialInformation?.printedName || null)
  const [chkOther, setChkOther] = useState(store?.financialInformation?.chkOther || null)

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
      ["financialInformation"]: {
        patientSign,
        patientSignedDate,
        printedName,
        chkOther
      }
    }
    dispatch({
      type: 'SELECTED_DATA',
      selectedData: newData
    })
  }, [patientSign, patientSignRef, patientSignedDate, printedName, chkOther])

  return (
      <Card>
        <CardHeader>
          <Col lg={'12'} className={'mt-1'} style={{textAlign: 'center'}}>
            <span className='font-weight-bold' style={{ textAlign: 'center', fontSize: 20 }}>
              FINANCIAL INFORMATION
            </span>
          </Col>
        </CardHeader>
        <CardBody>
          <Row>
            <Col style={{textAlign: 'justify'}}>
            <span>
              At the time of service, we will make a copy of (one or the other)  your Government
              Issued Driver’s License, ID, Passport ,Visa and Insurance card.
            </span>
            </Col>
            <Col lg={'12'} className={'mt-1'} style={{textAlign: 'center'}}>
            <span className='font-weight-bold'
                  style={{ fontStyle: 'italic', textDecorationLine: 'underline', textAlign: 'center', fontSize: 20 }}>
              Please note that we are an independent, fully licensed, Freestanding Emergency Medical Care Facility.
            </span>
            </Col>

            <Col className={'mt-1'}  style={{textAlign: 'justify'}}>
            <span>
              Shortly after your visit, you will be receiving an Explanation of Benefits (EOB) from your insurance
              company.  Please remember that your EOB is an Explanation of your Benefits, and is not a bill.
              We submit our bills to your insurance company as out of network, through all Emergency Medical Care
              Facilities are legally in network. Any portion of your bill that is the patient responsibility will
              be adjusted to in network rates when our billing company sends your statement.
            </span>
            </Col>

            <Col lg={'12'} className={'mt-1'}>
              You may
              <span className='font-weight-bold' style={{ fontSize: 20 }}>
              PAY</span>
              your
              <span className='font-weight-bold' style={{ fontSize: 20 }}>
              BALANCE</span>
              at
              <span className='font-weight-bold' style={{ fontSize: 20 }}>
              ANY Life Savers Emergency Room </span>
              Located at
              <span className='font-weight-bold' style={{ fontSize: 20 }}>
              17685 TOMBALL PARKWAY HOUSTON, TX 77064</span>
              or
              <span className='font-weight-bold' style={{ fontSize: 20 }}>
              3820 N. SHEPHERD DR. SUITE A HOUSTON, TX 77018 </span>
              or remit by mail.
            </Col>

            <Col className={'mt-1'}  style={{textAlign: 'justify'}}>
            <span>
              Please include your account number on your check. For your convenience, Life Savers Emergency Room also accepts all major credit cards.
              <br/><br/>
              An itemized statement of your visit is available upon request to our Billing Department.
            </span>
            </Col>

          </Row>
          <Row>
            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label>Signature of Patient or Legal Guardian: </Label>
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
                <Label for='patientSignedDate'> Date: </Label>
                <Flatpickr
                  id='patientSignedDate'
                  name='patientSignedDate'
                  options={{dateFormat: 'Y-m-d'}}
                  placeholder='YYYY-MM-DD'
                  defaultValue={patientSignedDate}
                  value={store?.financialInformation?.patientSignedDate}
                  onChange={date => setPatientSignedDate(date[0].toISOString().slice(0, 10))}
                  className={classnames('form-control')}
                  disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>

            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label for='printedName'>Printed Patient Name :</Label>
                <Input id='printedName' placeholder='' name='printedName'
                       className={classnames('form-control', {})}
                       defaultValue={store?.financialInformation?.printedName || null}
                       onChange={e => setPrintedName(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>

            <Col lg={'12'}>
              If the signing party is other than the patient (please check box):
              <CustomInput
                type='checkbox'
                id='other' name='other'
                label='I am the Qualified Personal Representative (QPR) or Legal Guardian'
                checked={store?.financialInformation?.chkOther === true }
                onChange={(e) => setChkOther(e.target.value)}
                disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
  )
}
export default FinancialInformation
