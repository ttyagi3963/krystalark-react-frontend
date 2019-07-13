import React , { Component, Fragment} from 'react';
import {Link} from 'react-router-dom'

import {Avatar, List, Card, Icon,ConfigProvider,Empty, Button} from 'antd';
import './beneficiaryList.css'
const { Meta } = Card;

const IconText = ({ type, text, twoToneColor,theme,id,linkTo }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} twoToneColor={twoToneColor} theme={theme}/>
      <span style={{fontWeight:'500'}}> <Link to={linkTo}>{text}</Link></span>
    </span>
  );

  

class BeneficiaryList extends Component {
    state = {
        beneList:[]
    };

    // componentWillMount(){
    //     fetch('http://localhost:8080/getBeneficiaryList',{
    //         method:'GET',
    //         headers:{
    //             Authorization: 'Bearer ' + this.props.token
    //         }
    //     })
    //     .then( result =>{
    //         if(result.status !==  200 && result.status !== 201){
    //             throw new Error('Could not get list')
    //         }
    //         return result.json();
    //     })
    //     .then(resData => {
            
    //         this.setState({beneList: resData.userData.beneficiarys, userData: resData.userData},function(){
              
    //         })
           
    //     })
    //     .catch(err =>{
    //         console.log(err)
    //     })
    // }

    customizeRenderEmpty = () => (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
            height: 60,
            }}
            description={
            <span className="NullText">
                <h5>You have not added any <b>Beneficiaries!</b></h5>
            </span>
            }
        >
            <Button type="primary" onClick={this.handleCreateBeneficiary}>Create a Beneficiary</Button>
            <div className="Subtext">(You can schedule a message for them later)</div>
      </Empty>
      );

    handleCreateBeneficiary=(props)=>{
        window.location.href="/createBeneficiary"
    }
    

    render(){
       
        return(
         <ConfigProvider renderEmpty={this.customizeRenderEmpty}>
            <List
                itemLayout="vertical"
                size="large" 
                dataSource={this.props.beneList}
                        renderItem={item => (
                            <List.Item
                                 key={item._id}
                                 actions={[                                     
                                    <IconText 
                                        id={item._id}
                                        type="profile" 
                                        theme="twoTone" 
                                        twoToneColor="#eb2f96" 
                                        text="View Profile" 
                                        linkTo={"/beneficiary/"+item._id}
                                        
                                        />,
                                    <IconText 
                                        id={item._id} 
                                        type="edit" 
                                        theme="twoTone" 
                                        twoToneColor="#52c41a" 
                                        text="Create a New Message" 
                                        linkTo={"/createMessage/messageType?bId="+item._id}
                                        /> ,

                                    <IconText 
                                        id={item._id} 
                                        type="message" 
                                        theme="twoTone" 
                                        twoToneColor="" 
                                        text="Scheduled Messages" 
                                        linkTo={"/createMessage/messageType?bId="+item._id}
                                        /> 
                                    
                                    ]}
                            >

                                <List.Item.Meta
                                    avatar={<Avatar style={{ backgroundColor: '#87d068' , marginRight:'10px', paddingBottom:'15px' }} icon="user" />}
                                    title={
                                        <Link to={"/beneficiary/"+item._id}>{item.name} ({item.relationship})</Link>
                                    }
                                  
                                    />
                               
                            </List.Item>
                        )}
                    />
        
            </ConfigProvider>                            

            // <Fragment>
            //      <Beneficiary beneficiary={this.state.beneList}></Beneficiary> 
            // </Fragment>
            
           
        )
    }

}

export default BeneficiaryList;