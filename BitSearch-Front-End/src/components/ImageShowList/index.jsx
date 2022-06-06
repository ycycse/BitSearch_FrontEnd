import React, {useState} from 'react';
import {useUpdate} from 'ahooks';
import {Collapse, List, Pagination, Tag, Typography} from "antd";
import {Link} from "react-router-dom";
import TypeTag from "../TypeTag";
import './index.css';
import removeLastCharacter from "../../utils/removeLastCharacter";

const { Panel } = Collapse

function ImageShowList(props) {
    let filter = 'desc'
    const { total,currentPage} = props
    // switch(selectedTag){
    //     case '相关度': filter = 'relate';break;
    //     case '评论数': filter = 'comment';break;
    //     case '最近': filter = 'recent';break;
    //     case '评分': filter = 'score';break;
    // }
    const onChange = async (page,pageNum) => {
        sessionStorage.setItem('currentPage',page)
        await props.getData(page,filter,'Image',pageNum)
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    console.log("props",props.listData)
    // const handleChange = async (tag,checked)=>{
    //     if(checked){
    //         // switch(tag){
    //         //     case '相关度': filter = 'relate';break;
    //         //     case '评论数': filter = 'comment';break;
    //         //     case '最近': filter = 'recent';break;
    //         //     case '评分': filter = 'score';break;
    //         // }
    //         sessionStorage.setItem('selectedTag',filter)
    //         await onChange(1,10)
    //     }
    // }

    return (
        <div>
            {
                <div style={{marginLeft:'1%'}}>
                    <Collapse ghost >
                        <Panel header={'结果排序'} key={1} >
                        </Panel>
                    </Collapse>
                </div>
            }
            {
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={props.listData}
                    renderItem={item => (
                        <List.Item
                            key={item.cid}
                            // extra={
                            //     <div style={{width:'10rem',height:'15rem',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            //         <a href={removeLastCharacter(item.document.URL)} target="_blank" rel="noopener noreferrer">
                            //             <img
                            //                 style={{width:'20rem',height:'15rem'}}
                            //                 alt="logo"
                            //                 src={removeLastCharacter(item.document.URL)}
                            //             />
                            //         </a>
                            //     </div>
                            // }
                        >
                            <List.Item.Meta
                                title={<div style={{display:'flex',alignItems:'center',height:'2rem'}}>
                                    <span>{item.text}</span>
                                    {/* <Link to={removeLastCharacter(item.document.URL)}
                                          style={{fontSize:'1.1rem',color:'black'}}
                                        //   dangerouslySetInnerHTML={item.text}
                                            // dangerouslySetInnerHTML="内容"
                                    >
                                        {item.text }
                                    </Link>&nbsp;&nbsp; */}
                                    <TypeTag type="game"/>
                                </div>}
                                // description={
                                //     item.tags===null?'':item.tags.map((item,index)=>{
                                //         if(index<14){
                                //             return <Tag><div dangerouslySetInnerHTML={item}/></Tag>
                                //         }
                                //     })}
                            />
                            {/* <div className={'item-info-tag'}><Tag color={'geekblue'}>标题</Tag>{<div dangerouslySetInnerHTML={item.document.title}/> || '暂无'}</div> */}
                            <div className={'item-info-tag'}><Tag color={'geekblue'}></Tag>
                                {/* <div id={'description-wrapper'} dangerouslySetInnerHTML={item.description}> */}
                                {/* </div> */}
                            </div>
                            <div style={{width:'10rem',height:'15rem'}}>
                                    <a href={removeLastCharacter(item.document.URL)} target="_blank" rel="noopener noreferrer">
                                        <img
                                            style={{width:'20rem',height:'15rem'}}
                                            alt="logo"
                                            src={removeLastCharacter(item.document.URL)}
                                        />
                                    </a>
                                </div>
                        </List.Item>
                    )}
                />
            }
            {
                <div style={{float:'right'}}>
                    <Pagination showQuickJumper showSizeChanger={false} total={total} onChange={onChange} current={currentPage} defaultPageSize={10}/>
                </div>
            }
        </div>
    );
}

export default ImageShowList;