import Chart from 'react-apexcharts'
import { Card, CardTitle, CardBody, Row, Col } from 'reactstrap'
import { Shield, Smartphone } from 'react-feather'


function sum(obj) {
  return Object.keys(obj).reduce((sum, key) => sum + parseFloat(obj[key] || 0), 0)
}


const CardPayments = ({color1, color2, paymentsInfo}) => {

  const total = sum(paymentsInfo)

  const options = {
    chart: {
      sparkline: {
        enabled: true
      },
      // dropShadow: {
      //   enabled: true,
      //   blur: 3,
      //   left: 1,
      //   top: 1,
      //   opacity: 0.1
      // },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: true
    },
    legend: { show: false },
    comparedResult: [2, 8],
    labels: ['Insured', 'Self-Pay'],
    stroke: { width: 0 },
    colors: [color1, color2],
    grid: {
      padding: {
        right: -10,
        bottom: -0,
        left: -10
      }
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)}`
              }
            },
            total: {
              show: true,
              offsetY: 15,
              label: 'Total',
              formatter(w) {
                return `${parseInt(total)}`
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 250
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 250
          }
        }
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 200
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 200
          }
        }
      }
    ]
  }

  return (
    <Card className='earnings-card'>
      <CardBody>
        <Row className={'mb-1'}>
          <Col md='12'>
            <CardTitle className='mb-1'>Payments</CardTitle>
          </Col>

          <Col>
            <Chart options={options} series={Object.values(paymentsInfo)} type='donut' height={250} />
          </Col>

        </Row>

        <Row className='d-flex align-items-center justify-content-center flex-wrap mt-1'>
          <div className={'demo-inline-spacing d-flex align-items-center justify-content-center'}>
            <div>
              <Shield color={color1} size={40}/>
            </div>
            <div>
              <span>Insured<br/><span className='font-weight-bolder'>{paymentsInfo.insured}</span></span>
            </div>
          </div>

          <div className={'demo-inline-spacing d-flex align-items-center justify-content-center'}>
            <div>
              <Smartphone color={color2} size={40}/>
            </div>
            <div>
              <span>SelfPay<br/><span className='font-weight-bolder'>{paymentsInfo.selfPay}</span></span>
            </div>
          </div>

        </Row>
      </CardBody>
    </Card>
  )
}


export default CardPayments
