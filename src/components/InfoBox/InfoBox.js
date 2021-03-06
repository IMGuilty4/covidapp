import { Card, CardContent, Typography } from '@material-ui/core'
import "./InfoBox.css"
import React from 'react'

function InfoBox({ title, cases, total, active, isRed, ...props }) {
    return (
        <Card
        onClick={props.onClick} 
        className={`infoBox ${active && "infoBox--selected"} ${
            isRed && "infoBox--red"
          }`}
        >
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
                    Сегодня: {cases}
                </h2>
                <Typography className="infoBox__total">
                    Всего: {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
