// ** React Imports
import React, {useEffect, useState} from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import Select from "react-select"
import { FileText } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import {Row, Col, Label, FormGroup, CustomInput, Card, CardHeader, CardBody, Input} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Cleave from "cleave.js/react"


import {usCityOptions, usStateOptions} from '@src/@fake-db/constants/data'

import { getUserRole } from '@utils'
const ROLE_PATIENT = 'patient'


const WorkersCompForm = ({workersCompFormInfo, setWorkersCompFormInfo}) => {

  const userRole = getUserRole()

  const [data, setData] = useState(workersCompFormInfo || null)

  const onInputChange = e => {
    let newData = data || {}
    newData = {...newData, [e.target.name]: e.target.value}
    setData(newData)
  }

  const onSelectChange = (fieldName, option) => {
    let newData = data || {}
    newData = {...newData, [fieldName]: option}
    setData(newData)
  }

  useEffect(() => {
    setWorkersCompFormInfo(data)
  }, [data])

  return (
    <div className={'mt-2'}>
      <Card>
        <CardHeader>
          <Col lg={'12'} className={'mt-1'} style={{textAlign: 'center'}}>
            <span className='font-weight-bold' style={{ textAlign: 'center', fontSize: 20 }}>
              WORKERS COMPENSATION FORM
            </span>
          </Col>
        </CardHeader>
        <CardBody>
          <Row className={'mt-1'}>
            <Col lg='12' md='6' sm='12'>
              <FormGroup>
                <Label for='insuranceCompany'>Insurance Company [ Workers Compensation or your auto PIP ]</Label>
                <Input id='insuranceCompany' name='insuranceCompany'
                       defaultValue={workersCompFormInfo?.insuranceCompany || null}
                       onChange={onInputChange}
                       disabled={userRole !== ROLE_PATIENT}
                       // className={classnames('form-control', { 'is-invalid': data !== null && data?.insuranceCompany === null})}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className={'mt-1'}>
            <Col lg='4' md='6' sm='12'>
              <FormGroup>
                <Label for='insuranceCompanyAddress'>Address Line</Label>
                <Input id='insuranceCompanyAddress' name='insuranceCompanyAddress'
                       defaultValue={workersCompFormInfo?.insuranceCompanyAddress || null}
                       onChange={onInputChange}
                       disabled={userRole !== ROLE_PATIENT}
                       // className={classnames('form-control', { 'is-invalid': data !== null && data?.insuranceCompanyAddress === null})}
                />
              </FormGroup>
            </Col>
            <Col lg='4' md='6' sm='12'>
              <FormGroup>
                <Label for='insuranceCompanyCity'>City</Label>
                <Select isClearable id='insuranceCompanyCity' options={usCityOptions} classNamePrefix='select'
                        // className={classnames('react-select', { 'is-invalid': data !== null && data?.insuranceCompanyCity === null})}
                        value={data?.insuranceCompanyCity || null}
                        onChange={(value) => onSelectChange('insuranceCompanyCity', value)}
                        isSearchable={true}
                        isDisabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
            <Col lg='4' md='6' sm='12'>
              <FormGroup>
                <Label for='insuranceCompanyState'>State</Label>
                <Select isClearable id='insuranceCompanyState' options={usStateOptions} classNamePrefix='select'
                        // className={classnames('react-select', { 'is-invalid': data !== null && data?.insuranceCompanyState === null})}
                        value={data?.insuranceCompanyState || null}
                        onChange={(value) => onSelectChange('insuranceCompanyState', value)}
                        isSearchable={true}
                        isDisabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
            <Col lg='4' md='6' sm='12'>
              <FormGroup>
                <Label for='insuranceCompanyZip'>Zip Code</Label>
                <Input placeholder='Zip Code' id='insuranceCompanyZip' name='insuranceCompanyZip'
                       defaultValue={workersCompFormInfo?.insuranceCompanyZip || null}
                       onChange={onInputChange}
                       disabled={userRole !== ROLE_PATIENT}
                       className={classnames('form-control', { 'is-invalid': data !== null && data?.insuranceCompanyZip === null})}
                />
              </FormGroup>
            </Col>
            <Col lg='4' md='6' sm='12'>
              <FormGroup>
                <Label for='insuranceCompanyPhone'>Phone</Label>
                <Input type='number'  id='insuranceCompanyPhone' name='insuranceCompanyPhone'
                       defaultValue={workersCompFormInfo?.insuranceCompanyPhone || null}
                       placeholder='1 234 567 8900'
                       options={{ phone: true, phoneRegionCode: 'US' }}
                       // className={classnames('form-control', { 'is-invalid': data !== null && data?.insuranceCompanyPhone === null})}
                       onChange={onInputChange}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className={'mt-1'}>
            <Col lg='6' md='6' sm={'12'}>
              <FormGroup>
                <Label for='insuredName'>Name of Insured</Label>
                <Input placeholder='' id='insuredName' name='insuredName'
                       defaultValue={workersCompFormInfo?.insuredName || null}
                       // className={classnames('form-control', { 'is-invalid': data !== null && data?.insuredName === null})}
                       onChange={onInputChange}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
            <Col lg='6' md='6' sm={'12'}>
              <FormGroup>
                <Label for='adjuster'>Adjuster</Label>
                <Input placeholder='' id='adjuster' name='adjuster'
                       defaultValue={workersCompFormInfo?.adjuster || null}
                       // className={classnames('form-control', { 'is-invalid': data !== null && data?.adjuster === null})}
                       onChange={onInputChange}
                       disabled={userRole !== ROLE_PATIENT}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}
export default WorkersCompForm
