import React, {Fragment, useContext, useEffect} from 'react'
import {Row, Col} from 'reactstrap'
import {Chart} from "react-chartjs-2"

import CardGreeting from '@src/views/dashboard/CardGreeting'
import CardPatients from '@src/views/dashboard/CardPatients'
import TableDischarged from '@src/views/dashboard/TableDischarged'
import TablePendingTask from '@src/views/dashboard/TablePendingTask'
import TableWaitingRoom from '@src/views/dashboard/TableWaitingRoom'
import TableEmergencyRoom from "@src/views/dashboard/TableEmergencyRoom"
import CardStats from "@src/views/dashboard/CardStats"
import CardPayments from "@src/views/dashboard/CardPayments"
import CardFeedback from "@src/views/dashboard/CardFeedback"


// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'


const statisticsInfo = {
  today: {
    totalCheckIn : 15,
    totalCheckOut: 15,
    curInWR: 5,
    curInER: 3
  },
  last7days: {
    totalCheckIn : 60,
    totalCheckOut: 75,
    curInWR: 50,
    curInER: 13
  }
}

const paymentsInfo = {
    insured: 24,
    selfPay: 10
}

const patientsData = {
    last7days: {
      keys: ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'],
      values: [20, 15, 16, 10, 15, 10, 5]
    },
    month: {
      keys: ['6/12', '6/13', '6/14', '6/15', '6/16', '6/17', '6/18', '6/19', '6/20', '6/21', '6/22'],
      values: [28, 20, 22, 18, 27, 25, 7, 9, 20, 15, 16]
    }

}

const feedbackData1 = {
    "Clinic Sign/Drive by": 50,
    "Web Browser (Google, Bing, Yahoo)": 15,
    "I was former patient": 95,
    "Former patient recommendation": 75,
    "Insurance company recommendation": 95,
    "TV Advertisement": 40,
    "Lifesaver.com": 80,
    Doctor: 50,
    "Family or Friend": 70,
    Employer: 95,
    Newspaper: 50,
    "Marketing/Public Relation Representation": 15,
    Other: 40,
    "Children's Festival": 80,
    "Radio Advertising": 95,
    GOOGLE: 75,
    Yelp: 70
}

const AnalyticsDashboard = () => {
  const { colors } = useContext(ThemeColors),
    [skin, setSkin] = useSkin(),
    labelColor = skin === 'dark' ? '#b4b7bd' : '#6e6b7b',
    tooltipShadow = 'rgba(0, 0, 0, 0.25)',
    gridLineColor = 'rgba(200, 200, 200, 0.2)',
    lineChartPrimary = '#666ee8',
    lineChartDanger = '#ff4961',
    warningColorShade = '#ffe802'
    // warningLightColor = '#FDAC34',
    // successColorShade = '#28dac6',
    // primaryColorShade = '#836AF9',
    // infoColorShade = '#299AFF',
    // yellowColor = '#ffe800',
    // greyColor = '#4F5D70',
    // blueColor = '#2c9aff',
    // blueLightColor = '#84D0FF',
    // greyLightColor = '#EDF1F4'

  // ** To Set Border Radius On Mount
  useEffect(() => {
    /*eslint-disable */
    Chart.elements.Rectangle.prototype.draw = function () {
      let ctx = this._chart.ctx
      let viewVar = this._view
      let left, right, top, bottom, signX, signY, borderSkipped, radius
      let borderWidth = viewVar.borderWidth
      let cornerRadius = 20
      if (!viewVar.horizontal) {
        left = viewVar.x - viewVar.width / 2
        right = viewVar.x + viewVar.width / 2
        top = viewVar.y
        bottom = viewVar.base
        signX = 1
        signY = top > bottom ? 1 : -1
        borderSkipped = viewVar.borderSkipped || 'bottom'
      } else {
        left = viewVar.base
        right = viewVar.x
        top = viewVar.y - viewVar.height / 2
        bottom = viewVar.y + viewVar.height / 2
        signX = right > left ? 1 : -1
        signY = 1
        borderSkipped = viewVar.borderSkipped || 'left'
      }

      if (borderWidth) {
        let barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom))
        borderWidth = borderWidth > barSize ? barSize : borderWidth
        let halfStroke = borderWidth / 2
        let borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0)
        let borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0)
        let borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0)
        let borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0)
        if (borderLeft !== borderRight) {
          top = borderTop
          bottom = borderBottom
        }
        if (borderTop !== borderBottom) {
          left = borderLeft
          right = borderRight
        }
      }

      ctx.beginPath()
      ctx.fillStyle = viewVar.backgroundColor
      ctx.strokeStyle = viewVar.borderColor
      ctx.lineWidth = borderWidth
      let corners = [
        [left, bottom],
        [left, top],
        [right, top],
        [right, bottom]
      ]

      let borders = ['bottom', 'left', 'top', 'right']
      let startCorner = borders.indexOf(borderSkipped, 0)
      if (startCorner === -1) {
        startCorner = 0
      }

      function cornerAt(index) {
        return corners[(startCorner + index) % 4]
      }

      let corner = cornerAt(0)
      ctx.moveTo(corner[0], corner[1])

      for (let i = 1; i < 4; i++) {
        corner = cornerAt(i)
        let nextCornerId = i + 1
        if (nextCornerId === 4) {
          nextCornerId = 0
        }

        // let nextCorner = cornerAt(nextCornerId)

        let width = corners[2][0] - corners[1][0],
          height = corners[0][1] - corners[1][1],
          x = corners[1][0],
          y = corners[1][1]

        let radius = cornerRadius

        if (radius > height / 2) {
          radius = height / 2
        }
        if (radius > width / 2) {
          radius = width / 2
        }

        if (!viewVar.horizontal) {
          ctx.moveTo(x + radius, y)
          ctx.lineTo(x + width - radius, y)
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
          ctx.lineTo(x + width, y + height - radius)
          ctx.quadraticCurveTo(x + width, y + height, x + width, y + height)
          ctx.lineTo(x + radius, y + height)
          ctx.quadraticCurveTo(x, y + height, x, y + height)
          ctx.lineTo(x, y + radius)
          ctx.quadraticCurveTo(x, y, x + radius, y)
        } else {
          ctx.moveTo(x + radius, y)
          ctx.lineTo(x + width - radius, y)
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
          ctx.lineTo(x + width, y + height - radius)
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
          ctx.lineTo(x + radius, y + height)
          ctx.quadraticCurveTo(x, y + height, x, y + height)
          ctx.lineTo(x, y + radius)
          ctx.quadraticCurveTo(x, y, x, y)
        }
      }

      ctx.fill()
      if (borderWidth) {
        ctx.stroke()
      }
    }
  }, [])

  return (
    <Fragment>
      <div id='dashboard-analytics'>
        <Row className='match-height'>
          <Col lg='4' md='4' sm='12'>
            <CardGreeting/>
          </Col>
          <Col lg='8' md='8' sm='12'>
            <CardStats info={statisticsInfo}> </CardStats>
          </Col>
        </Row>

        <Row className='match-height'>
          <Col lg='4' md='4' sm='12'>
            <CardPayments color1={colors.primary.main} color2={colors.info.main}
                          paymentsInfo={paymentsInfo}
            />
          </Col>
          <Col lg='8' md='8' sm='12'>
            <CardPatients color1={colors.primary.main} color2={colors.secondary.main} totalNum={8}/>
          </Col>
        </Row>

        <Row className='match-height'>
          <Col lg='8' md='12' sm='12'>
            <TableEmergencyRoom/>
          </Col>
          <Col lg='4' md='6' sm='12'>
            <TableWaitingRoom/>
          </Col>
          <Col lg='4' md='6' sm='12'>
            <TableDischarged/>
          </Col>
          <Col lg='8' md='12' sm='12'>
            <TablePendingTask/>
          </Col>
        </Row>

        <Row>
          <Col lg='12' md='12' sm='12'>
            <CardFeedback
              labelColor={labelColor}
              tooltipShadow={tooltipShadow}
              gridLineColor={gridLineColor}
              backgroundColor={colors.info.main}
              series={feedbackData1}
            />
          </Col>
        </Row>
      </div>
    </Fragment>
  )
}

export default AnalyticsDashboard
