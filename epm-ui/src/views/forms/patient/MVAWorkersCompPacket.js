// ** React Imports
import React, { useState } from 'react'

// Custom Component
import Stepper from 'react-stepper-horizontal'

// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'
import {Row, Col} from 'reactstrap'


import FinancialSelfPayAgreement from "./consent-forms/FinancialSelfPayAgreement"
import ConsentToTreatment from "./consent-forms/ConsentToTreatment"
import LifeSaversEmergencyRoom from "./consent-forms/LifeSaversEmergencyRoom"
import PatientRights from "./consent-forms/PatientRights"
import Authorization from "./consent-forms/Authorization"
import AssignmentOfBenefits from "./consent-forms/AssignmentOfBenefits"
import LifeSaverErPolicy from "./consent-forms/LifeSaverErPolicy"

const pages = [
  {
    title: 'FINANCIAL NEED BASED / SELF-PAY PATIENTS',
    component: (
      <FinancialSelfPayAgreement clasname={'mb-3'}/>
    )
  },
  {
    title: 'CONSENT TO TREATMENT',
    component: (
      <ConsentToTreatment clasname={'mb-3'}/>
    )
  },
  {
    title: 'LIFE SAVERS EMERGENCY ROOM',
    component: (
      <LifeSaversEmergencyRoom  clasname={'mt-3 mb-3'}/>
    )
  },
  {
    title: 'PATIENT’S RIGHTS AND RESPONSIBILITIES',
    component: (
      <PatientRights clasname={'mt-3 mb-3'}/>
    )
  },
  {
    title: 'AUTHORIZATION',
    component: (
      <Authorization clasname={'mt-3 mb-3'}/>
    )
  },
  {
    title: 'ASSIGNMENT OF BENEFITS',
    component: (
      <AssignmentOfBenefits clasname={'mt-3 mb-3'}/>
    )
  },
  {
    title: 'LIFE SAVERS ER PATIENT PAYMENT POLICY & AGREEMENT',
    component: (
      <LifeSaverErPolicy clasname={'mt-3 mb-3'}/>
    )
  }
]


const MVAWorkersCompPacket = ({stepperProps, consentFormInformation, setConsentFormInformation}) => {
  const [nextActiveStep, setActiveStep] = useState(1)

  const mvaWorkersComp = pages.map((page, index) => {
    return {
      title: page.title,
      onClick: () => { setActiveStep(index + 1) }
    }
  })

  const renderPage = (pageInd) => {
    return (
      pages[pageInd].component
    )
  }
  return (
    <div>
      <Row className='mt-1 mb-3'>
        <Col sm='12'>
          <h3>
            <span className='align-middle'> MVA WORKERS COMP PACKET </span>
          </h3>
        </Col>
      </Row>
      <Row className={'d-flex justify-content-center'}>
        <Stepper steps = {mvaWorkersComp}
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
      <Row className={'d-flex justify-content-center mt-2'}>
        <Col lg='10' md='11' sm='12'>
          {
            renderPage(nextActiveStep - 1)
          }
        </Col>
      </Row>
    </div>
  )
}
export default MVAWorkersCompPacket
