import React, { useRef, useState, Fragment, useEffect } from 'react'
import Wizard from '@components/wizard'

import { useSkin } from '@hooks/useSkin'
import { FileText, User, MessageSquare } from 'react-feather'
import DemographicsDetails from './steps/Demographics'
import ComplaintQuestions from './steps/Complaint'
import InsuranceDetails from './steps/Insurance'
import Consents from './steps/Consents'
import { Row, Col } from "reactstrap"

// ** Utils
import { isUserLoggedIn, getUserData, getUserRole } from '@utils'


const PatientRegister = (props) => {
	const [stepper, setStepper] = useState(null)
	const ref = useRef(null)
	const [skin, setSkin] = useSkin()

	const [patientCase, setPatientCase] = useState(null)

	const [patientProfile, setPatientProfile] = useState(null)
	const [patientInformation, setPatientInformation] = useState(null)
	const [complaintInformation, setComplaintInformation] = useState(null)
	const [insuranceInformation, setInsuranceInformation] = useState(null)
	const [consentFormInformation, setConsentFormInformation] = useState(null)

	const illustration = skin === 'dark' ? 'consent-form-dark.svg' : 'consent-form.svg',
		source = require(`@src/assets/images/pages/consent/${illustration}`).default

	//** ComponentDidMount
	useEffect(() => {
		if (isUserLoggedIn() !== null) {
		}
	}, [])

	const steps = [
		{
			id: 'demographics-details',
			title: 'Demographics',
			subtitle: 'Enter Demographics Details',
			icon: <User size={16} />,
			content: <DemographicsDetails stepper={stepper} id={props?.match?.params?.id || 0} />
		},
		{
			id: 'complaint-questions',
			title: 'Complaint',
			subtitle: 'Enter Complaint Questions',
			icon: <MessageSquare size={16} />,
			content: <ComplaintQuestions stepper={stepper}
				patientCase={patientCase}
				setPatientCase={value => setPatientCase(value)} />
		},
		{
			id: 'insurance-information',
			title: 'Insurance Information',
			subtitle: 'Enter Insurance Information',
			icon: <FileText size={16} />,
			content: <InsuranceDetails stepper={stepper}
				patientCase={patientCase} />
		},
		{
			id: 'consent-form',
			title: 'Consent Forms',
			subtitle: 'Fill out Consent Forms',
			icon: <FileText size={16} />,
			content: <Consents stepper={stepper}
				patientCase={patientCase} />
		}
	]

	const imgWidth = (getUserRole() === 'staff') ? 250 : 400

	return (
		<Fragment>
			{/* side background image */}
			<div style={{ position: 'fixed', width: imgWidth }}>
				<img src={source} style={{ objectFit: 'cover', height: '100vh', width: imgWidth - 10 }} />
			</div>

			<Row>
				{/* main consent form*/}
				<Col className={'justify-content-start'} style={{ marginLeft: imgWidth }}>
					<div>
						<Wizard
							type='horizontal-wizard'
							ref={ref}
							steps={steps}
							options={{ linear: false }}
							instance={el => setStepper(el)}
						/>
					</div>
				</Col>
			</Row>
		</Fragment>
	)
}

export default PatientRegister
