import {useState, useEffect} from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { LogIn, LogOut, Clock, Bell } from 'react-feather'
import {Card, CardHeader, CardTitle, CardSubtitle, CardBody, CardText, Row, Col, Media, CustomInput, FormGroup} from 'reactstrap'

const CardStats = ({info}) => {

  const [period, setPeriod] = useState('today')
  const [data, setData] = useState(null)

  useEffect(() => {
    setData([
      {
        title: info[period].totalCheckIn,
        subtitle: 'Total check-in',
        color: 'light-primary',
        icon: <LogIn size={24} />
      },
      {
        title: info[period].totalCheckOut,
        subtitle: 'Total check-out',
        color: 'light-info',
        icon: <LogOut size={24} />
      },
      {
        title: info[period].curInWR,
        subtitle: 'Currently in W.R',
        color: 'light-success',
        icon: <Clock size={24} />
      },
      {
        title: info[period].curInER,
        subtitle: 'Currently in E.R',
        color: 'light-danger',
        icon: <Bell size={24} />
      }
    ])
  }, [period])

  const cols = { lg: '3',  md: '6', sm: '3' }


  const renderData = () => {
    return data.map((item, index) => {
      const margin = Object.keys(cols)
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-1 mb-${margin[0]}-0`]: index !== data.length - 1
          })}
        >
          <Media>
            <Avatar color={item.color} icon={item.icon} size='lg' className='mr-1' />
            <Media className='my-auto' body>
              <h4 className='font-weight-bolder'>{item.title}</h4>
              <CardText className='font-small-3'>{item.subtitle}</CardText>
            </Media>
          </Media>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4' className={'mt-0 mb-0'}>Statistics</CardTitle>
        <CardSubtitle>
          <div className='demo-inline-spacing'>
            <CustomInput type='radio' className='custom-control' label='Today' name='period' id='today'
                         checked={period === 'today'}
                         onChange={e => setPeriod(e.target.id)}
            />
            <CustomInput type='radio' className='custom-control' label='Last 7 days' name='period' id='last7days'
                         checked={period === 'last7days'}
                         onChange={e => setPeriod(e.target.id)}
            />
          </div>
        </CardSubtitle>
      </CardHeader>
      <CardBody className='mt-1'>
        <Row>{(data !== null) && renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default CardStats
