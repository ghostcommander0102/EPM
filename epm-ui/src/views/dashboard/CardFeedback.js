import { HorizontalBar } from 'react-chartjs-2'
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from 'reactstrap'


const CardFeedback = props => {
  const options = {
      elements: {
        rectangle: {
          borderWidth: 2,
          borderSkipped: 'right'
        }
      },
      tooltips: {
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: props.tooltipShadow,
        backgroundColor: '#fff',
        titleFontColor: '#000',
        bodyFontColor: '#000'
      },
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      legend: {
        display: false
      },
      layout: {
        padding: {
          bottom: -30,
          left: -25
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              zeroLineColor: props.gridLineColor,
              borderColor: 'transparent',
              color: props.gridLineColor,
              drawTicks: false
            },
            scaleLabel: {
              display: true
            },
            ticks: {
              min: 0,
              fontColor: props.labelColor
            }
          }
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true
            },
            ticks: {
              fontColor: props.labelColor
            }
          }
        ]
      }
    },
    data1 = {
      labels: Object.keys(props.series).slice(0, 9),
      datasets: [
        {
          data: Object.values(props.series).slice(0, 9),
          backgroundColor: props.backgroundColor,
          borderColor: 'transparent',
          barThickness: 15
        }
      ]
    },
    data2 = {
    labels: Object.keys(props.series).slice(-8),
    datasets: [
      {
        data: Object.values(props.series).slice(-8),
        backgroundColor: props.backgroundColor,
        borderColor: 'transparent',
        barThickness: 15
      }
    ]
  }

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
        <div>
          <CardTitle tag='h4'>Feedback</CardTitle>
        </div>
      </CardHeader>
      <CardBody>
        <Row>
          <Col lg='6' md='6' sm='12'>
            <div style={{ height: '360px' }}>
              <HorizontalBar data={data1} options={options} height={360} />
            </div>
          </Col>
          <Col lg='6' md='6' sm='12'>
            <div style={{ height: '320px' }}>
              <HorizontalBar data={data2} options={options} height={320} />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default CardFeedback
