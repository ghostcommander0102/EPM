// ** React Imports
import React, {useEffect, useState} from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import {Row, Col, Label, FormGroup, CustomInput, Card, CardHeader, CardBody, Input} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Cleave from "cleave.js/react"

import { getUserRole } from '@utils'


const ACCIDENT_CAUSE_AUTO = 'accidentCauseAuto'
const ACCIDENT_CAUSE_WORK = 'accidentCauseWork'
const ACCIDENT_CAUSE_PUBLIC = 'accidentCausePublic'
const ACCIDENT_CAUSE_OTHER = 'accidentCauseOther'
const ACC_INVOLVEMENT_OTHER = 'accidentInvolveOther'
const ROLE_PATIENT = 'patient'


const AccidentForm = ({hasWorkersComp, setHasWorkersComp, accidentFormInfo, setAccidentFormInfo}) => {
  const userRole = getUserRole()

  const accidentCauseOptions = [
    { value: 'accidentCauseAuto', label: 'Auto' },
    { value: 'accidentCauseWork', label: 'Work' },
    { value: 'accidentCausePublic', label: 'Public Trans' },
    { value: 'accidentCauseOther', label: 'Other' }
  ]

  const accidentInvolvementOptions = [
    { value: 'accidentInvolveDrivers', label: 'Driver' },
    { value: 'accidentInvolvePassenger', label: 'Passenger' },
    { value: 'accidentInvolvePedestrian', label: 'Pedestrian' },
    { value: 'accidentInvolveCyclist', label: 'Cyclist' },
    { value: 'accidentInvolveVisitor', label: 'Visitor' },
    { value: 'accidentInvolveOther', label: 'Other' }
  ]

  const workerCompensationOptions = [
    { value: 'workerCompensationYes', label: 'Yes' },
    { value: 'workerCompensationNo', label: 'No' }
  ]

  // ** React hook form vars
  const { control } = useForm()

  const [accidentDate, setAccidentDate] = useState(accidentFormInfo?.accidentDate || null)
  const [accidentCause, setAccidentCause] = useState(accidentFormInfo?.accidentCause || null)
  const [accidentCauseOther, setAccidentCauseOther] = useState(accidentFormInfo?.accidentCauseOther || null)
  const [accidentInvolvement, setAccidentInvolvement] = useState(accidentFormInfo?.accidentInvolvement || null)
  const [accidentInvolvementOther, setAccidentInvolvementOther] = useState(accidentFormInfo?.accidentInvolvementOther || null)

  useEffect(() => {
    // console.log(accidentDate,
    //   accidentCause,
    //   accidentCauseOther,
    //   accidentInvolvement,
    //   accidentInvolvementOther)

    setAccidentFormInfo({
      accidentDate,
      accidentCause,
      accidentCauseOther,
      accidentInvolvement,
      accidentInvolvementOther,
      hasWorkersComp
    })
  }, [accidentDate, accidentCause, accidentInvolvement, accidentCauseOther, accidentInvolvementOther, hasWorkersComp])

  return (
    <div className={'mt-2'}>
      <Card>
        <CardHeader>
          <Col lg={'12'} className={'mt-1'} style={{textAlign: 'center'}}>
            <span className='font-weight-bold' style={{ textAlign: 'center', fontSize: 20 }}>
              ACCIDENT FORM
            </span>
          </Col>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg='12'>
              <FormGroup>
                <Label className='d-block' for='accidentDate'>
                  Date of Accident
                </Label>
                <Flatpickr
                  id='accidentDate'
                  name='accidentDate'
                  placeholder='YYYY-MM-DD'
                  options={{dateFormat: 'Y-m-d'}}
                  onChange={date => setAccidentDate(date[0].toISOString().slice(0, 10))}
                  value={accidentDate}
                  // className={classnames('form-control', {'is-invalid': data !== null && !data?.dob })}
                  className={classnames('form-control', {})}
                  disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>

            <Col lg='12' className={'mt-2'} >
              <FormGroup>
                <label className='d-block mb-1'>How did it happen?</label>
                <FormGroup>
                  {accidentCauseOptions.map((accidentCauseOption) => {
                    return (
                      <CustomInput inline type='checkbox' name='accidentCause' id={`accident-${accidentCauseOption.value}`}
                                   label={accidentCauseOption.label}
                                   // value={accidentCauseOption.value}
                                   onChange={() => setAccidentCause(accidentCauseOption.value)}
                                   checked={accidentCause === accidentCauseOption.value }
                                   disabled={userRole !== ROLE_PATIENT}
                      />
                    )
                  })}
                </FormGroup>
              </FormGroup>
            </Col>
            {
              (accidentCause === ACCIDENT_CAUSE_OTHER) &&
              <Col lg='12' md='12' sm='12'>
                <FormGroup>
                  <Input placeholder='' name='accidentCauseOther'
                         value={accidentCauseOther}
                         defaultValue={accidentFormInfo?.accidentCauseOther || ''}
                         onChange={e => setAccidentCauseOther(e.target.value)}
                         disabled={userRole !== ROLE_PATIENT}
                  />
                </FormGroup>
              </Col>
            }
            <Col lg='12' className={'mt-2'} >
              <FormGroup>
                <label className='d-block mb-1'>Involvement in accident?</label>
                <FormGroup>
                  {accidentInvolvementOptions.map((accidentInvolvementOption) => {
                    return (
                      <CustomInput inline type='checkbox' id={`accident-${accidentInvolvementOption.value}`} name='accidentInvolvement'
                                   label={accidentInvolvementOption.label}
                                   // value={accidentInvolvementOption.value}
                                   onChange={() => setAccidentInvolvement(accidentInvolvementOption.value)}
                                   checked={accidentInvolvement === accidentInvolvementOption.value }
                                   disabled={userRole !== ROLE_PATIENT}
                      />
                    )
                  })}
                </FormGroup>
              </FormGroup>
            </Col>
            {
              (accidentInvolvement === ACC_INVOLVEMENT_OTHER) &&
              <Col lg='12' md='12' sm='12'>
                <FormGroup>
                  <Input placeholder='' name='accidentInvolvementOther'
                         value={accidentInvolvementOther}
                         defaultValue={accidentFormInfo?.accidentInvolvementOther || ''}
                         onChange={e => setAccidentInvolvementOther(e.target.value)}
                         disabled={userRole !== ROLE_PATIENT}
                  />
                </FormGroup>
              </Col>
            }
            {
              (accidentCause === ACCIDENT_CAUSE_WORK) &&
              <Col lg='12' className={'mt-2'} >
                <FormGroup>
                  <label className='d-block mb-1'>Workers Compensation?</label>
                  <FormGroup>
                    {workerCompensationOptions.map((workerCompensationOption) => {
                      return (
                        <CustomInput inline type='checkbox' id={`accident-${workerCompensationOption.value}`} name='workerCompensation'
                                     label={workerCompensationOption.label}
                                     value={workerCompensationOption.value}
                                     onChange={() => setHasWorkersComp(workerCompensationOption.value === 'workerCompensationYes')}
                                     checked={hasWorkersComp === (workerCompensationOption.value === 'workerCompensationYes')}
                                     disabled={userRole !== ROLE_PATIENT}
                        />
                      )
                    })}
                  </FormGroup>
                </FormGroup>
              </Col>
            }
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}
export default AccidentForm
