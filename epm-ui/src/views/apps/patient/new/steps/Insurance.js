// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Third Party Components
import { ArrowLeft, ArrowRight, FileText } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import { Row, Col, Button, Form, Label, FormGroup, CustomInput, Input, Card, CardBody } from 'reactstrap'
import Select from "react-select"
import classnames from "classnames"
import Flatpickr from "react-flatpickr"

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils
import { getUserRole } from '@utils'
import { insuranceTypeOptions, usCityOptions, usStateOptions } from '@src/@fake-db/constants/data'
import { useDispatch, useSelector } from 'react-redux'

const ROLE_PATIENT = 'patient'

const insuranceRelationships = [
	{ value: 'self', label: 'Self' },
	{ value: 'spouse', label: 'Spouse' },
	{ value: 'child', label: 'Child' },
	{ value: 'other', label: 'Other' }
]


const Insurance = ({ stepper, patientCase }) => {
	const userRole = getUserRole()
	const dispatch = useDispatch()
	const store = useSelector(state => state.patient?.selectedData)

	const [insuranceInformation, setInsuranceInformation] = useState(store?.insuranceInformation || null)

	// ** State
	const [data, setData] = useState(null)
	const [hasSecondaryInsurance, setHasSecondaryInsurance] = useState(false)

	const defaultInsuranceInfo = {
		insuranceType: insuranceInformation?.insuranceType || null,

		primaryID: insuranceInformation?.primaryID || null,
		primaryGroupNo: insuranceInformation?.primaryGroupNo || null,
		primarySubscriberName: insuranceInformation?.primarySubscriberName || null,
		primarySubscriberDOB: insuranceInformation?.primarySubscriberDOB || null,
		primarySubscriberAddress: insuranceInformation?.primarySubscriberAddress || null,
		primarySubscriberCity: insuranceInformation?.primarySubscriberCity || null,
		primarySubscriberState: insuranceInformation?.primarySubscriberState?.value || null,
		primarySubscriberZip: insuranceInformation?.primarySubscriberZip?.value || null,
		primarySubscriberPhone: insuranceInformation?.primarySubscriberPhone || null,
		primaryRelationship: insuranceInformation?.primaryRelationship || null,

		hasSecondaryInsurance: insuranceInformation?.hasSecondaryInsurance || null,
		secondaryID: insuranceInformation?.secondaryID || "",
		secondaryGroupNo: insuranceInformation?.secondaryGroupNo || "",
		secondarySubscriberName: insuranceInformation?.secondarySubscriberName || "",
		secondarySubscriberDOB: insuranceInformation?.secondarySubscriberDOB || "",
		secondarySubscriberAddress: insuranceInformation?.secondarySubscriberAddress || "",
		secondarySubscriberCity: insuranceInformation?.secondarySubscriberCity || "",
		secondarySubscriberState: insuranceInformation?.secondarySubscriberState?.value || "",
		secondarySubscriberZip: insuranceInformation?.secondarySubscriberZip?.value || "",
		secondarySubscriberPhone: insuranceInformation?.secondarySubscriberPhone || "",
		secondaryRelationship: insuranceInformation?.secondaryRelationship || ""
	}

	const { handleSubmit } = useForm()

	const onInputChange = e => {
		let newData = data || {}
		newData = { ...newData, [e.target.name]: e.target.value }
		setData(newData)
	}

	const onSelectChange = (fieldName, option) => {
		let newData = data || {}
		newData = { ...newData, [fieldName]: option }
		setData(newData)
	}

	useEffect(() => {
		console.log(hasSecondaryInsurance)
	}, [hasSecondaryInsurance])

	const onMoveNext = () => {

		if (data === null) {
			setData(defaultInsuranceInfo)

		} else {
			let newInfo = defaultInsuranceInfo
			Object.keys(defaultInsuranceInfo).map((fieldName) => {
				newInfo = { ...newInfo, [fieldName]: data[fieldName] }
			})

			newInfo = { ...newInfo, ['hasSecondaryInsurance']: hasSecondaryInsurance }

			setInsuranceInformation(newInfo)
			setData(newInfo)
		}

		console.log("data:", data)
		console.log("insuranceInformation:", insuranceInformation)

		if (!insuranceInformation) return
		if (Object.values(data).indexOf(null) > -1) {
			// console.log(Object.values(data).indexOf(null))
			return
		}

		let newData = store
		newData = {
			...newData,
			insuranceInformation
		}
		dispatch({
			type: 'SELECTED_DATA',
			selectedData: newData
		})

		stepper.next()

	}

	return (
		<Form onSubmit={handleSubmit(onMoveNext)}>
			<Row className='mt-1 mb-3'>
				<Col sm='12'>
					<h3>
						<span className='align-middle'>INSURANCE INFORMATION</span>
					</h3>
				</Col>
			</Row>
			{(patientCase === "case1") &&
				<Row className={'d-flex justify-content-center'}>
					<Col lg='10' md='11' sm='12'>
						<Card>
							<CardBody>
								<Row className={'mt-1'}>
									<Col sm='12'>
										<h4 className='mb-1'>
											<FileText size={20} className='mr-50' />
											<span className='align-middle'>PRIMARY INSURANCE</span>
										</h4>
									</Col>
								</Row>
								<Row className={'mt-2'}>
									<Col lg='6' md='12'>
										<FormGroup>
											<Label for='insuranceType' className='d-block'>Type</Label>
											<Select isClearable id='insuranceType' options={insuranceTypeOptions} classNamePrefix='select'
												className={classnames('react-select', { 'is-invalid': data !== null && data?.insuranceType === null })}
												value={data?.insuranceType || null}
												onChange={(value) => onSelectChange('insuranceType', value)}
												isSearchable={true}
												isDisabled={userRole !== ROLE_PATIENT}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col lg='6' md='12'>
										<FormGroup>
											<Label for='primaryID'>Primary ID Number</Label>
											<Input type='number' id='patientZip' placeholder='Primary ID Number' name='primaryID'
												defaultValue={insuranceInformation?.primaryID || null}
												className={classnames('form-control', { 'is-invalid': data !== null && data?.primaryID === null })}
												onChange={onInputChange}
												disabled={userRole !== ROLE_PATIENT}
											/>
										</FormGroup>
									</Col>
									<Col lg='6' md='12'>
										<FormGroup>
											<Label for='primaryGroupNo'>Primary Group No.</Label>
											<Input type='number' id='primaryGroupNo' placeholder='Primary Group Number' name='primaryGroupNo'
												defaultValue={insuranceInformation?.primaryGroupNo || null}
												className={classnames('form-control', { 'is-invalid': data !== null && data?.primaryGroupNo === null })}
												onChange={onInputChange}
												disabled={userRole !== ROLE_PATIENT}
											/>
										</FormGroup>
									</Col>
									<Col lg='6' md='12'>
										<FormGroup>
											<Label for='primarySubscriberName'>Subscriber Name</Label>
											<Input type='number' id='primarySubscriberName' placeholder='' name='primarySubscriberName'
												defaultValue={insuranceInformation?.primarySubscriberName || null}
												className={classnames('form-control', { 'is-invalid': data !== null && data?.primarySubscriberName === null })}
												onChange={onInputChange}
												disabled={userRole !== ROLE_PATIENT}
											/>
										</FormGroup>
									</Col>
									<Col lg='6' md='12'>
										<FormGroup>
											<Label for='primarySubscriberDOB'>Subscriber DOB</Label>
											<Flatpickr
												id='primarySubscriberDOB'
												name='primarySubscriberDOB'
												// value={data?.dob}
												options={{ dateFormat: 'Y-m-d' }}
												placeholder='YYYY-MM-DD'
												className={classnames('form-control', { 'is-invalid': data !== null && (data?.primarySubscriberDOB === null || data?.primarySubscriberDOB === '') })}
												defaultValue={insuranceInformation?.primarySubscriberDOB || ''}
												onChange={date => onSelectChange('primarySubscriberDOB', date[0].toISOString().slice(0, 10))}
												disabled={userRole !== ROLE_PATIENT}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col lg='12'>
										<Label for='primarySubscriberAddress'>Subscriber Address</Label>
									</Col>
									<Col lg='4' md='6'>
										<FormGroup>
											<Label for='primarySubscriberAddress'>Address Line</Label>
											<Input id='primarySubscriberAddress' placeholder='' name='primarySubscriberAddress'
												defaultValue={insuranceInformation?.primarySubscriberAddress || null}
												className={classnames('form-control', { 'is-invalid': data !== null && data?.primarySubscriberAddress === null })}
												onChange={onInputChange}
												disabled={userRole !== ROLE_PATIENT}
											/>
										</FormGroup>
									</Col>
									<Col lg='4' md='6'>
										<FormGroup>
											<Label for='primarySubscriberCity'>City</Label>
											<Select isClearable id='primarySubscriberCity' options={usCityOptions} classNamePrefix='select'
												className={classnames('react-select', { 'is-invalid': data !== null && data?.primarySubscriberCity === null })}
												value={data?.primarySubscriberCity || null}
												onChange={(value) => onSelectChange('primarySubscriberCity', value)}
												isSearchable={true}
												isDisabled={userRole !== ROLE_PATIENT}
											/>
										</FormGroup>
									</Col>
									<Col lg='4' md='6'>
										<FormGroup>
											<Label for='primarySubscriberState'>State</Label>
											<Select isClearable id='primarySubscriberState' options={usStateOptions} classNamePrefix='select'
												className={classnames('react-select', { 'is-invalid': data !== null && data?.primarySubscriberState === null })}
												value={data?.primarySubscriberState || null}
												onChange={(value) => onSelectChange('primarySubscriberState', value)}
												isSearchable={true}
												isDisabled={userRole !== ROLE_PATIENT}
											/>

										</FormGroup>
									</Col>
									<Col lg='4' md='6'>
										<FormGroup>
											<Label for='primarySubscriberZip'>Zip Code</Label>
											<Input type='number' id='primarySubscriberZip' placeholder='597626' name='primarySubscriberZip'
												defaultValue={insuranceInformation?.primarySubscriberZip || null}
												className={classnames('form-control', { 'is-invalid': data !== null && data?.primarySubscriberZip === null })}
												onChange={onInputChange}
												disabled={userRole !== ROLE_PATIENT}
											/>
										</FormGroup>
									</Col>
									<Col lg='4' md='12'>
										<FormGroup>
											<Label for='primarySubscriberPhone'>Subscriber Phone</Label>
											<Input type='number' id='primarySubscriberPhone' name='primarySubscriberPhone'
												defaultValue={insuranceInformation?.primarySubscriberPhone || null}
												placeholder='1 234 567 8900'
												options={{ phone: true, phoneRegionCode: 'US' }}
												className={classnames('form-control', { 'is-invalid': data !== null && data?.primarySubscriberPhone === null })}
												onChange={onInputChange}
												disabled={userRole !== ROLE_PATIENT}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col lg='8' md='12'>
										<FormGroup>
											<Label for='primaryRelationship'>Relationship to Patient</Label>
											<Input id='primaryRelationship' name='primaryRelationship'
												defaultValue={insuranceInformation?.primaryRelationship || null}
												onChange={onInputChange}
												disabled={userRole !== ROLE_PATIENT}
												className={classnames('form-control', { 'is-invalid': data !== null && data?.primaryRelationship === null })}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row className={`mt-1`}>
									<Col>
										<FormGroup className={'mb-2'}>
											<Label className='d-block mb-1' for='hasSecondaryInsurance'>Do you have secondary insurance?</Label>
											<CustomInput inline type='checkbox' id='hasSecondaryInsuranceYes' name='hasSecondaryInsurance'
												// invalid={data !== null && data?.hasSecondaryInsurance === null}
												label='Yes'
												onChange={() => setHasSecondaryInsurance(true)}
												checked={hasSecondaryInsurance === true}
												disabled={userRole !== ROLE_PATIENT}
											/>
											<CustomInput inline type='checkbox' id='hasSecondaryInsuranceNo' name='hasSecondaryInsurance'
												// invalid={data !== null && data?.hasSecondaryInsurance === null}
												label='No'
												onChange={() => setHasSecondaryInsurance(false)}
												checked={hasSecondaryInsurance === false}
												disabled={userRole !== ROLE_PATIENT}
											/>
										</FormGroup>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>

					{(hasSecondaryInsurance) &&
						<Col lg='10' md='11' sm='12'>
							<Card>
								<CardBody className={'mt-2 mb-2'}>
									<Row className='mt-1'>
										<Col sm='12'>
											<h4 className='mb-1'>
												<FileText size={20} className='mr-50' />
												<span className='align-middle'>SECONDARY INSURANCE</span>
											</h4>
										</Col>
									</Row>
									<Row>
										<Col lg='6' md='12'>
											<FormGroup>
												<Label for='secondaryID'>Secondary ID Number</Label>
												<Input type='number' id='secondaryID' placeholder='' name='secondaryID'
													defaultValue={insuranceInformation?.secondaryID || null}
													className={classnames('form-control', { 'is-invalid': data !== null && data?.secondaryID === null })}
													onChange={onInputChange}
													disabled={userRole !== ROLE_PATIENT}
												/>
											</FormGroup>
										</Col>
										<Col lg='6' md='12'>
											<FormGroup>
												<Label for='secondaryGroupNo'>Secondary Group No.</Label>
												<Input type='number' id='secondaryGroupNo' placeholder='' name='secondaryGroupNo'
													defaultValue={insuranceInformation?.secondaryGroupNo || null}
													className={classnames('form-control', { 'is-invalid': data !== null && data?.secondaryGroupNo === null })}
													onChange={onInputChange}
													disabled={userRole !== ROLE_PATIENT}
												/>
											</FormGroup>
										</Col>
										<Col lg='6' md='12'>
											<FormGroup>
												<Label for='secondarySubscriberName'>Subscriber Name</Label>
												<Input type='number' id='secondarySubscriberName' placeholder='' name='secondarySubscriberName'
													defaultValue={insuranceInformation?.secondarySubscriberName || null}
													className={classnames('form-control', { 'is-invalid': data !== null && data?.secondarySubscriberName === null })}
													onChange={onInputChange}
													disabled={userRole !== ROLE_PATIENT}
												/>
											</FormGroup>
										</Col>
										<Col lg='6' md='12'>
											<FormGroup>
												<Label for='secondarySubscriberDOB'>Subscriber DOB</Label>
												<Flatpickr
													id='secondarySubscriberDOB'
													name='secondarySubscriberDOB'
													// value={data?.dob}
													options={{ dateFormat: 'Y-m-d' }}
													placeholder='YYYY-MM-DD'
													className={classnames('form-control', { 'is-invalid': data !== null && (data?.secondarySubscriberDOB === null) })}
													defaultValue={insuranceInformation?.secondarySubscriberDOB || ''}
													onChange={date => onSelectChange('secondarySubscriberDOB', date[0].toISOString().slice(0, 10))}
													disabled={userRole !== ROLE_PATIENT}
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col lg='12'>
											<Label for='secondarySubscriberAddress'>Subscriber Address</Label>
										</Col>
										<Col lg='4' md='6'>
											<FormGroup>
												<Label for='secondarySubscriberAddress'>Address Line</Label>
												<Input id='secondarySubscriberAddress' placeholder='' name='secondarySubscriberAddress'
													defaultValue={insuranceInformation?.secondarySubscriberAddress || null}
													className={classnames('form-control', { 'is-invalid': data !== null && data?.secondarySubscriberAddress === null })}
													onChange={onInputChange}
													disabled={userRole !== ROLE_PATIENT}
												/>
											</FormGroup>
										</Col>
										<Col lg='4' md='6'>
											<FormGroup>
												<Label for='secondarySubscriberCity'>City</Label>
												<Select isClearable id='secondarySubscriberCity' options={usCityOptions} classNamePrefix='select'
													className={classnames('react-select', { 'is-invalid': data !== null && data?.secondarySubscriberCity === null })}
													value={data?.secondarySubscriberCity || null}
													onChange={(value) => onSelectChange('secondarySubscriberCity', value)}
													isSearchable={true}
													isDisabled={userRole !== ROLE_PATIENT}
												/>
											</FormGroup>
										</Col>
										<Col lg='4' md='6'>
											<FormGroup>
												<Label for='secondarySubscriberState'>State</Label>
												<Select isClearable id='secondarySubscriberState' options={usStateOptions} classNamePrefix='select'
													className={classnames('react-select', { 'is-invalid': data !== null && data?.secondarySubscriberState === null })}
													value={data?.secondarySubscriberState || null}
													onChange={(value) => onSelectChange('secondarySubscriberState', value)}
													isSearchable={true}
													isDisabled={userRole !== ROLE_PATIENT}
												/>
											</FormGroup>
										</Col>
										<Col lg='4' md='6'>
											<FormGroup>
												<Label for='secondarySubscriberZip'>Zip Code</Label>
												<Input type='number' id='secondarySubscriberZip' placeholder='597626' name='secondarySubscriberZip'
													defaultValue={insuranceInformation?.secondarySubscriberZip || null}
													className={classnames('form-control', { 'is-invalid': data !== null && data?.secondarySubscriberZip === null })}
													onChange={onInputChange}
													disabled={userRole !== ROLE_PATIENT}
												/>
											</FormGroup>
										</Col>
										<Col lg='4' md='12'>
											<FormGroup>
												<Label for='secondarySubscriberPhone'>Subscriber Phone</Label>
												<Input type='number' id='secondarySubscriberPhone' name='secondarySubscriberPhone'
													defaultValue={insuranceInformation?.secondarySubscriberPhone || null}
													placeholder='1 234 567 8900'
													options={{ phone: true, phoneRegionCode: 'US' }}
													className={classnames('form-control', { 'is-invalid': data !== null && data?.secondarySubscriberPhone === null })}
													onChange={onInputChange}
													disabled={userRole !== ROLE_PATIENT}
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col lg='8' md='12'>
											<FormGroup>
												<Label for='secondaryRelationship'>Relationship to Patient</Label>
												<Input id='secondaryRelationship' name='secondaryRelationship'
													defaultValue={insuranceInformation?.secondaryRelationship || null}
													onChange={onInputChange}
													disabled={userRole !== ROLE_PATIENT}
													className={classnames('form-control', { 'is-invalid': data !== null && data?.secondaryRelationship === null })}
												/>
											</FormGroup>
										</Col>
									</Row>
								</CardBody>
							</Card>
						</Col>
					}
				</Row>
			}
			<div className='d-flex justify-content-between'>
				<Button.Ripple color='primary' className='btn-prev' onClick={() => stepper.previous()}>
					<ArrowLeft size={14} className='align-middle mr-sm-25 mr-0' />
					<span className='align-middle d-sm-inline-block d-none'>Previous</span>
				</Button.Ripple>
				<Button.Ripple color='primary' className='btn-next' onClick={() => onMoveNext()}>
					<span className='align-middle d-sm-inline-block d-none'>Next</span>
					<ArrowRight size={14} className='align-middle ml-sm-25 ml-0' />
				</Button.Ripple>
			</div>
		</Form>
	)
}
export default Insurance
