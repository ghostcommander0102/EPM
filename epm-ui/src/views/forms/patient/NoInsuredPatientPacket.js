// ** React Imports
import React, {useEffect, useState} from 'react'

// Custom Component
import Stepper from 'react-stepper-horizontal'

// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'
import {Row, Col} from 'reactstrap'

import NoInsuranceSelfPayAgreement from "./consent-forms/NoInsuranceSelfPayAgreement"
import ConsentToTreatment from "./consent-forms/ConsentToTreatment"
import LifeSaversEmergencyRoom from "./consent-forms/LifeSaversEmergencyRoom"
import PatientRights from "./consent-forms/PatientRights"
import Authorization from "./consent-forms/Authorization"


const NoInsuredPatientPacket = ({stepperProps, consentFormInformation, setConsentFormInformation}) => {

  const [nextActiveStep, setActiveStep] = useState(1)

  const [noInsuranceSelfPayAgreement, setNoInsuranceSelfPayAgreement] = useState(consentFormInformation?.noInsuranceSelfPayAgreement || null)
  const [consentToTreatment, setConsentToTreatment] = useState(consentFormInformation?.consentToTreatment || null)
  const [lifeSaversEmergencyRoom, setLifeSaversEmergencyRoom] = useState(consentFormInformation?.lifeSaversEmergencyRoom || null)
  const [patientRights, setPatientRights] = useState(consentFormInformation?.patientRights || null)
  const [authorization, setAuthorization] = useState(consentFormInformation?.authorization || null)

  useEffect(() => {
    // const data = consentFormInformation
    // data['noInsuranceSelfPayAgreement'] = noInsuranceSelfPayAgreement || null
    // data['consentToTreatment'] = consentToTreatment || null
    // data['lifeSaversEmergencyRoom'] = lifeSaversEmergencyRoom || null
    // data['patientRights'] = patientRights || null
    // data['authorization'] = authorization || null

    // setConsentFormInformation(data)

  }, [noInsuranceSelfPayAgreement, consentToTreatment, lifeSaversEmergencyRoom, patientRights, authorization])

  const pages = [
    {
      title: <span className='font-weight-bold'>NO INSURANCE/ <br/> SELF-PAY PATIENTS</span>,
      component: <NoInsuranceSelfPayAgreement
        noInsuranceSelfPayAgreement={noInsuranceSelfPayAgreement}
        setNoInsuranceSelfPayAgreement={value => setNoInsuranceSelfPayAgreement(value)}
      />
    },
    {
      title: <span className='font-weight-bold'>CONSENT TO <br/> TREATMENT</span>,
      component: <ConsentToTreatment
        consentToTreatment={consentToTreatment}
        setConsentToTreatment={value => setConsentToTreatment(value)}
      />
    },
    {
      title: <span className='font-weight-bold'>LIFE SAVERS <br/> EMERGENCY <br/> ROOM</span>,
      component: <LifeSaversEmergencyRoom
        lifeSaversEmergencyRoom={lifeSaversEmergencyRoom}
        setLifeSaversEmergencyRoom={value => setLifeSaversEmergencyRoom(value)}
      />
    },
    {
      title: <span className='font-weight-bold'>PATIENT’S RIGHTS <br/> AND <br/> RESPONSIBILITIES</span>,
      component: <PatientRights
        patientRights={patientRights}
        setPatientRights={value => setPatientRights(value)}
      />
    },
    {
      title: <span className='font-weight-bold'>AUTHORIZATION</span>,
      component: <Authorization
        authorization={authorization}
        setAuthorization={value => setAuthorization(value)}
      />
    }
  ]

  const noInsuredPageSteps = pages.map((page, index) => {
    return {
      title: page.title,
      onClick: () => {
        setActiveStep(index + 1)
      }
    }
  })

  const renderPage = (pageInd) => {
    return (
      pages[pageInd].component
    )
  }

  return (
    <div>
      <Row className='mt-1 mb-1'>
        <Col sm='12'>
          <h3>
            <span className='align-middle'> NO INSURED PATIENT PACKET </span>
          </h3>
        </Col>
      </Row>
      <Row className={'d-flex justify-content-center'}>
        <Stepper steps = {noInsuredPageSteps}
                 activeStep={nextActiveStep}

                 activeColor={stepperProps.activeColor}
                 activeTitleColor={stepperProps.activeTitleColor}
                 completeColor={stepperProps.completeColor}
                 completeTitleColor={stepperProps.completeTitleColor}
                 size={stepperProps.size}
                 circleFontSize={stepperProps.circleFontSize}
                 titleFontSize={stepperProps.titleFontSize}
        />
      </Row>
      <Row className={'d-flex justify-content-center mt-2 '}>
        <Col lg='10' md='11' sm='12'>
          {
            renderPage(nextActiveStep - 1)
          }
        </Col>
      </Row>
    </div>
  )
}
export default NoInsuredPatientPacket
