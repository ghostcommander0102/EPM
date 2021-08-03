// ** React Imports
import React, {useEffect, useState} from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import SignatureCanvas from 'react-signature-canvas'
import 'cleave.js/dist/addons/cleave-phone.us'
import {FileText} from "react-feather"
import { useForm, Controller } from 'react-hook-form'
import {Row, Col, Button, Label, FormGroup, Input, CustomInput, CardHeader, CardTitle, CardBody, Card, Form} from 'reactstrap'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils
import { getUserRole } from '@utils'
import {useDispatch, useSelector} from "react-redux"
const ROLE_PATIENT = 'patient'

const ScreeningCovid19 = () => {

  const userRole = getUserRole()
  const dispatch = useDispatch()
  const store = useSelector(state => state.patient?.selectedData)

  const [data, setData] = useState(store?.screeningCovid19 || null)

  const onSelectChange = (fieldName, option) => {
    let newData = data || {}
    newData = {...newData, [fieldName]: option}
    setData(newData)
  }

  useEffect(() => {
    let newData = store
    newData = {...newData,
      ["screeningCovid19"]:
      data
    }
    dispatch({
      type: 'SELECTED_DATA',
      selectedData: newData
    })
  }, [data])

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  return (
      <Card>
        <CardHeader>
          <Col lg={'12'} className={'mt-1'} style={{textAlign: 'center'}}>
            <span className='font-weight-bold' style={{ textAlign: 'center', fontSize: 20 }}>
              SCREENING FOR COVID-19 QUESTIONAIRE
            </span>
          </Col>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg='1'/>
            <Col lg='7'><label className='d-block mb-1'>QUESTIONS</label></Col>
            <Col lg='2'><label className='d-block mb-1'>YES</label></Col>
            <Col lg='2'><label className='d-block mb-1'>NO</label></Col>
          </Row>

          <Row>
            <Col lg='1'>{" "}</Col>
            <Col lg='7'>
              <label className='d-block mb-1'>DO YOU HAVE A FEVER? *ABOVE 100.4 F (38 C)</label></Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasFeverYes' name='hasFever'
                           checked={data?.hasFever === 'yes' }
                           onChange={() => onSelectChange('hasFever', 'yes')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasFeverNo' name='hasFever'
                           checked={data?.hasFever === 'no' }
                           onChange={() => onSelectChange('hasFever', 'no')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='1'/>
            <Col lg='7'>
              <label className='d-block mb-1'>DO YOU HAVE A COUGH?</label></Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasCoughYes' name='hasCough'
                           checked={data?.hasCough === 'yes' }
                           onChange={() => onSelectChange('hasCough', 'yes')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasCoughNo' name='hasCough'
                           checked={data?.hasCough === 'no' }
                           onChange={() => onSelectChange('hasCough', 'no')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='1'/>
            <Col lg='7'>
              <label className='d-block mb-1'>HAVE YOU BEEN AROUND ANYONE WITH A COUGH,SHORTNESS OF BREATH,FEVER OR FLU-LIKE SYMPTOMS?</label></Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasBeenOtherYes' name='hasBeenOther'
                           checked={data?.hasBeenOther === 'yes' }
                           onChange={() => onSelectChange('hasBeenOther', 'yes')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasBeenOtherNo' name='hasBeenOther'
                           checked={data?.hasBeenOther === 'no' }
                           onChange={() => onSelectChange('hasBeenOther', 'no')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='1'/>
            <Col lg='7'>
              <label className='d-block mb-1'>DO YOU HAVE OTHER HEALTH CONDITIONS? <br/> DIABETES, LUNG DISEASE, HEART DISEASE, PREGNANCY?
              </label></Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasOtherProbYes' name='hasOtherProb'
                           checked={data?.hasOtherProb === 'yes' }
                           onChange={() => onSelectChange('hasOtherProb', 'yes')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasOtherProbNo' name='hasOtherProb'
                           checked={data?.hasOtherProb === 'no' }
                           onChange={() => onSelectChange('hasOtherProb', 'no')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='1'>{" "}</Col>
            <Col lg='7'>
              <label className='d-block mb-1'>HAVE YOU TRAVELED TO ANY INTERNATIONAL COUNTRIES?
                CHINA, JAPAN,SOUTH KOREA,ITALY, IRAN OR EUROPE?
              </label>
            </Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasInternationalTravelYes' name='hasInternationalTravel'
                           checked={data?.hasInternationalTravel === 'yes' }
                           onChange={() => onSelectChange('hasInternationalTravel', 'yes')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasInternationalTravelNo' name='hasInternationalTravel'
                           checked={data?.hasInternationalTravel === 'no' }
                           onChange={() => onSelectChange('hasInternationalTravel', 'no')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='1'>{" "}</Col>
            <Col lg='7'>
              <label className='d-block mb-1'>HAVE YOU BEEN AROUND ANYONE DIAGNOSED WITH COVID-19?
              </label></Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasBeenDiagnosedYes' name='hasBeenDiagnosed'
                           checked={data?.hasBeenDiagnosed === 'yes' }
                           onChange={() => onSelectChange('hasBeenDiagnosed', 'yes')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasBeenDiagnosedNo' name='hasBeenDiagnosed'
                           checked={data?.hasBeenDiagnosed === 'no' }
                           onChange={() => onSelectChange('hasBeenDiagnosed', 'no')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='1'/>
            <Col lg='7'>
              <label className='d-block mb-1'>HAVE YOU BEEN AROUND ANYONE INVESTIGATED FOR COVID-19?
              </label></Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasBeenInvestigatedYes' name='hasBeenInvestigated'
                           checked={data?.hasBeenInvestigated === 'yes' }
                           onChange={() => onSelectChange('hasBeenInvestigated', 'yes')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasBeenInvestigatedNo' name='hasBeenInvestigated'
                           checked={data?.hasBeenInvestigated === 'no' }
                           onChange={() => onSelectChange('hasBeenInvestigated', 'no')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='1'>{" "}</Col>
            <Col lg='7'>
              <label className='d-block mb-1'>HAVE YOU TRAVELED WITHIN THE U.S TO AN ENDEMIC AREA WITHIN THE LAST 2 WEEKS?
              </label>
            </Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasTravelToEndemicYes' name='hasTravelToEndemic'
                           checked={data?.hasTravelToEndemic === 'yes' }
                           onChange={() => onSelectChange('hasTravelToEndemic', 'yes')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasTravelToEndemicNo' name='hasTravelToEndemic'
                           checked={data?.hasTravelToEndemic === 'no' }
                           onChange={() => onSelectChange('hasTravelToEndemic', 'no')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
          </Row>

          <Row className={'mt-1'}>
            <Col lg='1'/>
            <Col lg='7'>
              <label className='d-block mb-1'>HAVE YOU TRAVELED WITHIN THE U.S TO A NON-EDEMIC AREA WITHIN THE LAST 2 WEEKS?
              </label></Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasTravelToNonEndemicYes' name='hasTravelToNonEndemic'
                           checked={data?.hasTravelToNonEndemic === 'yes' }
                           onChange={() => onSelectChange('hasTravelToNonEndemic', 'yes')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
            <Col lg='2'>
              <CustomInput inline type='checkbox' id='hasTravelToNonEndemicNo' name='hasTravelToNonEndemic'
                           checked={data?.hasTravelToNonEndemic === 'no' }
                           onChange={() => onSelectChange('hasTravelToNonEndemic', 'no')}
                           disabled={userRole !== ROLE_PATIENT}
              />
            </Col>
          </Row>

        </CardBody>
      </Card>
  )
}
export default ScreeningCovid19
