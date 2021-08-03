import {Card, CardBody, CardHeader, CardTitle, CardText} from 'reactstrap'
import React from "react"


const CardTotalCheck = ({totalCategory, totalNum}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>{totalCategory}</CardTitle>
      </CardHeader>
      <CardBody>
        <div className='font-large-1 font-weight-bold'>
            {totalNum}
        </div>
      </CardBody>
    </Card>
  )
}

export default CardTotalCheck
