import React, {Component, useState} from 'react';
import {List, Tag, Typography, Menu, Space, Button, message, Skeleton} from 'antd';
import TypeTag from "../TypeTag";
import './index.css';
import BiliBiliScoreTag from "../BiliBiliScoreTag";
import getBiliBiliDataByMediaName from "../../utils/getBiliBiliDataByMediaName";
import {Link} from "react-router-dom";
import {useMount, useUnmount, useUpdate} from "ahooks";
import PubSub from 'pubsub-js';
import outLineKeyWords from "../../utils/outLineKeyWords";
import AnimeShowList from "../AnimeShowList";
import BookShowList from "../BookShowList";
import WebPageShowList from '../WebPageShowList';
import axios from "axios";
import MusicShowList from "../MusicShowList";
import GameShowList from "../GameShowList";
import RealPersonShowList from "../RealPersonShowList";
import CharacterShowList from "../CharacterShowList";
import CompanyShowList from "../CompanyShowList";
import ImageShowList from '../ImageShowList';

function SearchResultList  (props) {
    const [searchString, setSearchString] = useState(props.searchString);
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataLength, setDataLength] =useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTag, setSelectedTag] = useState(sessionStorage.getItem('selectedTag')||'relate')
    let token = null;
    //根据传入的字符串获取相关信息，和后端的交互主要在这个函数里。
    const getDataBySearchString = async (str,page,orderby,type,pageNum) => {
        setLoading(true);

        str = str.split("NOT",2)   
        console.log("split",str)
        let filter
        if(str[1]===undefined){
            filter = []
        }else{
            filter = str[1].split(" ")
        }
        // let filter = str[1].split(" ")
        let searchData = {
            query:str[0],
            page:page,
            limit:pageNum,
            order:"desc",
            filterwords:filter
        }
        console.log("search data",searchData)
        let {data} = await axios.post('http://127.0.0.1:5678/api/query?database='+type,searchData)
        if(data.state === false){
            message.error('获取数据失败：'+data.message)
            return;
        }
        console.log("data",data)
        data = data.data
        let data_length = data.pageCount
        let ListData = data.documents
        let keywords = data.words
        for(let i=0,length=ListData.length;i<length;i++){
            let item = ListData[i]
            // item.document.title = outLineKeyWords(keywords, item.document.title);
            if(type==="WebPage"){
                let url = item.document.URL
                let detail = (await axios.post("http://127.0.0.1:5678/api/pageDetail?url="+url))
                if (detail.status===200){
                    console.log("detail",detail.data)
                    if(detail.data.state===true){
                        console.log(detail.data.data)
                        item.text = detail.data.data[0]
                        // item.description = "outLineKeyWords(keywords,detail.data[1])"
                    }
                }
            }

            // item.primary_name = outLineKeyWords(keywords, item.primary_name);
            // item.description = outLineKeyWords(keywords, item.description);
            // if(item.tags!==null){
            //     item.tags = item.tags.map(tag=>{
            //         return outLineKeyWords(keywords,tag)
            //     })
            // }
        }
        console.log("data_length",page)
        setDataLength(data_length);
        setListData(ListData);
        setLoading(false);
        setCurrentPage(page);
    }

    // const getBilibiliData = async (ListData)=>{
    //     for(let i=0;i<ListData.length;i++){
    //         let item = ListData[i];
    //         const bilibili_data  = await getBiliBiliDataByMediaName(item.zh_name);
    //         const result = bilibili_data.result;
    //         if(result === undefined){
    //             item.bilibili_score='暂无'
    //             item.bilibili_user_count='暂无'
    //         }else{
    //             item.bilibili_score = result[0].media_score.score
    //             item.bilibili_user_count = result[0].media_score.user_count
    //         }
    //         ListData[i]=item
    //     }
    //     setListData(ListData)
    // }

    const getData = async(page,orderby,type,pageNum)=>{
        await getDataBySearchString(searchString,page,orderby,type,pageNum)
    }

    useMount(async () => {
        //订阅上方导航栏输入的消息，获取对应字符串
        token = PubSub.subscribe('ChangeInput', async (msg, data) => {
            setSearchString(data);
            let c = Number(sessionStorage.getItem('currentPage'))||1
            let t = sessionStorage.getItem('selectedTag')||'relate'
            if(props.searchType === 'real_person'||props.searchType === 'company'||props.searchType === 'character'){
                if(t==='recent'||t==='score')t='relate'
            }
            await getDataBySearchString (data,c,t,props.searchType,10);
        });
        let c = Number(sessionStorage.getItem('currentPage'))||1
        let t = sessionStorage.getItem('selectedTag')||'relate'
        if(props.searchType === 'real_person'||props.searchType === 'company'||props.searchType === 'character'){
            if(t==='recent'||t==='score')t='relate'
        }
        await getDataBySearchString(searchString,c,t,props.searchType,10);
    })

    useUnmount(() => {
        if(token !== null) PubSub.unsubscribe(token);
    })
    switch(props.searchType){
        case 'WebPage': return (loading ? <Skeleton active/> : <WebPageShowList searchString={searchString} listData={listData} total={dataLength} getData={getData} currentPage={currentPage} selectedTag={selectedTag}/>);
        case 'Image': return (loading ? <Skeleton active/> : <ImageShowList searchString={searchString} listData={listData} total={dataLength} getData={getData} currentPage={currentPage} selectedTag={selectedTag}/>);
        default : return (loading ? <Skeleton active/> : <AnimeShowList searchString={searchString} listData={listData} total={dataLength} getData={getData} currentPage={currentPage} selectedTag={selectedTag}/>);
    }
}

export default SearchResultList;