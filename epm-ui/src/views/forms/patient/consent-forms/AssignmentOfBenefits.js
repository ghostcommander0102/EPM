// ** React Imports
import React, {useEffect, useState} from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import SignatureCanvas from 'react-signature-canvas'
import 'cleave.js/dist/addons/cleave-phone.us'
import {Row, Col, Button, Label, FormGroup, Input, Card, CardHeader, CardBody} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils
import { getUserRole } from '@utils'
import {useDispatch, useSelector} from "react-redux"
const ROLE_PATIENT = 'patient'
import {canvasToString} from '../../utils'

const AssignmentOfBenefits = () => {
  const userRole = getUserRole()
  const dispatch = useDispatch()
  const store = useSelector(state => state?.patient?.data || state.patient?.selectedData)

  const [patientSignRef, setPatientSignRef] = useState(null)
  const [patientSign, setPatientSign] = useState(store?.assignmentOfBenefits?.patientSign || null)
  const [patientSignedDate, setPatientSignedDate] = useState(store?.assignmentOfBenefits?.patientSignedDate || new Date())

  const [beQPR, setBeQPR] = useState(store?.assignmentOfBenefits?.beQPR || null)

  const [qprSignRef, setQPRSignRef] = useState(null)
  const [qprSign, setQPRSign] = useState(store?.assignmentOfBenefits?.qprSign || null)
  const [qprName, setQPRName] = useState(store?.assignmentOfBenefits?.qprName || null)

  const [behalf, setBehalf] = useState(store?.assignmentOfBenefits?.behalf || null)

  function clearSignature (name) {
    if (name === 'patientSign') {
      setPatientSign('')
      patientSignRef.clear()
    }
    if (name === 'qprSign') {
      setQPRSign('')
      qprSignRef.clear()
    }
  }

  useEffect(() => {
    if (patientSign !== null) setPatientSign(canvasToString(patientSignRef))
    if (qprSign !== null) setQPRSign(canvasToString(qprSignRef))

    if (userRole !== ROLE_PATIENT) {
      if (patientSignRef !== null) patientSignRef.off()
      if (qprSignRef !== null) qprSignRef.off()
    }
  }, [patientSignRef])

  useEffect(() => {
    let newData = store
    newData = {...newData,
      ["assignmentOfBenefits"]: {
        patientSign,
        patientSignedDate,
        qprSign,
        qprName,
        behalf,
        beQPR
      }
    }
    dispatch({
      type: 'SELECTED_DATA',
      selectedData: newData
    })

  }, [patientSign, patientSignedDate, qprSign, qprName, behalf, beQPR])

  return (
      <Card>
        <CardHeader>
          <Col lg={'12'} className={'mt-1'} style={{textAlign: 'center'}}>
            <span className='font-weight-bold' style={{ textAlign: 'center', fontSize: 20 }}>
              Assignment of Benefits: Assignment of Cause of Action: Contractual Lien
            </span>
          </Col>
        </CardHeader>

        <CardBody>
          <Row>
            <Col className={'mt-1'} lg='12' style={{textAlign: 'left'}}>
              <span>The undersigned patient and/or responsible party, in addition to continuing personal
                responsibility, and in consideration of treatment rendered or to be rendered assigns to Life Savers
                Emergency Room, the following rights, now power and authority:
              </span>
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='12' style={{textAlign: 'left'}}>
              <span className='font-weight-bold'  style={{textDecorationLine: 'underline'}} >
                RELEASE OF INFORMATION: </span>
              <span>
                &nbsp;You are authorized to release information concerning my condition and treatment to my insurance
                company, attorney, medical care Support Company or insurance adjuster for purposes of processing my
                claim for benefits and payment of services rendered to me.
              </span>
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='12' style={{textAlign: 'left'}}>
              <span className='font-weight-bold'  style={{textDecorationLine: 'underline'}} >
                IRREVOCABLE ASSIGNMENT OF RIGHTS: </span>
              <span>
                &nbsp;You are assigned the exclusive, irrevocable right to any cause of action that exists in my
                favor against any insurance company for the terms of the policy, including the exclusive
                irrevocable right to receive payment for such services, make demand in my name for payment
                and prosecute and receive penalties, interest, court loss, or other legally compensable
                amounts owned by an insurance company in accordance with Article 21.55 of the Texas Insurance
                Code to cooperate, provide information as needed, and appear as needed, wherever to assist in the
                prosecution of such claims for benefits upon request.
              </span>
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='12' style={{textAlign: 'left'}}>
              <span className='font-weight-bold'  style={{textDecorationLine: 'underline'}} >
                DEMAND FOR PAYMENT: </span>
              <span>
                &nbsp;To any insurance company providing benefits of any kind to me/us for treatment rendered
                by the physician/facility named above, you are hereby tendered demand to pay in full the bill
                for services rendered by the physician/facility named within 30 days following your receipt of
                such bill for services to the extent such bills are payable under the terms of the policy.
                This demand specifically conforms to Article 21.55 of the Texas Insurance Code, providing
                attorney fees, 18% penalty, court cost, and interest from judgement, upon violation. I further
                instruct the provider to make all checks payable to Life Savers Emergency Room, and send all
                checks to Life Savers Emergency Room  .
              </span>
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='12' style={{textAlign: 'left'}}>
              <span className='font-weight-bold'  style={{textDecorationLine: 'underline'}} >
                THIRD PARTY LIABILITY: </span>
              <span>
                &nbsp;If my injuries are the result of negligence from a third party, then I instruct the Liability
                carrier to cut a separate draft to pay in full all services rendered, payable directly to Life
                Savers Emergency Room, and to send any and all checks to Life Savers Emergency Room.
              </span>
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='12' style={{textAlign: 'left'}}>
              <span className='font-weight-bold'  style={{textDecorationLine: 'underline'}} >
                STATUTE OF LIMITATIONS: </span>
              <span>
                &nbsp;I waive my rights to claim any statute of limitations regarding claims for services rendered
                or to be rendered by the physician/facility named above, in addition to reasonable cost of
                collection, including attorney fees and court cost incurred.
              </span>
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='12' style={{textAlign: 'left'}}>
              <span className='font-weight-bold'  style={{textDecorationLine: 'underline'}} >
                LIMITED POWER OF ATTORNEY: </span>
              <span>
                &nbsp;I hereby grant the physician/facility named above the power to endorse my name upon any
                checks, drafts, or other negotiable instrument representing payment from any insurance company
                representing payment for treatment and healthcare rendered by the physician/facility named above.
                I agree that any insurance payment representing an amount in excess of the charges for treatment
                rendered will be credited to my/our address request in writing to the physician/facility named above.
              </span>
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='12' style={{textAlign: 'left'}}>
              <span className='font-weight-bold'  style={{textDecorationLine: 'underline'}} >
                REJECTION IN WRITING: </span>
              <span>
                &nbsp;I hereby authorize the physician/clinic named above to establish a PIP or UM claim in my
                behalf. I also instruct my insurance carrier to provide upon request to the provider/clinic
                named above, any rejections in writing as they apply to my lack of PIP or UM coverage.
                If my carrier is unable to provide said rejections in a timely manner, I acknowledge that
                I am entitled to minimum levels of coverage, as per section 1952.152 of the Texas Insurance
                Code, and further my carrier to pay up to available limits directly to physician/clinic named
                above, and to send any and all checks or financial instruments to Life Savers Emergency Room.
              </span>
            </Col>
          </Row>

          <Row>
            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label>Patient Signature: </Label>
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
                  value={store?.assignmentOfBenefits?.patientSignedDate}
                  onChange={date => setPatientSignedDate(date[0].toISOString().slice(0, 10))}
                  className={classnames('form-control')}
                  disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>

            <Col lg={'12'}>
              <span className='font-weight-bold'>If the consenting party is other than the patient: <br/> </span>
            </Col>

            <Col lg={'12'}>
              <Label>
                <span>I am the</span>
                <span style={{textDecorationLine: 'underline'}}>&nbsp;Qualified Personal Representative (QPR)</span>
                <span>&nbsp;or : </span>
                <span style={{textDecorationLine: 'underline'}}>&nbsp;Legal guardian of</span>
                <span>&nbsp; and sign on his/her behalf.</span>
              </Label>
              <Input id='beQPR' placeholder='' name='beQPR'
                     className={classnames('form-control', {})}
                     defaultValue={store?.assignmentOfBenefits?.beQPR || null}
                     onChange={e => setBeQPR(e.target.value)}
                     disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label>Signature of Qualified Personal Representative</Label>
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
                <Label for='qprName'>Printed Name of Qualified Personal Representative</Label>
                <Input id='qprName' placeholder='' name='qprName'
                       className={classnames('form-control', {})}
                       defaultValue={store?.assignmentOfBenefits?.qprName || null}
                       onChange={e => setQPRName(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label for='behalf'>Legal Authority to Act on Behalf of the Patient
                  (Relationship to patient)
                </Label>
                <Input id='behalf' placeholder='' name='behalf'
                       className={classnames('form-control', {})}
                       defaultValue={store?.assignmentOfBenefits?.behalf || null}
                       onChange={e => setBehalf(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
          </Row>
          
        </CardBody>
      </Card>
  )
}
export default AssignmentOfBenefits
