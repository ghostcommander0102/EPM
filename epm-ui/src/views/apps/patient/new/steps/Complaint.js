// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Third Party Components
import { ArrowLeft, ArrowRight } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import { Row, Col, Label, Button, Input, CustomInput, Form } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

import AccidentForm from '@src/views/forms/patient/AccidentForm'
import WorkersCompForm from "@src/views/forms/patient/WorkersCompForm"

// ** Store & Actions
import { getUserRole } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import classnames from "classnames"

const ROLE_PATIENT = 'patient'


const ComplaintQuestions = ({ stepper, patientCase, setPatientCase }) => {

	const userRole = getUserRole()
	const dispatch = useDispatch()
	const store = useSelector(state => state.patient.data?.selectedData)

	const [involveAccident, setInvolveAccident] = useState(store?.consent_form?.consent_form?.complaintInformation?.involveAccident || false)
	const [hasWorkersComp, setHasWorkersComp] = useState(store?.consent_form?.consent_form?.complaintInformation?.hasWorkersComp || false)
	const [hasInsurance, setHasInsurance] = useState(store?.consent_form?.consent_form?.complaintInformation?.hasInsurance || false)
	const [chiefComplaint, setChiefComplaint] = useState(store?.consent_form?.consent_form?.complaintInformation?.chiefComplaint || false)

	const [accidentFormInfo, setAccidentFormInfo] = useState(store?.consent_form?.consent_form?.complaintInformation?.accidentFormInfo || false)
	const [workersCompFormInfo, setWorkersCompFormInfo] = useState(store?.consent_form?.consent_form?.complaintInformation?.workersCompFormInfo || false)

	useEffect(() => {
		if (!involveAccident) setHasWorkersComp(false)

		if (hasWorkersComp === true) {
			patientCase = 'case3'  // workers compensation
			setHasInsurance(null)
		} else {
			if (hasInsurance === true) {
				patientCase = 'case1'  // insuranced packet
			}
			if (hasInsurance === false) {
				patientCase = 'case2' // no insuranced packet
			}
		}
		setPatientCase(patientCase)

	}, [involveAccident, hasWorkersComp, hasInsurance])


	function onMoveNext() {
		console.log("accidentFormInfo", accidentFormInfo)
		console.log("workersCompFormInfo", workersCompFormInfo)

		let newData = store
		newData = {
			...newData,
			['complaintInformation']: {
				accidentFormInfo,
				workersCompFormInfo,
				patientCase,
				involveAccident,
				hasWorkersComp,
				hasInsurance
			}
		}
		dispatch({
			type: 'SELECTED_DATA',
			selectedData: newData
		})

		if (patientCase === 'case1') {
			stepper.next()
		}
		if (patientCase === 'case2') {
			stepper.to(4)
		}
		if (patientCase === 'case3') {
			stepper.to(4)
		}
	}
	return (
		<Form>
			<Row className='mt-2'>
				<Col lg='12' md='12' sm='12'>
					<Label tag='h4'>What is your chief complaint?</Label>
					<div>
						<Input type='textarea' name='chiefComplaint' id='chiefComplaint' rows='3' placeholder='What is your chief complaint'
							defaultValue={chiefComplaint || ""}
							onChange={e => setChiefComplaint(e.target.value)}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</div>
				</Col>
			</Row>
			<Row className='mt-2'>
				<Col lg='12' className={'mt-1'}>
					<Label tag='h4'>Were you involved in an accident?</Label>
					<div className={'mt-1'}>
						<CustomInput type='radio' id='involveAccidentYes' name='involveAccident'
							inline label='Yes'
							value='involveAccidentYes'
							checked={involveAccident}
							onChange={() => setInvolveAccident(true)}
							disabled={userRole !== ROLE_PATIENT}
						/>
						<CustomInput type='radio' id='involveAccidentNo' name='involveAccident'
							inline label='No'
							value='involveAccidentNo'
							checked={!involveAccident}
							onChange={() => setInvolveAccident(false)}
							disabled={userRole !== ROLE_PATIENT}
						/>
					</div>
				</Col>
			</Row>
			<Row className={'d-flex justify-content-center'}>
				{(involveAccident) &&
					<Col lg='10' md='11' sm='12'>
						<AccidentForm accidentFormInfo={accidentFormInfo}
							setAccidentFormInfo={value => setAccidentFormInfo(value)}
							hasWorkersComp={hasWorkersComp}
							setHasWorkersComp={value => setHasWorkersComp(value)}
						/>
						{(hasWorkersComp) &&
							<WorkersCompForm workersCompFormInfo={workersCompFormInfo}
								setWorkersCompFormInfo={value => setWorkersCompFormInfo(value)}
							/>
						}
					</Col>
				}
			</Row>
			<Row className='mt-2 mb-2'>
				<Col lg='12' md='12' sm='12' className={'mt-1'}>
					{((hasWorkersComp === false) || (hasWorkersComp === null)) &&
						<div>
							<Label tag='h4'>Do you have insurance?</Label>
							<div className={'mt-1'}>
								<CustomInput type='radio' id='hasInsuranceYes' name='hasInsurance'
									inline label='Yes'
									value='hasInsuranceYes'
									checked={hasInsurance}
									onChange={() => setHasInsurance(true)}
									disabled={userRole !== ROLE_PATIENT} />
								<CustomInput type='radio' id='hasInsuranceNo' name='hasInsurance'
									inline label='No'
									value='haveInsuranceNo'
									checked={!hasInsurance}
									onChange={() => setHasInsurance(false)}
									disabled={userRole !== ROLE_PATIENT} />
							</div>
						</div>
					}
				</Col>
			</Row>

			<Row className='mt-1'>
				<Col>
					<div className='d-flex justify-content-between'>
						<Button.Ripple color='primary' className='btn-prev' onClick={() => stepper.previous()}>
							<ArrowLeft size={14} className='align-middle mr-sm-25 mr-0' />
							<span className='align-middle d-sm-inline-block d-none'>Previous</span>
						</Button.Ripple>

						<Button.Ripple color='primary' className='btn-next' onClick={() => onMoveNext(stepper)}>
							<span className='align-middle d-sm-inline-block d-none'>Next</span>
							<ArrowRight size={14} className='align-middle ml-sm-25 ml-0' />
						</Button.Ripple>
					</div>
				</Col>
			</Row>
		</Form>
	)
}
export default ComplaintQuestions
