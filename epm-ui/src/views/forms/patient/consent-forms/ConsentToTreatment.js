// ** React Imports
import React, {useEffect, useState} from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import SignatureCanvas from 'react-signature-canvas'
import 'cleave.js/dist/addons/cleave-phone.us'
import {Row, Col, Button, Label, FormGroup, Input, Card, CardHeader, CardText, CardBody, CardTitle } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils
import { getUserRole } from '@utils'
import {useDispatch, useSelector} from "react-redux"
import {canvasToString} from '../../utils'
const ROLE_PATIENT = 'patient'

const ContentToTreatment = () => {
  const userRole = getUserRole()
  const dispatch = useDispatch()
  const store = useSelector(state => state.patient?.selectedData)

  const [patientSignRef, setPatientSignRef] = useState(null)
  const [patientSign, setPatientSign] = useState(store?.contentToTreatment?.patientSign || null)
  const [patientSignedDate, setPatientSignedDate] = useState(store?.contentToTreatment?.patientSignedDate || new Date())

  const [relativeSignRef, setRelativeSignRef] = useState(null)
  const [relativeSign, setRelativeSign] = useState(store?.contentToTreatment?.relativeSign || null)
  const [relativeSignedDate, setRelativeSignedDate] = useState(store?.contentToTreatment?.relativeSignedDate || new Date())

  const [relationship, setRelationship] = useState(store?.contentToTreatment?.relationship || null)

  const [staffSignRef, setStaffSignRef] = useState(null)
  const [staffSign, setStaffSign] = useState(store?.contentToTreatment?.staffSign || null)
  const [staffWitness, setStaffWitness] = useState(store?.contentToTreatment?.staffWitness || null)

  function clearSignature (name) {
    if (name === 'patientSign') {
      setPatientSign('')
      patientSignRef.clear()
    }
    if (name === 'relativeSign') {
      setRelativeSign('')
      relativeSignRef.clear()
    }
    if (name === 'staffSign') {
      setStaffSign('')
      staffSignRef.clear()
    }
  }

  useEffect(() => {
    if (patientSign !== null) setPatientSign(canvasToString(patientSignRef))
    if (relativeSign !== null) setRelativeSign(canvasToString(relativeSignRef))
    if (staffSign !== null) setStaffSign(canvasToString(staffSignRef))

    if (userRole !== ROLE_PATIENT) {
      if (patientSignRef !== null) patientSignRef.off()
      if (relativeSignRef !== null) relativeSignRef.off()
    }
    if (userRole === ROLE_PATIENT) {
      if (staffSignRef !== null) staffSignRef.off()
    }
  }, [patientSignRef, relativeSignRef, staffSignRef])

  useEffect(() => {
    let newData = store
    newData = {...newData,
      ["contentToTreatment"]: {
      patientSign,
        relativeSign,
        patientSignedDate,
        relationship,
        relativeSignedDate,
        staffSign,
        staffWitness
      }
    }
    dispatch({
      type: 'SELECTED_DATA',
      selectedData: newData
    })

  }, [patientSign, patientSignedDate, relativeSign, relativeSignedDate, relationship, staffWitness, staffSign])

  return (
      <Card>
        <CardHeader>
          <Col lg={'12'} className={'mt-1'} style={{textAlign: 'center'}}>
            <span className='font-weight-bold' style={{ textAlign: 'center', fontSize: 20 }}>
              CONSENT TO TREATMENT
            </span>
          </Col>
        </CardHeader>
        <CardBody>
            <Row>
              <Col lg='12'>
                <div style={{textAlign: 'justify'}}>
                  <span className={'font-weight-bold'}> LIFE SAVERS EMERGENCY ROOM </span>
                  <span>
                    functions like a hospital based emergency room. Our mission is to provide prompt, friendly,
                    caring and quality medical treatment for a wide array of emergency medical conditions.
                    <br/> <br/> Texas insurance laws guarantee that all fully-funded medical insurance plans must pay for
                    all emergency medical claims. This is true for our facility as well. However, Life Savers Emergency
                    Room does not contract with any carriers and cannot anticipate accurately what specific rates your
                    carrier will apply to individual services. Life Savers Emergency Room may not have contractually
                    agreed to accept a particular insurance carrier’s reimbursement as payment in full for services
                    provided. At the time of your visit, we will collect your emergency room copay and bill your insurance
                    provider for your emergency room benefits. Individual plan deductibles and coinsurance notwithstanding,
                    and any non-reimbursed balance will be your individual responsibility.
                  </span>
                </div>

                <div className={'mt-1'} style={{textAlign: 'justify'}}>
                  <span className={'font-weight-bold'}> Consent to Treatment: </span>
                  <span>
                    I understand that independently contracted physicians will, at my request, order all tests and treatments
                    at Life Savers Emergency Room. I understand that medicine and surgery are not exact sciences and that
                    no guarantee or warranty has been made to me as to result or outcome. Knowing this, I consent to being
                    a patient and agree to all necessary testing and treatment while I am a patient at Life Savers Emergency
                    Room.
                  </span>
                </div>

                <div className={'mt-1'} style={{textAlign: 'justify'}}>
                  <span className={'font-weight-bold'}> Assignment of Benefits:  </span>
                  <span>
                    I authorize direct payment to be made by my insurance carrier to Life Savers Emergency Room, LLC , dba
                    Life Savers ER, for any and all medical and surgical services rendered at Life Savers Emergency Room.
                    I understand that if any of the services and charges are not covered by the insurance company, or if
                    Life Savers Emergency Room is unable to verify eligibility, I am responsible for all charges incurred
                    for services rendered. I also authorize the release of any medical records for the purpose of health
                    care operations to be released to my insurance provider.
                  </span>
                </div>

                <div className={'mt-1'} style={{textAlign: 'justify'}}>
                  <span className={'font-weight-bold'}> Accidental Exposure of Health Care Workers: </span>
                  <span>
                    I agree that if any healthcare worker is exposed to my blood or other bodily fluids, I will allow Life
                    Savers Emergency Room at its option, to test my blood for diseases including but not limited to
                    hepatitis, HIV, and syphilis. I understand that the result of these tests do not become a part of my
                    medical record. I will be responsible for the charges for any such test.
                  </span>
                </div>
              </Col>

              <Col className={'mt-1'} lg='6' md='6' sm='12'>
                <FormGroup>
                  <Label for='patientSign'>Signature of Patient:</Label>
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
                    value={store?.contentToTreatment?.patientSignedDate}
                    onChange={date => setPatientSignedDate(date[0].toISOString().slice(0, 10))}
                    className={classnames('form-control')}
                    disabled={userRole !== ROLE_PATIENT}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className={'mt-1'} lg='12'>
                <Label className={'font-weight-bold'}>If the consenting party is other than the patient:</Label>
              </Col>

              <Col className={'mt-1'} lg='12'>
                <Row className={'mt-1 col-lg-12'}>
                  <span>My relationship to the patient is </span>
                  <Col lg={'3'}>
                    <Input id='relationship' placeholder='' name='relationship'
                           className={classnames('form-control', {})}
                           defaultValue={store?.contentToTreatment?.relationship || null}
                           onChange={e => setRelationship(e.target.value)}
                           disabled={userRole !== ROLE_PATIENT}
                    />
                  </Col>
                  <span>and I have signed this consent on his/her behalf. </span>
                </Row>
              </Col>

              <Col className={'mt-1'} lg='6' md='6' sm='12'>
                <FormGroup>
                  <Label>Signature of Relative/Legal Guardian: </Label>
                  <div className={'block-example border border-gray'}>
                    <SignatureCanvas id='relativeSign' penColor='black'
                                     canvasProps={{width: 450, height: 100, className: 'sigCanvas'}}
                                     ref={(ref) => { setRelativeSignRef(ref) }}
                                     onEnd={() => setRelativeSign(canvasToString(relativeSignRef))}
                    />
                  </div>
                  <Button className={'mt-0'} onClick={() => clearSignature('relativeSign')} outline
                          disabled={userRole !== ROLE_PATIENT}>
                    Clear
                  </Button>
                </FormGroup>
              </Col>

              <Col className={'mt-1'} lg='6' md='6' sm='12'>
                <FormGroup>
                  <Label for='relativeSignedDate'> Date: </Label>
                  <Flatpickr
                    id='relativeSignedDate'
                    name='relativeSignedDate'
                    options={{dateFormat: 'Y-m-d'}}
                    placeholder='YYYY-MM-DD'
                    value={store?.contentToTreatment?.relativeSignedDate}
                    onChange={date => setRelativeSignedDate(date[0].toISOString().slice(0, 10))}
                    className={classnames('form-control')}
                    disabled={userRole !== ROLE_PATIENT}
                  />
                </FormGroup>
              </Col>

              <Col className={'mt-1'} lg='6' md='6' sm='12'>
                <FormGroup>
                  <Label for='staffWitness'>Staff Witness :</Label>
                  <Input id='staffWitness' placeholder='' name='staffWitness'
                         className={classnames('form-control', {})}
                         defaultValue={store?.contentToTreatment?.staffWitness || null}
                         onChange={e => setStaffWitness(e.target.value)}
                         disabled={userRole === ROLE_PATIENT}
                  />
                </FormGroup>
              </Col>
              <Col className={'mt-1'} lg='6' md='6' sm='12'>
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

            </Row>
          </CardBody>
      </Card>

  )
}
export default ContentToTreatment
