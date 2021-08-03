// ** React Imports
import React, { useState, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import 'cleave.js/dist/addons/cleave-phone.us'
import { User, ArrowLeft, ArrowRight, Phone, MapPin, Info } from 'react-feather'
import { getReview } from '../../store/actions'
import { useForm } from 'react-hook-form'
import { Row, Col, Button, Label, FormGroup, Input, CustomInput, Form } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Cleave from "cleave.js/react"

// ** constants
import {
	usCityOptions,
	usStateOptions
} from "@src/@fake-db/constants/data"

// ** Utils
// ** Store & Actions
import { getUserRole } from '@utils'
import { useDispatch, useSelector } from 'react-redux'


export const genderOptions = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
	{ value: 'other', label: 'Other' }
]

export const languageOptions = [
	{ value: 'english', label: 'English' },
	{ value: 'french', label: 'French' },
	{ value: 'spanish', label: 'Spanish' },
	{ value: 'italian', label: 'Italian' },
	{ value: 'japanese', label: 'Japanese' }
]

export const maritalOptions = [
	{ value: 'single', label: 'Single' },
	{ value: 'married', label: 'Married' },
	{ value: 'divorced', label: 'Divorced' },
	{ value: 'widowed', label: 'Widowed' }
]

export const raceOptions = [
	{ value: 'americanIndian', label: 'American Indian or Alaska Native' },
	{ value: 'asian', label: 'Asian' },
	{ value: 'africanAmerican', label: 'Black or African American' },
	{ value: 'latino', label: 'Hispanic or Latino' },
	{ value: 'other', label: 'Native Hawaiian or Other Pacific Islander' },
	{ value: 'white', label: 'White' }
]


const ROLE_PATIENT = 'patient'


const DemographicsTab = ({ stepper, id }) => {
	// const userData = getUserData()
	const userRole = getUserRole()
	const dispatch = useDispatch()
	const store = useSelector(state => state?.patient?.data || null);
	useEffect(() => {
		dispatch(
			getReview(id || 0)
		)
	}, [dispatch])

	const [profile, setprofile] = useState(store?.profile || null)
	const [information, setinformation] = useState(store?.information || null)

	// ** React hook form vars
	const [data, setData] = useState(store?.profile || null)

	const defaultProfile = {
		first_name: store?.profile?.first_name || null,
		last_name: store?.profile?.last_name || null,
		date_of_birth: store?.profile?.date_of_birth || null,
		sex: store?.profile?.sex || null,
		email: store?.profile?.email || null,
		ssn: store?.profile?.ssn || null,
		address: store?.profile?.address || null,
		city: store?.profile?.city?.value || null,
		state: store?.profile?.state?.value || null,
		zip: store?.profile?.zip || null,
		phone_home: store?.profile?.phone_home || null,
		phone_work: store?.profile?.phone_work || null,
		phone_cell: store?.profile?.phone_cell || null
	}

	const defaultInfo = {
		race: store?.information?.race?.value || "",
		marital: store?.information?.marital?.value || "",
		language: store?.information?.language?.value || "",
		pcp_facility_name: store?.information?.pcp_facility_name || "",
		pcp_facility_address: store?.information?.pcp_facility_address || "",
		pcp_facility_city: store?.information?.pcp_facility_city?.value || "",
		facilityState: store?.information?.facilityState?.value || "",
		facilityZip: store?.information?.facilityZip || "",
		statementReceiverName: store?.information?.statementReceiverName || "",
		statementReceiverAddress: store?.information?.statementReceiverAddress || "",
		statementReceiverCity: store?.information?.statementReceiverCity?.value || "",
		statementReceiverState: store?.information?.statementReceiverState?.value || "",
		statementReceiverZip: store?.information?.statementReceiverZip || "",
		statementReceiverPhone: store?.information?.statementReceiverPhone || "",
		emergencyContactName: store?.information?.emergencyContactName || "",
		emergencyContactPhone: store?.information?.emergencyContactPhone || "",
		primaryPhysicianName: store?.information?.primaryPhysicianName || "",
		primaryPhysicianPhone: store?.information?.primaryPhysicianPhone || "",
		employer: store?.information?.employer || "",
		occupation: store?.information?.occupation || "",
		employerPhone: store?.information?.employerPhone || "",
		referredBy: store?.information?.referredBy || ""
	}

	const { handleSubmit } = useForm()

	useEffect(() => {
		setprofile(store?.profile || null)
		setData(store?.profile || null)
		setinformation(store?.information || null)
	}, [store])

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

	const onMoveNext = () => {

		if (data === null) {
			setData({ ...defaultProfile, ...defaultInfo })

		} else {
			let newProfile = defaultProfile
			Object.keys(newProfile).map((fieldName) => {
				newProfile = { ...newProfile, [fieldName]: data[fieldName] }
			})
			setprofile(newProfile)

			let newInfo = defaultInfo
			Object.keys(defaultInfo).map((fieldName) => {
				newInfo = { ...newInfo, [fieldName]: data[fieldName] }
			})
			setinformation(newInfo)


			let newData = store
			newData = {
				...newData,
				["profile"]: {
					...newProfile
				}
			}
			newData = {
				...newData,
				["information"]: {
					...newInfo
				}
			}
			dispatch({
				type: 'SELECTED_DATA',
				selectedData: newData
			})

			setData({ ...newProfile, ...newInfo })
		}


		if (!profile || !information) return

		if (Object.values(data).indexOf(null) > -1) {
			return
		}

		stepper.next()
	}

	useEffect(() => {
	}, [])

	return (
		<Form
			onSubmit={handleSubmit(onMoveNext)}
		>
			<Row className='mt-1 mb-3'>
				<Col sm='12'>
					<h3>
						{/*<FileText size={20} className='mr-50' />*/}
						<span className='align-middle'>PATIENT PROFILE</span>
					</h3>
				</Col>
			</Row>

			<Row className='mt-1'>
				<Col sm='12'>
					<h4>
						<User size={20} className='mr-50' />
						<span className='align-middle'>Patient Information</span>
					</h4>
				</Col>
			</Row>
			<Row>
				<Col lg='4' md='6' sm='6'>
					<FormGroup>
						<Label for='firstname'>First Name</Label>
						<Input id='firstname' placeholder='First Name' name='firstName'
							className={classnames('form-control', { 'is-invalid': data !== null && data?.firstName === null })}
							value={profile?.first_name}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>

				<Col lg='4' md='6' sm='6'>
					<FormGroup>
						<Label for='lastname'>Last Name</Label>
						<Input id='lastname' placeholder='Last Name' name='lastName'
							className={classnames('form-control', { 'is-invalid': data !== null && data?.lastName === null })}
							value={profile?.last_name || null}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>

				<Col lg='4' md='6' sm='12'>
					<FormGroup>
						<Label className='d-block' for='date_of_birth'>
							Date of Birth
						</Label>
						<Flatpickr
							id='date_of_birth'
							name='date_of_birth'
							// value={data?.date_of_birth}
							options={{ dateFormat: 'Y-m-d' }}
							placeholder='YYYY-MM-DD'
							className={classnames('form-control', { 'is-invalid': data !== null && (data?.date_of_birth === null || data?.date_of_birth === '') })}
							// value={data?.date_of_birth || ""}
							value={data?.date_of_birth || ""}
							onChange={date => onSelectChange('date_of_birth', date[0].toISOString().slice(0, 10))}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>

				<Col lg='4' md='6' sm='12'>
					<FormGroup>
						<label className='d-block mb-1'>Sex</label>
						<FormGroup>
							{genderOptions.map((genderOption) => {
								return (
									<CustomInput inline type='checkbox' id={`gender-${genderOption.value}`} name='gender'
										invalid={data !== null && data?.sex === null}
										label={genderOption.label}
										// value={genderOption.value}
										checked={data?.sex === genderOption.value}
										onChange={() => onSelectChange('sex', genderOption.value)}
										disabled={userRole !== ROLE_PATIENT}
									/>
								)
							})}
						</FormGroup>
					</FormGroup>
				</Col>

				<Col md='4' sm='12'>
					<FormGroup>
						<Label for='email'>Email</Label>
						<Input id='email' placeholder='Email' name='email'
							value={profile?.email || null}
							className={classnames('form-control', { 'is-invalid': data !== null && data?.email === null })}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6' sm='12'>
					<FormGroup>
						<Label for='ssn'>SSN</Label>
						<Input type='number' id='ssn' placeholder='999-99-9999' name='ssn'
							value={profile?.ssn || null}
							className={classnames('form-control', { 'is-invalid': data !== null && data?.ssn === null })}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
			</Row>

			<Row className='mt-1'>
				<Col sm='12'>
					<h4 className='mt-2'>
						<MapPin size={20} className='mr-50' />
						<span className='align-middle'>Address</span>
					</h4>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='address'>Address Line</Label>
						<Input placeholder='Address Line' id='address' name='address'
							value={profile?.address || null}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
							className={classnames('form-control', { 'is-invalid': data !== null && data?.address === null })}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='city'>City</Label>
						<Select isClearable id='city' options={usCityOptions} classNamePrefix='select'
							className={classnames('react-select', { 'is-invalid': data !== null && data?.city === null })}
							value={{ value: data?.city || "", label: data?.city || "" }}
							onChange={(value) => onSelectChange('city', value)}
							isSearchable={true}
							isDisabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='state'>State</Label>
						<Select isClearable id='state' options={usStateOptions} classNamePrefix='select'
							className={classnames('react-select', { 'is-invalid': data !== null && data?.state === null })}
							value={{ value: data?.state || "", label: data?.state || "" }}
							onChange={(value) => onSelectChange('state', value)}
							isSearchable={true}
							isDisabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>

				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='zip'>Zip Code</Label>
						<Input type='number' id='zip' placeholder='597626' name='zip'
							value={profile?.zip || null}
							className={classnames('form-control', { 'is-invalid': data !== null && data?.zip === null })}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
			</Row>

			<Row className='mt-1'>
				<Col sm='12'>
					<h4 className='mt-2'>
						<Phone size={20} className='mr-50' />
						<span className='align-middle'>Phone</span>
					</h4>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='phone_home'>Home Phone</Label>
						<Input type='number' id='phone_home' name='phone_home'
							value={profile?.phone_home || null}
							placeholder='1 234 567 8900'
							options={{ phone: true, phoneRegionCode: 'US' }}
							className={classnames('form-control', { 'is-invalid': data !== null && data?.phone_home === null })}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='phone_work'>Work Phone</Label>
						<Input type='number' id='phone_work' name='phone_work'
							value={profile?.phone_work || null}
							placeholder='1 234 567 8900'
							options={{ phone: true, phoneRegionCode: 'US' }}
							className={classnames('form-control', { 'is-invalid': data !== null && data?.phone_work === null })}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='phone_cell'>Cell Phone</Label>
						<Input type='number' id='phone_cell' name='phone_cell'
							value={profile?.phone_cell || null}
							placeholder='1 234 567 8900'
							options={{ phone: true, phoneRegionCode: 'US' }}
							className={classnames('form-control', { 'is-invalid': data !== null && data?.phone_cell === null })}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
			</Row>

			<Row className='mt-1'>
				<Col sm='12'>
					<h4 className='mt-2'>
						<Info size={20} className='mr-50' />
						<span className='align-middle'>Additional Information</span>
					</h4>
				</Col>
			</Row>
			<Row className='mb-1'>
				<Col lg='4' md='6' sm='12'>
					<FormGroup>
						<Label className='form-label' for={`race`}>Race</Label>
						<Select isClearable id='race' classNamePrefix='select'
							options={raceOptions}
							className={classnames('react-select', { 'is-invalid': information !== null && information?.race === null })}
							value={{ value: information?.race || "", label: information?.race || "" }}
							onChange={(value) => onSelectChange('race', value)}
							isDisabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6' sm='12'>
					<FormGroup>
						<Label className='form-label' for={`marital`}>Marital Status</Label>
						<Select isClearable id='marital' classNamePrefix='select'
							options={maritalOptions}
							className={classnames('react-select', { 'is-invalid': information !== null && information?.marital === null })}
							value={{ value: information?.marital || "", label: information?.marital || "" }}
							onChange={(value) => onSelectChange('marital', value)}
							isDisabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6' sm='12'>
					<FormGroup>
						<Label className='form-label' for={`language`}>Preferred Language</Label>
						<Select isClearable id='language' classNamePrefix='select'
							options={languageOptions}
							className={classnames('react-select', { 'is-invalid': information !== null && information?.language === null })}
							value={{ value: information?.language || "", label: information?.language || "" }}
							onChange={(value) => onSelectChange('language', value)}
							isDisabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
			</Row>

			<Row className='mt-1 mb-1'>
				<Col sm='12'>
					<h4 className='mt-2'>
						<Info size={20} className='mr-50' />
						<span className='align-middle'>Primary Care Physician</span>
					</h4>
				</Col>
				<Col lg='4' md='6' sm='12'>
					<FormGroup>
						<Label className='form-label' for={`pcp_facility_name`}>Name of Facility/Clinic</Label>
						<Input id='pcp_facility_name' name='pcp_facility_name'
							value={information?.pcp_facility_name || null}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
							className={classnames('form-control', { 'is-invalid': information !== null && information?.pcp_facility_name === null })}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='pcp_facility_address'>Address Line</Label>
						<Input placeholder='Address Line' id='pcp_facility_address' name='pcp_facility_address'
							value={information?.pcp_facility_address || null}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
							className={classnames('form-control', { 'is-invalid': information !== null && information?.pcp_facility_address === null })}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='pcp_facility_city'>City</Label>
						<Select isClearable id='pcp_facility_city' options={usCityOptions} classNamePrefix='select'
							className={classnames('react-select', { 'is-invalid': information !== null && information?.pcp_facility_city === null })}
							value={{ value: information?.pcp_facility_city || null, label: information?.pcp_facility_city || null }}
							onChange={(value) => onSelectChange('pcp_facility_city', value)}
							isSearchable={true}
							isDisabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='facilityState'>State</Label>
						<Select isClearable id='facilityState' options={usStateOptions} classNamePrefix='select'
							className={classnames('react-select', { 'is-invalid': information !== null && information?.facilityState === null })}
							value={{ value: information?.pcp_facility_state || null, label: information?.pcp_facility_state || null }}
							onChange={(value) => onSelectChange('facilityState', value)}
							isSearchable={true}
							isDisabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='pcp_facility_zip'>Zip Code</Label>
						<Input placeholder='Zip Code' id='pcp_facility_zip' name='pcp_facility_zip'
							value={information?.pcp_facility_zip || null}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
							className={classnames('form-control', { 'is-invalid': information !== null && information?.pcp_facility_zip === null })}
						/>
					</FormGroup>
				</Col>
			</Row>

			<Row className='mt-1 mb-0'>
				<Col lg='4' md='6' sm='12'>
					<FormGroup>
						<Label for='statement_receiver_name'>Name of person who should receive the statement (other than patient)</Label>
						<Input id='statement_receiver_name' name='statement_receiver_name'
							value={information?.statement_receiver_name || null}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
							className={classnames('form-control', { 'is-invalid': information !== null && information?.statementReceiverName === null })}
						/>
					</FormGroup>
				</Col>
			</Row>

			<Row className={'mt-1'}>
				<Col lg='12'>
					<Label>Statement Address (if different than patient's address)</Label>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='statement_receiver_address'>Address Line</Label>
						<Input placeholder='Address' id='statement_receiver_address' name='statement_receiver_address'
							value={information?.statement_receiver_address || null}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
							className={classnames('form-control', { 'is-invalid': information !== null && information?.statement_receiver_address === null })}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='statement_receiver_city'>City</Label>
						<Select isClearable id='statement_receiver_city' options={usCityOptions} classNamePrefix='select'
							className={classnames('react-select', { 'is-invalid': information !== null && information?.statement_receiver_city === null })}
							value={{ value: information?.statement_receiver_city || null, label: information?.statement_receiver_city || null }}
							onChange={(value) => onSelectChange('statement_receiver_city', value)}
							isSearchable={true}
							isDisabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='statement_receiver_state'>State</Label>
						<Select isClearable id='statement_receiver_state' options={usStateOptions} classNamePrefix='select'
							className={classnames('react-select', { 'is-invalid': information !== null && information?.statement_receiver_state === null })}
							value={{ value: information?.statement_receiver_city || null, label: information?.statement_receiver_city || null }}
							onChange={(value) => onSelectChange('statement_receiver_state', value)}
							isSearchable={true}
							isDisabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='statement_receiver_zip'>Zip Code</Label>
						<Input placeholder='Zip Code' id='statement_receiver_zip' name='statement_receiver_zip'
							className={classnames('form-control', { 'is-invalid': information !== null && information?.statement_receiver_zip === null })}
							value={information?.statement_receiver_zip || ''}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='12'>
					<FormGroup>
						<Label for='statement_receiver_phone'>Phone</Label>
						<Input type='number' id='statement_receiver_phone' name='statement_receiver_phone'
							value={information?.statement_receiver_phone || null}
							placeholder='1 234 567 8900'
							options={{ phone: true, phoneRegionCode: 'US' }}
							className={classnames('form-control', { 'is-invalid': information !== null && information?.statement_receiver_phone === null })}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
			</Row>

			<Row className={'mt-1'}>
				<Col lg='8' md='6' sm='12'>
					<FormGroup>
						<Label for='emergency_contactor_name'>Who should we contact in an emergency?</Label>
						<Input placeholder='' id='emergency_contactor_name' name='emergency_contactor_name'
							value={information?.emergency_contactor_name || null}
							className={classnames('form-control', { 'is-invalid': information !== null && information?.emergency_contactor_name === null })}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6' sm='12'>
					<FormGroup>
						<Label for='emergency_contactor_phone'>Phone</Label>
						<Input type='number' id='emergency_contactor_phone' name='emergency_contactor_phone'
							value={information?.emergency_contactor_phone || null}
							placeholder='1 234 567 8900'
							options={{ phone: true, phoneRegionCode: 'US' }}
							className={classnames('form-control', { 'is-invalid': information !== null && information?.emergency_contactor_phone === null })}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>

				<Col lg='8' md='6' sm='12'>
					<FormGroup>
						<Label for='primaryPhysicianName'>Primary Physician</Label>
						<Input placeholder='' id='primaryPhysicianName' name='primaryPhysicianName'
							value={information?.primaryPhysicianName || null}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
							className={classnames('form-control', { 'is-invalid': data !== null && data?.primaryPhysicianName === null })}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6' sm='12'>
					<FormGroup>
						<Label for='primaryPhysicianPhone'>Phone</Label>
						<Input type='number' id='primaryPhysicianPhone' name='primaryPhysicianPhone'
							value={information?.primaryPhysicianPhone || ''}
							placeholder='1 234 567 8900'
							options={{ phone: true, phoneRegionCode: 'US' }}
							className={classnames('form-control', { 'is-invalid': information !== null && information?.primaryPhysicianPhone === null })}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='employer_name'>Employer</Label>
						<Input placeholder='' id='employer_name' name='employer_name'
							className={classnames('form-control', { 'is-invalid': information !== null && information?.employer_name === null })}
							value={information?.employer_name || null}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='employer_occupation'>Occupation</Label>
						<Input placeholder='' id='employer_occupation' name='employer_occupation'
							className={classnames('form-control', { 'is-invalid': information !== null && information?.employer_occupation === null })}
							value={information?.employer_occupation || null}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
				<Col lg='4' md='6'>
					<FormGroup>
						<Label for='employer_phone'>Phone</Label>
						<Input type='number' id='employer_phone' name='employer_phone'
							value={information?.employer_phone || ''}
							placeholder='1 234 567 8900'
							options={{ phone: true, phoneRegionCode: 'US' }}
							className={classnames('form-control', { 'is-invalid': information !== null && information?.employer_phone === null })}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
			</Row>

			<Row className={'mt-1'}>
				<Col lg={'4'}>
					<FormGroup>
						<Label for='referred_by'>Referred by</Label>
						<Input placeholder='' id='referred_by' name='referred_by'
							className={classnames('form-control', { 'is-invalid': information !== null && information?.referred_by === null })}
							value={information?.referred_by || null}
							onChange={onInputChange}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</FormGroup>
				</Col>
			</Row>

			<Row className='mt-1'>
				<Col>
					<div className='d-flex justify-content-between'>
						<Button.Ripple color='secondary' className='btn-prev' outline disabled>
							<ArrowLeft size={14} className='align-middle mr-sm-25 mr-0' />
							<span className='align-middle d-sm-inline-block d-none'>Previous</span>
						</Button.Ripple>
						<Button.Ripple color='primary' className='btn-next' onClick={() => onMoveNext()}>
							<span className='align-middle d-sm-inline-block d-none'>Next</span>
							<ArrowRight size={14} className='align-middle ml-sm-25 ml-0' />
						</Button.Ripple>
					</div>
				</Col>
			</Row>
		</Form>
	)
}
export default DemographicsTab
