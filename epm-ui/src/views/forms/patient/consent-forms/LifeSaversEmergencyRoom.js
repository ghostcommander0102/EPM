// ** React Imports
import React, {useEffect, useState} from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import SignatureCanvas from 'react-signature-canvas'
import 'cleave.js/dist/addons/cleave-phone.us'
import {FileText} from "react-feather"
import { useForm, Controller } from 'react-hook-form'
import {Row, Col, Button, Label, FormGroup, Input, CustomInput, Card, CardHeader, CardTitle, CardBody} from 'reactstrap'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils
import { getUserRole } from '@utils'
import {useDispatch, useSelector} from "react-redux"
import {canvasToString} from "../../utils"

const ROLE_PATIENT = 'patient'


const LifeSaversEmergencyRoom = () => {
  const userRole = getUserRole()
  const dispatch = useDispatch()
  const store = useSelector(state => state.patient?.selectedData)

  const [isDeclined, setIsDeclined] = useState(store?.lifeSaversEmergencyRoom?.isDecline || null)

  const [patientSignRef, setPatientSignRef] = useState(null)
  const [patientSign, setPatientSign] = useState(store?.lifeSaversEmergencyRoom?.patientSign || null)
  const [patientSignedDate, setPatientSignedDate] = useState(store?.lifeSaversEmergencyRoom?.patientSignedDate || new Date())

  const [guardian, setGuardian] = useState(store?.lifeSaversEmergencyRoom?.guardian || null)

  const [qprSignRef, setQPRSignRef] = useState(null)
  const [qprSign, setQPRSign] = useState(store?.lifeSaversEmergencyRoom?.qprSign || null)
  const [qprName, setQPRName] = useState(store?.lifeSaversEmergencyRoom?.qprName || null)

  const [behalf, setBehalf] = useState(store?.lifeSaversEmergencyRoom?.behalf || null)

  const [staffSignRef, setStaffSignRef] = useState(null)
  const [staffSign, setStaffSign] = useState(store?.lifeSaversEmergencyRoom?.staffSign || null)
  const [staffWitness, setStaffWitness] = useState(store?.lifeSaversEmergencyRoom?.staffWitness || null)

  function clearSignature (name) {
    if (name === 'patientSign') {
      setPatientSign('')
      patientSignRef.clear()
    }
    if (name === 'qprSign') {
      setQPRSign('')
      qprSignRef.clear()
    }
    if (name === 'staffSign') {
      setStaffSign('')
      staffSignRef.clear()
    }
  }

  useEffect(() => {
    if (patientSign !== null) setPatientSign(canvasToString(patientSignRef))
    if (qprSign !== null) setQPRSign(canvasToString(qprSignRef))
    if (staffSign !== null) setStaffSign(canvasToString(staffSignRef))

    if (userRole !== ROLE_PATIENT) {
      if (patientSignRef !== null) patientSignRef.off()
      if (qprSignRef !== null) qprSignRef.off()
    }

    if (userRole === ROLE_PATIENT) {
      if (staffSignRef !== null) staffSignRef.off()
    }
  }, [patientSignRef, qprSignRef, staffSignRef])

  useEffect(() => {
    let newData = store
    newData = {...newData,
      ["lifeSaversEmergencyRoom"]: {
      isDeclined,
        patientSign,
        patientSignedDate,
        guardian,
        qprSign,
        qprName,
        behalf,
        staffSign,
        staffWitness
      }
    }
    dispatch({
      type: 'SELECTED_DATA',
      selectedData: newData
    })

  }, [isDeclined, patientSign, patientSignedDate, guardian, qprName, behalf, staffSign, staffWitness])


  return (
      <Card>
        <CardHeader>
          <Col lg={'12'} className={'mt-1'} style={{textAlign: 'center'}}>
            <span className='font-weight-bold' style={{ textAlign: 'center', fontSize: 20 }}>
              LIFE SAVERS EMERGENCY ROOM AND THE MEDICAL STAFF’S NOTICE OF PRIVACY PRACTICES ACKNOWLEDGEMENT
            </span>
          </Col>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg='12'>
              <div style={{textAlign: 'left'}}>
                <span className={'font-weight-bold'}> LIFE SAVERS EMERGENCY ROOM </span>
                <span>
              This notice describes your legal right regarding your health information and will inform you of
              the legal duties and privacy practices of Life Savers ER and its Medical Staff Members only with
              respect to health information created for services generated at Life Savers ER.  If you received
              services by your physician or other health care providers at a different location, you may want to
              ask about the office or clinic’s health information privacy policies and notices, as they could
              be different.<br/>
            </span>
              </div>

              <div className={'mt-1'} style={{textAlign: 'left'}}>
            <span>
              Life Savers Emergency Room is providing this notice of Privacy Practices in one document for your
              convenience. Life Savers Emergency Room and its Medical Staff Members are independently responsible
              for complying with this Notice.
            </span>
                <span className={'font-weight-bold'}>  We are not responsible for each other’s actions and do not
              have equal control over the other’s business
            </span>
              </div>

            </Col>
          </Row>
          <Row>
            <Col className={'mt-1'} lg='12'>
              <Label className={'font-weight-bold'}> IF you have DECLINED a Copy of this NOTICE, please INITIAL
                here and SIGN below (initial):</Label>
              <Input id='isDeclined' placeholder='' name='isDeclined'
                     className={classnames('form-control', {})}
                     defaultValue={store?.lifeSaversEmergencyRoom?.isDeclined || null}
                     onChange={e => setIsDeclined(e.target.value)}
                     disabled={userRole !== ROLE_PATIENT}
              />
            </Col>

            <Col className={'mt-1'} lg='12'>
              <Row className={'mt-1 col-lg-12'}>
            <span> If you have any question regarding any information set forth in this Notice of Privacy Practices,
              please do not hesitate to call us at  832-779-5433 or  281-766-8911. </span>
              </Row>
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
                  value={store?.lifeSaversEmergencyRoom?.patientSignedDate}
                  onChange={date => setPatientSignedDate(date[0].toISOString().slice(0, 10))}
                  className={classnames('form-control')}
                  disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>

          </Row>
          <Row>
            <Col className={'mt-1'} lg='12'>
              <Label className={'font-weight-bold'} style={{textAlign: 'center'}}>
                If the consenting party is other than the patient:</Label>
            </Col>
            <Col className={'mt-1'} lg='12'>
              <Row className={'mt-1 col-lg-12'}>
                <span>I am the Qualified Personal Representative (QPR) or Legal guardian of:</span>
                <Col lg={'3'}>
                  <Input id='guardian' placeholder='' name='guardian'
                         className={classnames('form-control', {})}
                         defaultValue={store?.lifeSaversEmergencyRoom?.guardian || null}
                         onChange={e => setGuardian(e.target.value)}
                         disabled={userRole !== ROLE_PATIENT}
                  />
                </Col>
                <span>and sign on his/her behalf.  </span>
              </Row>
            </Col>

            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label>Signature of QPR or Legal Guardian: </Label>
                <div className={'block-example border border-gray'}>
                  <SignatureCanvas id='qprSign' penColor='black'
                                   canvasProps={{width: 450, height: 100, className: 'sigCanvas'}}
                                   ref={(ref) => { setQPRSignRef(ref) }}
                                   onEnd={() => setQPRSign(canvasToString(qprSignRef))}
                  />
                </div>
                <Button className={'mt-0'} onClick={() => clearSignature('qprSign')} outline>
                  clear
                </Button>
              </FormGroup>
            </Col>

            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label for='qprName'>Printed Name of QPR or Legal Guardian:</Label>
                <Input id='qprName' placeholder='' name='qprName'
                       className={classnames('form-control', {})}
                       defaultValue={store?.lifeSaversEmergencyRoom?.qprName || null}
                       onChange={e => setQPRName(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>

            <Col className={'mt-1'} lg='12' md='12' sm='12'>
              <FormGroup>
                <Label for='behalf'>Legal Authority to Act on Behalf of the Patient
                  (Relationship to patient)</Label>
                <Input id='behalf' placeholder='' name='behalf'
                       className={classnames('form-control', {})}
                       defaultValue={store?.lifeSaversEmergencyRoom?.behalf || null}
                       onChange={e => setBehalf(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>

            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label for='staffWitness'>Staff Witness :</Label>
                <Input id='staffWitness' placeholder='' name='staffWitness'
                       className={classnames('form-control', {})}
                       defaultValue={store?.lifeSaversEmergencyRoom?.staffWitness || null}
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

            <Col lg='12' className={'mt-1 d-flex justify-content-center'} >
              <span className={'font-weight-bold'} style={{textAlign: 'center'}}>
                Note: In the case of an Obstetrical Patient, this signed acknowledgement for receipt of the
                Notice of Privacy Practices also serves as receipt of Privacy Practices on behalf of the
                newborn(s).</span>
            </Col>
          </Row>
        </CardBody>
      </Card>
  )
}
export default LifeSaversEmergencyRoom
