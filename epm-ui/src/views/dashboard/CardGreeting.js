import { useState } from 'react'
import {Row, Col, Card, CardBody, CardText, CardHeader} from 'reactstrap'
import illustration from '@src/assets/images/illustration/greeting.svg'


const monthNames = ["JAN", "FEB", "MAR", "APR", "AMY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

const CardGreeting = () => {
  const [picker, setPicker] = useState(new Date())

  return (
    <Card className='card-developer-meetup'>
      <CardHeader style={{paddingTop: 0, paddingRight: 0, paddingBottom: 0}}>
        <Col lg='3' md='4' sm='2'>
          <div>
            <h4 className='font-weight-bolder' >{weekDays[picker.getDay() + 1]}</h4>
            <h4>{picker.getDate() + 1} {monthNames[picker.getMonth() + 1]}</h4>
          </div>
        </Col>
        <Col lg='9' md='8' sm='10' style={{paddingRight: 0}}>
          <div className='meetup-img-wrapper text-center'>
            <img src={illustration} height='120'/>
          </div>
        </Col>
      </CardHeader>
      <CardBody style={{paddingTop: 15}}>
        <CardText tag='h5' lg='12' sm='12' className={'d-flex justify-content-center align-items-center'}>
          <span>Welcome back. Have a nice day!</span>
        </CardText>
      </CardBody>
    </Card>
  )
}

export default CardGreeting
