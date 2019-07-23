import React from 'react';
import {Avatar, List, Card, Icon,ConfigProvider,Empty, Button} from 'antd';
import {Link} from 'react-router-dom'
import DisplayBListInRow from './beneficiaryListRowDisplay';
import './beneficiaryList.css'
const { Meta } = Card;

const IconText = ({ type, text, twoToneColor,theme,id,linkTo }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} twoToneColor={twoToneColor} theme={theme}/>
      <span style={{fontWeight:'500'}}> <Link to={linkTo}>{text}</Link></span>
    </span>
  );

const DisplayListInCol =(props) =>{
   
    return(
        <ConfigProvider renderEmpty={props.renderEmpty}>
                 <List
                           grid={{ gutter: 16, column: 4 }}
                           dataSource={props.beneList}
                           renderItem={item => (
                             <List.Item>
                               <Card title={item.name}>
                                   Card content</Card>
                             </List.Item>
                           )}
                         />
        
            </ConfigProvider>       
    )
}

export default DisplayListInCol;