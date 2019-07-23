import React from 'react';
import {Avatar, List, Card, Icon,ConfigProvider,Empty, Button} from 'antd';
import {Link} from 'react-router-dom'
import './beneficiaryList.css'
const { Meta } = Card;

const IconText = ({ type, text, twoToneColor,theme,id,linkTo }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} twoToneColor={twoToneColor} theme={theme}/>
      <span style={{fontWeight:'500'}}> <Link to={linkTo}>{text}</Link></span>
    </span>
  );

const DisplayListInRow =(props) =>{
   
    return(
        <ConfigProvider renderEmpty={props.renderEmpty}>
            <List
                itemLayout="vertical"
                size="large" 
                dataSource={props.beneList}
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
    )
}

export default DisplayListInRow;