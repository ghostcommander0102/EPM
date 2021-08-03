// ** React Imports
import React, { useEffect, useContext, useState } from 'react'

// ** Third Party Components
import { ArrowLeft } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import { Row, Col, Button, Form, ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap'
import { useHistory } from 'react-router-dom'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { addPatient, addReview } from '../../store/actions'

// ** Forms
import InsuredPatientPacket from "@src/views/forms/patient/InsuredPatientPacket"
import NoInsuredPatientPacket from "@src/views/forms/patient/NoInsuredPatientPacket"
import MVAWorkersCompPacket from "@src/views/forms/patient/MVAWorkersCompPacket"
import LifeSaversQuestionnaireForm from "@src/views/forms/patient/LifeSaversQuestionnaireForm"

// ** Utils
import { getUserRole } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
const ROLE_PATIENT = 'patient'
const Consents = ({ stepper, patientCase }) => {
	const history = useHistory();
	const { colors } = useContext(ThemeColors)
	const stepperProps = {
		completeColor: colors.primary.main,
		completeTitleColor: colors.primary.main,
		activeColor: colors.secondary.main,
		activeTitleColor: colors.secondary.main,
		size: 28,
		circleFontSize: 14,
		titleFontSize: 12
	}

	const userRole = getUserRole()
	const dispatch = useDispatch()
	const store = useSelector(state => state?.patient?.data || state?.patient?.selectedData)
	const [patientSign, setPatientSign] = useState(null)

	const [consentFormInformation, setConsentFormInformation] = useState(store?.consent_form?.consent_form || null)

	// ** State
	const [modal, setModal] = useState(false)

	function onSubmit() {
		// alert('submitted')
		const payload = {
			profile: {
				first_name: store?.profile?.first_name || "",
				last_name: store?.profile?.last_name || "",
				date_of_birth: store?.profile?.date_of_birth || "",
				sex: store?.profile?.sex || "",
				email: store?.profile?.email || "",
				ssn: store?.profile?.ssn || "",
				address: store?.profile?.address || "",
				city: store?.profile?.city?.value || "",
				state: store?.profile?.state?.value || "",
				county: store?.profile?.county || "",
				zip: store?.profile?.zip || "",
				phone_home: store?.profile?.phone_home || "",
				phone_work: store?.profile?.phone_work || "",
				phone_cell: store?.profile?.phone_cell || "",
				signature: patientSign
			},
			information: {
				race: store?.information?.race?.value || "",
				marital: store?.information?.marital?.value || "",
				language: store?.information?.language?.value || "",
				pcp_facility_name: store?.information?.pcp_facility_name || "",
				pcp_facility_address: store?.information?.pcp_facility_address || "",
				pcp_facility_city: store?.information?.pcp_facility_city?.value || "",
				pcp_facility_state: store?.information?.pcp_facility_state?.value || "",
				pcp_facility_zip: store?.information?.pcp_facility_zip || "",
				pcp_name: store?.information?.pcp_name || "",
				pcp_phone: store?.information?.pcp_phone || "",
				statement_receiver_name: store?.information?.statement_receiver_name || "",
				statement_receiver_address: store?.information?.statement_receiver_address || "",
				statement_receiver_city: store?.information?.statement_receiver_city?.value || "",
				statement_receiver_zip: store?.information?.statement_receiver_zip?.value || "",
				statement_receiver_phone: store?.information?.statement_receiver_phone || "",
				emergency_contactor_name: store?.information?.emergency_contactor_name || "",
				emergency_contactor_phone: store?.information?.emergency_contactor_phone || ""
			},
			consent_form: {
				consent_form: {
					complaintInformation: store?.consent_form?.consent_form?.complaintInformation || null,
					contentToTreatment: store?.consent_form?.consent_form?.contentToTreatment || null,
					lifeSaversEmergencyRoom: store?.consent_form?.consent_form?.lifeSaversEmergencyRoom || null,
					lifeSaverErPolicy: store?.consent_form?.consent_form?.lifeSaverErPolicy || null,
					patientRights: store?.consent_form?.consent_form?.patientRights || null,
					authorization: store?.consent_form?.consent_form?.authorization || null,
					assignmentOfBenefits: store?.consent_form?.consent_form?.assignmentOfBenefits || null,
					financialInformation: store?.consent_form?.consent_form?.financialInformation || null,
					financialSelfPayAgreement: store?.consent_form?.consent_form?.financialSelfPayAgreement || null,
					noInsuranceSelfPayAgreement: store?.consent_form?.consent_form?.noInsuranceSelfPayAgreement || null,
					screeningCovid19: store?.consent_form?.consent_form?.screeningCovid19 || null
				}
			},
			patientSign: patientSign
		}
		if (userRole == ROLE_PATIENT) {
			addReview(payload);
		}
		if (userRole != ROLE_PATIENT) {
			addPatient(payload);
		}
		history.push("/patient/search")
	}

	function setPatientSigns(sign) {
		setPatientSign(sign);
	}

	function renderConsentForm(patientCase) {
		switch (patientCase) {
			case "case1": return <InsuredPatientPacket stepperProps={stepperProps}
				userRole={userRole}
				consentFormInformation={consentFormInformation}
				setConsentFormInformation={value => setConsentFormInformation(value)}
			/>
			case "case2": return <NoInsuredPatientPacket stepperProps={stepperProps}
				userRole={userRole}
				consentFormInformation={consentFormInformation}
				setConsentFormInformation={value => setConsentFormInformation(value)}
			/>
			case "case3": return <MVAWorkersCompPacket stepperProps={stepperProps}
				userRole={userRole}
				consentFormInformation={consentFormInformation}
				setConsentFormInformation={value => setConsentFormInformation(value)}
			/>
			default:
				return <></>
		}
	}

	return (
		<Form>

			{renderConsentForm(patientCase)}

			<div className='d-flex justify-content-between'>
				<Button.Ripple color='primary' className='btn-prev' onClick={() => stepper.previous()}>
					<ArrowLeft size={14} className='align-middle mr-sm-25 mr-0' />
					<span className='align-middle d-sm-inline-block d-none'>Previous</span>
				</Button.Ripple>
				<Button.Ripple color='success' className='btn-submit' onClick={() => setModal(!modal)}>
					Submit
				</Button.Ripple>
			</div>

			<Modal
				isOpen={modal}
				toggle={() => setModal(!modal)}
				className={`modal-dialog-centered modal-lg`}
			>
				<ModalHeader toggle={() => setModal(!modal)}>
				</ModalHeader>
				<ModalBody>
					<LifeSaversQuestionnaireForm userRole={userRole} setPatientSign={setPatientSigns} />
				</ModalBody>
				<ModalFooter>
					<Button color='primary' onClick={() => onSubmit()} outline>
						Submit
					</Button>
				</ModalFooter>
			</Modal>

		</Form>
	)
}
export default Consents
