import React from 'react';
import { Steps, Button, message, DatePicker } from 'antd/';
import 'antd/dist/antd.css'


const { Step } = Steps;

const messageSteps = (props) =>{
    return(
            <Steps current={props.currentStep}>
                <Step title="Relationship" description="How are you related" />
                <Step title="Message Type" description="The type of message" />
                <Step title="Schedule" description="When should the message be sent" />
                <Step title="Reciever's Info" description="Contact Information of Reciever" />
                <Step title="Send Message" description="Compose and send" />
            </Steps>
    )
}

export default messageSteps
