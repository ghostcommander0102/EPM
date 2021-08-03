// ** React Imports
import React, {useState, Component, useEffect} from 'react'

// Custom Component
import Stepper from 'react-stepper-horizontal'

// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'
import {Row, Col} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

import ConsentToTreatment from "./consent-forms/ConsentToTreatment"
import FinancialInformation from "./consent-forms/FinancialInformation"
import LifeSaversEmergencyRoom from "./consent-forms/LifeSaversEmergencyRoom"
import PatientRights from "./consent-forms/PatientRights"
import Authorization from "./consent-forms/Authorization"
import ScreeningCovid19 from "./consent-forms/ScreeningCovid19"


const InsurancePatientPacket = ({stepperProps }) => {
  const pages = [
    {
      title: <span className='font-weight-bold'>CONSENT TO <br/> TREATMENT</span>,
      component: <ConsentToTreatment/>
    },
    {
      title: <span className='font-weight-bold'>FINANCIAL <br/> INFORMATION</span>,
      component: <FinancialInformation/>
    },
    {
      title:  <span className='font-weight-bold'>LIFE SAVERS <br/> EMERGENCY <br/> ROOM</span>,
      component: <LifeSaversEmergencyRoom/>
    },
    {
      title: <span className='font-weight-bold'>PATIENT’S RIGHTS <br/> AND <br/> RESPONSIBILITIES</span>,
      component: <PatientRights
        // data={patientRightsInfo}
        // setData={value => setPatientRightsInfo(value)}
      />
    },
    {
      title: <span className='font-weight-bold'>AUTHORIZATION</span>,
      component: <Authorization
        // data={authorizationInfo}
        // setData={value => setAuthorizationInfo(value)}
      />
    },
    {
      title: <span className='font-weight-bold'>SCREENING FOR <br/> COVID-19</span>,
      component: <ScreeningCovid19/>
    }

  ]

  // useEffect(() => {
  //   let newData = data
  //   newData = {...newData, ['consentToTreatmentInfo']: consentToTreatmentInfo}
  //   setData(newData)
  // }, [consentToTreatmentInfo])
  //
  // useEffect(() => {
  //   let newData = data
  //   newData = {...newData, ['setFinancialInfo']: setFinancialInfo}
  //   setData(newData)
  // }, [setFinancialInfo])
  //
  // useEffect(() => {
  //   let newData = data
  //   newData = {...newData, ['lifeSaversEmergencyRoomInfo']: lifeSaversEmergencyRoomInfo}
  //   setData(newData)
  // }, [lifeSaversEmergencyRoomInfo])
  //
  // useEffect(() => {
  //   let newData = data
  //   newData = {...newData, ['patientRightsInfo']: patientRightsInfo}
  //   setData(newData)
  // }, [patientRightsInfo])
  //
  // useEffect(() => {
  //   let newData = data
  //   newData = {...newData, ['authorizationInfo']: authorizationInfo}
  //   setData(newData)
  // }, [authorizationInfo])
  //
  // useEffect(() => {
  //   setConsentFormInformation(data)
  // }, [data])

  const [nextActiveStep, setActiveStep] = useState(1)

  const insuredPageSteps = pages.map((page, index) => {
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
      <Row className='mt-1 mb-1'>
        <Col sm='12'>
          <h3>
            <span className='align-middle'> INSURED PATIENT PACKET </span>
          </h3>
        </Col>
      </Row>
      <Row className={'d-flex justify-content-center'}>
        <Stepper steps = {insuredPageSteps}
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
export default InsurancePatientPacket
