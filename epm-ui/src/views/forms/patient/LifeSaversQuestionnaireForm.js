// ** React Imports
import React, { useEffect, useRef, useState } from 'react'

// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'
import { FileText } from 'react-feather'
import { useForm } from 'react-hook-form'
import SignatureCanvas from 'react-signature-canvas'
import { Row, Col, Label, FormGroup, CustomInput, Card, CardHeader, CardBody, Input } from 'reactstrap'
import { canvasToString } from '../utils'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
const ROLE_PATIENT = 'patient'

const LifeSaversQuestionnaireForm = ({ userRole, setPatientSign }) => {

	const [data, setData] = useState(null)
	const patientSignRef = useRef({})
	function setSign() {
		setPatientSign(patientSignRef.current.getTrimmedCanvas().toDataURL("image/png"))
	}
	// ** React hook form vars
	return (
		<div className={'mt-2'}>
			<Row className='mt-1'>
				<Col sm='12'>
					<h4 className='mb-1'>
						<FileText size={20} className='mr-50' />
						<span className='align-middle'>{userRole !== ROLE_PATIENT ? "Check Sign Form" : "Life Savers Questionnaire"}</span>
					</h4>
				</Col>
			</Row>

			<Card>
				<CardHeader>
					<Col lg={'12'} className={'mt-1'} style={{ textAlign: 'center' }}>
						<span className='font-weight-bold' style={{ textAlign: 'center', fontSize: 20 }}>
							{userRole !== ROLE_PATIENT ? "To Save Patient Information, You Must Sign Here!" : "How did you hear about LIFE SAVERS?"}
						</span>
					</Col>
				</CardHeader>
				<CardBody>
					{userRole === ROLE_PATIENT ?
						<Row>
							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_1'
										label='Clinic Sign/Drive by'
									/>
								</FormGroup>
							</Col>
							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_2'
										label='LIFESAVERER.com'
									/>
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_3'
										label='Other (Please Specify)'
									/>
									<Input placeholder='' name='' />
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_4'
										label='Web Browser (Google, Bing, Yahoo)'
									/>
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_5'
										label='Doctor'
									/>
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_6'
										label='Children’s Festival'
									/>
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_7'
										label='I was a former patient'
									/>
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_8'
										label='Family or Friend'
									/>
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_9'
										label='Radio advertisement'
									/>
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_10'
										label='Former patient recommendation'
									/>
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_11'
										label='Employer'
									/>
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_12'
										label='GOOGLE'
									/>
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_13'
										label='Insurance Company recommendation'
									/>
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_14'
										label='Newspaper'
									/>
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_15'
										label='Yelp'
									/>
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_16'
										label='TV Advertisement'
									/>
								</FormGroup>
							</Col>

							<Col lg='4' md='6' sm='12'>
								<FormGroup>
									<CustomInput
										type='checkbox'
										id='life-savers-ques_17'
										label='Marketing/Public Relation Representative'
									/>
								</FormGroup>
							</Col>

						</Row> :
						<Row>
							<SignatureCanvas id='patientSign' penColor='black'
								canvasProps={{ width: 450, height: 100, className: 'sigCanvas' }}
								ref={patientSignRef}
								onEnd={setSign} />
						</Row>
					}
				</CardBody>
			</Card>
		</div>
	)
}
export default LifeSaversQuestionnaireForm
