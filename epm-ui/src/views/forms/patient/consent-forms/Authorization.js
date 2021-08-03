// ** React Imports
import React, {useEffect, useState} from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import SignatureCanvas from 'react-signature-canvas'
import 'cleave.js/dist/addons/cleave-phone.us'
import Select from 'react-select'
import {FileText} from "react-feather"
import { useForm, Controller } from 'react-hook-form'
import {Row, Col, Button, Label, FormGroup, Input, CustomInput, Card, CardHeader, CardBody } from 'reactstrap'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils
import { getUserRole } from '@utils'
import { useDispatch, useSelector } from "react-redux"
const ROLE_PATIENT = 'patient'
import { canvasToString, drawBase64Img } from '../../utils'

import {
  usCityOptions,
  usStateOptions
} from "@src/@fake-db/constants/data"


const Authorization = () => {

  const userRole = getUserRole()
  const dispatch = useDispatch()
  const store = useSelector(state => state.patient?.selectedData)

  const [facilityName, setFacilityName] = useState(store?.authorization?.facilityName || null)
  const [patientName, setPatientName] = useState(store?.authorization?.patientName || null)

  const [doctorOffice, setDoctorOffice] = useState(store?.authorization?.doctorOffice || null)
  const [doctorAddress, setDoctorAddress] = useState(store?.authorization?.doctorAddress || null)
  const [doctorCity, setDoctorCity] = useState(store?.authorization?.doctorCity || null)
  const [doctorState, setDoctorState] = useState(store?.authorization?.doctorState || null)
  const [doctorZip, setDoctorZip] = useState(store?.authorization?.doctorZip || null)

  const [doctorPhone, setDoctorPhone] = useState(store?.authorization?.doctorPhone || null)
  const [doctorExt, setDoctorExt] = useState(store?.authorization?.doctorExt || null)
  const [doctorFax, setDoctorFax] = useState(store?.authorization?.doctorFax || null)

  const [isQPR, setIsQPR] = useState(store?.authorization?.isQPR || null)
  const [qprText, setQPRText] = useState(store?.authorization?.qprText || null)

  const [healthCareInfoChk, setHealthCareInfoChk] = useState(store?.authorization?.healthCareInfoChk || null)
  const [otherHealthcareTxt, setOtherHealthcareTxt] = useState(store?.authorization?.otherHealthcareTxt)

  const [releaseSTDResultChk, setReleaseSTDResultChk] = useState(store?.authorization?.releaseSTDResultChk || null)
  const [releaseRecordChk, setReleaseRecordChk] = useState(store?.authorization?.releaseRecordChk || null)

  const [declineChk, setDeclineChk] = useState(store?.authorization?.declineChk || null)

  const [patientSignRef, setPatientSignRef] = useState(store?.authorization?.patientSignRef || null)
  const [patientSign, setPatientSign] = useState(store?.authorization?.patientSign || null)
  const [patientSignedDate, setPatientSignedDate] = useState(store?.authorization?.patientSignedDate || new Date())

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
      ["authorization"]: {
        facilityName,
        patientName,
        doctorOffice,
        doctorAddress,
        doctorCity,
        doctorState,
        doctorZip,
        doctorPhone,
        doctorExt,
        doctorFax,
        isQPR,
        qprText,
        healthCareInfoChk,
        otherHealthcareTxt,
        releaseSTDResultChk,
        releaseRecordChk,
        declineChk,
        patientSign,
        patientSignedDate
      }
    }
    dispatch({
      type: 'SELECTED_DATA',
      selectedData: newData
    })

  }, [
    facilityName, patientName, doctorOffice, doctorAddress, doctorCity, doctorState, doctorZip, doctorPhone,
    doctorExt, doctorFax, isQPR, qprText, healthCareInfoChk, otherHealthcareTxt, releaseSTDResultChk, releaseRecordChk,
    declineChk, patientSignedDate, patientSign, patientSignedDate
  ])


  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  return (

      <Card>
        <CardHeader>
          <Col lg={'12'} className={'mt-1'} style={{textAlign: 'center'}}>
            <span className='font-weight-bold' style={{ textAlign: 'center', fontSize: 20 }}>
              AUTHORIZATION TO RELEASE HEALTHCARE INFORMATION
            </span>
          </Col>
        </CardHeader>
        <CardBody>
          <Row className={'mt-1'}>
            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label for=''>Facility: </Label>
                <Input id='facilityName' placeholder='' name='facilityName'
                       className={classnames('form-control', {})}
                       defaultValue={store?.authorization?.facilityName || null}
                       onChange={e => setFacilityName(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
            <Col className={'mt-1'} lg='6' md='6' sm='12'>
              <FormGroup>
                <Label for=''>Patient: </Label>
                <Input id='patientName' placeholder='' name='patientName'
                       className={classnames('form-control', {})}
                       defaultValue={store?.authorization?.patientName || null}
                       onChange={e => setPatientName(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>

            <Col className={'mt-1'} lg='12' style={{textAlign: 'left'}}>
              <span>I request and authorize &nbsp; </span>
              <span style={{textDecorationLine: 'underline'}}> Lifesavers Emergency Room </span>
              <span> &nbsp;  to release  &nbsp; </span>
              <span style={{textDecorationLine: 'underline'}}>healthcare information </span>
              <span>of the patient named above to:</span>
            </Col>

            <Col className={'mt-1'} lg='12'>
              <FormGroup>
                <Label for=''>Doctor office Name: </Label>
                <Input id='doctorOffice' placeholder='' name='doctorOffice'
                       className={classnames('form-control', {})}
                       defaultValue={store?.authorization?.doctorOffice || null}
                       onChange={e => setDoctorOffice(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg='4' md='6'>
              <FormGroup>
                <Label for='address'>Address Line</Label>
                <Input id='doctorAddress' placeholder='' name='doctorAddress'
                       className={classnames('form-control', {})}
                       defaultValue={store?.authorization?.doctorAddress || null}
                       onChange={e => setDoctorAddress(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>

            <Col lg='4' md='6' sm='12'>
              <FormGroup>
                <Label for='doctorCity'>City: </Label>
                <Select isClearable id='doctorCity' options={usCityOptions} classNamePrefix='select'
                        className={classnames('react-select', {})}
                        value={store?.authorization?.doctorCity || null}
                        onChange={(value) => setDoctorCity(value)}
                        isSearchable={true}
                        isDisabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
            <Col lg='4' md='6' sm='12'>
              <FormGroup>
                <Label for='doctorState'>State: </Label>
                <Select isClearable id='doctorState' options={usStateOptions} classNamePrefix='select'
                        className={classnames('react-select', {})}
                        value={store?.authorization?.doctorState || null}
                        onChange={(value) => setDoctorState(value)}
                        isSearchable={true}
                        isDisabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
            <Col lg='4' md='6' sm='12'>
              <FormGroup>
                <Label for='doctorZip'>ZipCode: </Label>
                <Input type='number' id='doctorZip' placeholder='597626' name='doctorZip'
                       defaultValue={store?.authorization?.doctorZip || null}
                       className={classnames('form-control', {})}
                       onChange={e => setDoctorZip(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg='4' md='6' sm='12'>
              <FormGroup>
                <Label for='doctorPhone'>Phone: </Label>
                <Input type='number' id='doctorPhone' placeholder='597626' name='doctorPhone'
                       defaultValue={store?.authorization?.doctorPhone || null}
                       className={classnames('form-control', {})}
                       onChange={e => setDoctorPhone(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
            <Col lg='4' md='6' sm='12'>
              <FormGroup>
                <Label for='doctorExt'>Ext: </Label>
                <Input type='number' id='doctorExt' placeholder='597626' name='doctorExt'
                       defaultValue={store?.authorization?.doctorExt || null}
                       className={classnames('form-control', {})}
                       onChange={e => setDoctorExt(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
            <Col lg='4' md='6' sm='12'>
              <FormGroup>
                <Label for='doctorFax'>Fax: </Label>
                <Input type='number' id='doctorFax' placeholder='597626' name='doctorFax'
                       defaultValue={store?.authorization?.doctorFax || null}
                       className={classnames('form-control', {})}
                       onChange={e => setDoctorFax(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col className={'mt-1'} lg='12'>
              <FormGroup>
                <Label for=''>This request and authorization applies to: </Label>
                <CustomInput type='checkbox' id='isQPR' name='isQPR'
                             label='I am the Qualified Personal Representative (QPR) or Legal Guardian'
                             checked={store?.authorization?.isQPR === true}
                             onChange={() => setIsQPR(!store?.authorization?.isQPR)}
                             disabled={userRole !== ROLE_PATIENT}
                />
                <Input id='qprText' placeholder='' name='qprText'
                       defaultValue={store?.authorization?.qprText || null}
                       className={classnames('form-control', {})}
                       onChange={e => setQPRText(e.target.value)}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <CustomInput type='checkbox' id='healthCareInfoChkAll' name='healthCareInfoChk'
                           label='All healthcare information'
                           checked={store?.authorization?.healthCareInfoChk === 'all'}
                           onChange={() => setHealthCareInfoChk('all')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
            <Col lg={'12'}>
              <CustomInput type='checkbox' id='healthCareInfoChkOther' name='healthCareInfoChk'
                           label='Other:'
                           checked={store?.authorization?.healthCareInfoChk === 'other'}
                           onChange={() => setHealthCareInfoChk('other')}
                           disabled={userRole !== ROLE_PATIENT}
              />
              <Input id='otherHealthcareTxt' placeholder='' name='otherHealthcareTxt'
                     defaultValue={store?.authorization?.otherHealthcareTxt || null}
                     className={classnames('form-control', {})}
                     onChange={e => setOtherHealthcareTxt(e.target.value)}
                     disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='12'>
              <div style={{textAlign: 'justify'}}>
                <span className={'font-weight-bold'}> Definition: </span>
                <span>
                    Sexually Transmitted Disease (STD) as defined by law, RCW 70.24 et seq., includes herpes, 
                  herpes simplex, human papilloma virus, wart, genital wart, condyloma, Chlamydia, non-specific 
                  urethritis, syphilis, VDRL, chancroid, lymphogranuloma venereuem, HIV (Human Immunodeficiency 
                  Virus), AIDS (Acquired Immunodeficiency Syndrome), and gonorrhea.
                  </span>
              </div>
            </Col>
          </Row>
          
          <Row className={'mt-1'}>
            <Col lg='1' md='3' sm='6'>
              <CustomInput type='checkbox' id='releaseSTDResultChkYes'
                           label='Yes'
                           checked={store?.authorization?.releaseSTDResultChk === 'yes'}
                           onChange={() => setReleaseSTDResultChk('yes')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
            <Col lg='1' md='3' sm='6'>
              <CustomInput type='checkbox' id='releaseSTDResultChkNo'
                           label='No'
                           checked={store?.authorization?.releaseSTDResultChk === 'no'}
                           onChange={() => setReleaseSTDResultChk('no')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
            <Col lg='10' md='6' sm='12'>
              <div style={{textAlign: 'justify'}}>
                <span>
                  I authorize the release of my STD results, HIV/AIDS testing, whether negative or positive, 
                  to the person(s) listed above. I understand that the person(s) listed above will be notified 
                  that I must give specific written permission before disclosure of these test results to anyone.
                </span>
              </div>
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='1' md='3' sm='6'>
              <CustomInput type='checkbox' id='releaseRecordChkYes'
                           label='Yes'
                           checked={store?.authorization?.releaseRecordChk === 'yes'}
                           onChange={() => setReleaseRecordChk('yes')}
              />
            </Col>
            <Col lg='1' md='3' sm='6'>
              <CustomInput type='checkbox' id='releaseRecordChkNo'
                           label='No'
                           checked={store?.authorization?.releaseRecordChk === 'no'}
                           onChange={() => setReleaseRecordChk('no')}
              />
            </Col>
            <Col lg='10' md='6' sm='12'>
              <div style={{textAlign: 'justify'}}>
                <span>
                  I authorize the release of any records regarding drug, alcohol, or mental health treatment 
                  to the person(s) listed above.
                </span>
              </div>
            </Col>
          </Row>
          
          <Row className={'mt-1'}>
            <Col lg='12'>
              <CustomInput type='checkbox' id='declineChk' name='declineChk'
                           label='I decline authorization to release healthcare information.'
                           checked={store?.authorization?.declineChk === true}
                           onChange={() => setDeclineChk(!store?.authorization?.declineChk)}
                           disabled={userRole !== ROLE_PATIENT}
              />
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
                <Label for='patientSignedDate'> Date Signed: </Label>
                <Flatpickr
                  id='patientSignedDate'
                  name='patientSignedDate'
                  options={{dateFormat: 'Y-m-d'}}
                  placeholder='YYYY-MM-DD'
                  defaultValue={patientSignedDate}
                  value={store?.authorization?.patientSignedDate}
                  onChange={date => setPatientSignedDate(date[0].toISOString().slice(0, 10))}
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
export default Authorization
