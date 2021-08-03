// ** React Imports
import React, {useEffect, useState} from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import SignatureCanvas from 'react-signature-canvas'
import 'cleave.js/dist/addons/cleave-phone.us'
import {Row, Col, Button, Label, FormGroup, Input, CardHeader, CardBody, Card} from 'reactstrap'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils
import { getUserRole } from '@utils'
import {useDispatch, useSelector} from "react-redux"
import {canvasToString} from "../../utils"

const ROLE_PATIENT = 'patient'


const PatientRights = () => {

  const userRole = getUserRole()
  const dispatch = useDispatch()
  const store = useSelector(state => state.patient?.selectedData)

  const [patientSignRef, setPatientSignRef] = useState(null)
  const [patientSign, setPatientSign] = useState(store?.patientRights?.patientSign || null)
  const [patientSignedDate, setPatientSignedDate] = useState(store?.patientRights?.patientSignedDate || new Date())

  const [relativeSignRef, setRelativeSignRef] = useState(null)
  const [relativeSign, setRelativeSign] = useState(store?.patientRights?.relativeSign || null)
  const [relativeSignedDate, setRelativeSignedDate] = useState(store?.patientRights?.relativeSignedDate || new Date())

  const [relationship, setRelationship] = useState(store?.patientRights?.relationship || null)

  function clearSignature (name) {
    if (name === 'patientSign') {
      setPatientSign('')
      patientSignRef.clear()
    }
    if (name === 'relativeSign') {
      setRelativeSign('')
      relativeSignRef.clear()
    }
  }

  useEffect(() => {
    if (patientSign !== null) setPatientSign(canvasToString(patientSignRef))
    if (relativeSign !== null) setRelativeSign(canvasToString(relativeSignRef))

    if (userRole !== ROLE_PATIENT) {
      if (patientSignRef !== null) patientSignRef.off()
      if (relativeSignRef !== null) relativeSignRef.off()
    }
  }, [patientSignRef, relativeSignRef])

  useEffect(() => {
    let newData = store
    newData = {...newData,
      ["patientRights"]: {
        patientSign,
        relativeSign,
        patientSignedDate,
        relationship,
        relativeSignedDate
      }
    }
    dispatch({
      type: 'SELECTED_DATA',
      selectedData: newData
    })

  }, [patientSign, patientSignedDate, relativeSign, relativeSignedDate, relationship])

  return (
      <Card>
        <CardHeader>
          <Col lg={'12'} className={'mt-1'} style={{textAlign: 'center'}}>
            <span className='font-weight-bold' style={{ textAlign: 'center', fontSize: 20 }}>
              PATIENT’S RIGHTS AND RESPONSIBILITIES
            </span>
          </Col>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg='12' className={'mt-1'}>
              <div style={{textAlign: 'left'}}>
            <span className={'mt-1'}>
              <li>be informed of their rights and responsibilities</li>
              <li>have a family member, chosen representative and/or their physician promptly of arrival to the Life Savers Emergency Room</li>
              <li>receive treatment and medical services without discrimination based on age, race, ethnicity, religion, culture, language, physical or mental disability, socioeconomic status, sex, sexual orientation, or gender identity or expression.</li>
              <li>be treated with consideration, respect, and recognition of their individuality.</li>
              <li>be informed of the names and functions of all physicians and other healthcare professionals providing their direct care.</li>
              <li>Receive the services of a translator or interpreter to facilitate the communication between the patient and the hospital’s healthcare professionals.</li>
              <li>Receive visitors that they designate, including, but not limited to, a domestic partner (including a same-sex domestic partner), another family member, or a friend, and they have the right to withdraw or deny this visitation consent at any time.</li>
              <li>participate in the development and implementation of their plan of care as well as make informed decisions regarding their care.</li>
              <li>be informed of their health status, involved in care planning and treatment, and allowed to request or refuse treatment.</li>
              <li>be included or to refuse to be included in experimental research.</li>
              <li>Have a full explanation if they are being transferred to another facility.</li>
              <li>be informed if the hospital has authorized other institutions to participate in their treatment. Patients have the right to know the identity and function of theses institutions, and to refuse to allow the institutions to participate in their treatment.</li>
              <li>formulate advance directives and have physicians and other healthcare professionals comply with these directives.</li>
              <li>be informed by their physician and other health care professionals about any continuing health care requirements after their discharge.</li>
              <li>receive assistance from their physician and other healthcare professionals about any continuing healthcare requirements after their discharge.</li>
              <li>receive assistance from their physician and appropriate healthcare professionals in arranging for required follow-up care.</li>
              <li>have their medical records kept confidential as well as have access to their medical records within a reasonable time frame.</li>
              <li>be free from all forms of abuse and harassment.</li>
              <li>receive care in a safe setting.</li>
              <li>examine and receive an explanation of their bill and may receive information relating to financial assistance available.</li>
              <li>be informed in writing about the hospital’s policies and procedures for initiation, review and resolution of patient complaints, including the address and telephone number of where to file complaints with the Department of Health and Human Services.</li>
            </span>
              </div>
            </Col>

            <Col lg={'12'} className={'mt-1'} style={{textAlign: 'center'}}>
          <span className='font-weight-bold' style={{ textAlign: 'center'}}>
            Patients have the responsibility to ….
          </span>
            </Col>
            <Col>
          <span>
            <li>provide information, follow instructions, follow the facility’s rules and regulations, ask questions and meet financial obligations.</li>
          </span>
              <span><br/><br/>Should you have a complaint or grievance related to Life Savers Emergency Room, you may request to speak with the facility’s Patient Representative or Administrator</span>
            </Col>
          </Row>
          <Row>
            <Col className={'mt-1'} lg='12'>
              <Label className={'font-weight-bold'}>If your complaint is not resolved to your satisfaction, you may contact:</Label>
            </Col>

            <Col className={'mt-1'} lg='6' style={{textAlign: 'center'}}>
          <span>Department of State Health Services <br/>
          Health Facility Compliance Group (MC 1979) <br/>
          Texas Department of State Health Services
          </span>
            </Col>
            <Col className={'mt-1'} lg='6' style={{textAlign: 'center'}} >
          <span> Complaint hotline: <br/>
          (888) 973-0022
          </span>
            </Col>

            <Col className={'mt-1'} lg='6' md='12' sm='6'>
              <FormGroup>
                <Label for='patientSign'>Patient Signature :</Label>
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
            <Col className={'mt-1'} lg='6' md='6' sm='6'>
              <FormGroup>
                <Label for='patientSignedDate'> Date: </Label>
                <Flatpickr
                  id='patientSignedDate'
                  name='patientSignedDate'
                  options={{dateFormat: 'Y-m-d'}}
                  placeholder='YYYY-MM-DD'
                  defaultValue={patientSignedDate}
                  value={store?.patientRights?.patientSignedDate}
                  onChange={date => setPatientSignedDate(date[0].toISOString().slice(0, 10))}
                  className={classnames('form-control')}
                  disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>

            <Col className={'mt-1'} lg='4' md='12' sm='6'>
              <FormGroup>
                <Label>Signature behalf of Patient/QPR :</Label>
                <div className={'block-example border border-gray'}>
                  <SignatureCanvas id='relativeSign' penColor='black'
                                   canvasProps={{width: 450, height: 100, className: 'sigCanvas'}}
                                   ref={(ref) => { setRelativeSignRef(ref) }}
                                   onEnd={() => setRelativeSign(canvasToString(relativeSignRef))}
                  />
                </div>
                <Button className={'mt-0'} onClick={() => clearSignature('relativeSign')} outline
                        disabled={userRole !== ROLE_PATIENT}>
                  clear
                </Button>
              </FormGroup>
            </Col>

            <Col className={'mt-1'} lg='4' md='6' sm='6'>
              <FormGroup>
                <Label for=''>RelationShip </Label>
                  <Input id='relationship' placeholder='' name='relationship'
                         className={classnames('form-control', {})}
                         defaultValue={store?.patientRights?.relationship || null}
                         onChange={e => setRelationship(e.target.value)}
                         disabled={userRole !== ROLE_PATIENT}
                  />
              </FormGroup>
            </Col>

            <Col className={'mt-1'} lg='4' md='6' sm='6'>
              <FormGroup>
                <Label for='relativeSignedDate'> Date: </Label>
                <Flatpickr
                  id='relativeSignedDate'
                  name='relativeSignedDate'
                  options={{dateFormat: 'Y-m-d'}}
                  placeholder='YYYY-MM-DD'
                  value={store?.patientRights?.relativeSignedDate}
                  onChange={date => setRelativeSignedDate(date[0].toISOString().slice(0, 10))}
                  className={classnames('form-control')}
                  disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>

          </Row>
        </CardBody>
      </Card>

  )
}
export default PatientRights
