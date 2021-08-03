import { useEffect, useState } from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'
import {Calendar, Settings} from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Button} from 'reactstrap'
import Flatpickr from "react-flatpickr"


const CardPatients = props => {
  const [period, setPeriod] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('/card/card-analytics/revenue').then(res => setData(res.data))
  }, [period])

  const options = {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        type: 'line',
        offsetX: -10
      },
      stroke: {
        curve: 'smooth',
        dashArray: [0, 10],
        width: [3, 2]
      },
      legend: {
        show: true
      },
      colors: [props.color1, props.color2],
      // fill: {
      //   type: 'gradient',
      //   gradient: {
      //     shade: 'dark',
      //     inverseColors: false,
      //     gradientToColors: [props.primary, '#ebe9f1'],
      //     shadeIntensity: 1,
      //     type: 'horizontal',
      //     opacityFrom: 1,
      //     opacityTo: 1,
      //     stops: [0, 100, 100, 100]
      //   }
      // },
      markers: {
        size: 0,
        hover: {
          size: 3
        }
      },
      xaxis: {
        labels: {
          style: {
            colors: '#b9b9c3',
            fontSize: '1rem'
          }
        },
        axisTicks: {
          show: false
        },
        categories: ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'],
        axisBorder: {
          show: false
        },
        tickPlacement: 'on'
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          style: {
            colors: '#b9b9c3',
            fontSize: '1rem'
          },
          formatter(val) {
            return val > 999 ? `${(val / 1000).toFixed(0)}k` : val
          }
        }
      },
      grid: {
        borderColor: '#e7eef7',
        padding: {
          top: -20,
          bottom: -10,
          left: 20
        }
      },
      tooltip: {
        x: { show: false }
      }
    },
    series = [
      {
        name: 'This Month',
        data: [450, 470, 448, 475, 455, 480, 465]
      },
      {
        name: 'Last 7 days',
        data: [460, 480, 455, 466, 445, 465, 450]
      }
    ]
  return data !== null ? (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Patients</CardTitle>
        <div className='d-flex align-items-center'>
          <Calendar size={15} />
          <Flatpickr
            options={{
              mode: 'range',
              defaultDate: ['2021-05-01', '2021-05-10']
            }}
            className='form-control flat-picker bg-transparent border-0 shadow-none'
          />
        </div>

      </CardHeader>
      <CardBody>
        <div className='d-flex justify-content-end mr-2'>
          <div>
            <h4 className='d-flex justify-content-end'>
              <span> Total <span className='text-primary font-weight-bolder'> 865 </span>
              </span>
            </h4>
          </div>
        </div>
        <Chart options={options} series={series} type='line' height={240} />
      </CardBody>
    </Card>
  ) : null
}
export default CardPatients
