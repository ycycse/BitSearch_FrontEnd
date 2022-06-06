import React from 'react';
import {Collapse, List, Pagination, Tag} from "antd";
import TypeTag from "../TypeTag";
import './index.css';

const { Panel } = Collapse

function WebPageShowList(props) {
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
        await props.getData(page,filter,'WebPage',pageNum)
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
                            key={item.id}
                        >
                            <List.Item.Meta
                                title={<div style={{display:'flex',alignItems:'center',height:'2rem'}}>
                                    <span><a href={item.document.URL} target="_blank" rel="noopener noreferrer">{item.document.title}</a></span>
                                    {/* <Link to={removeLastCharacter(item.document.URL)}
                                          style={{fontSize:'1.1rem',color:'black'}}
                                        //   dangerouslySetInnerHTML={item.text}
                                            // dangerouslySetInnerHTML="内容"
                                    >
                                        {item.text }
                                    </Link>&nbsp;&nbsp; */}
                                    <TypeTag type="anime"/>
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
                                <div id={'description-wrapper'}><span>{item.text}</span>
                                </div>
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

export default WebPageShowList;