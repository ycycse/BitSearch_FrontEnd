
import React, {useState} from 'react';
import {Divider, Tabs} from 'antd';
import {AppleOutlined, AndroidOutlined} from '@ant-design/icons';
import SearchResultList from "../SearchResultList";
import TypeTag from "../TypeTag";
import TV from "../../images/icons/tv.png";
import Game from "../../images/icons/game.png";
import Book from "../../images/icons/book.png";
import Character from "../../images/icons/character.png";
import Company from "../../images/icons/company.png";
import Person from "../../images/icons/person.png";
import Music from "../../images/icons/music.png";
import './index.css'
import {Link} from "react-router-dom";
import WordCloud from "../WordCloud";
import {useMount} from "ahooks";
import axios from "axios";

const {TabPane} = Tabs;

function FilterHeader(props) {

    const dak = sessionStorage.getItem('searchTabDefaultKey') || '1'

    return (
        <div style={{minHeight:'100vh'}}>
            <Tabs defaultActiveKey={dak} centered size={'large'}
                  onChange={(ak)=>{
                      sessionStorage.setItem('searchTabDefaultKey', ak)
                      sessionStorage.setItem('currentPage', "1")
                }}>
                <TabPane
                    tab={
                        <div>
                            <img src={TV} style={{display:'inline-block', width:'.8rem'}} alt={'网页'}/>
                            &nbsp;网页
                        </div>
                    }
                    key="1"
                >
                    <SearchResultList searchString={props.searchString} searchType={'WebPage'}/>
                </TabPane>
                <TabPane
                    tab={
                        <div>
                            <img src={Book} style={{display:'inline-block', width:'.8rem'}} alt={'图片'}/>
                            &nbsp;图片
                        </div>
                    }
                    key="2"
                >
                    <SearchResultList searchString={props.searchString} searchType={'Image'}/>
                </TabPane>
            </Tabs>
        </div>
    )
}

function SearchResult(props) {
    const [words,setWords] = useState([])

    const callbacks = {
        onWordClick:(word)=>{
          props.history.push({pathname:`/detailInfo/${word.guid}`})
        },
    }

    useMount(async ()=>{
        let data = (await axios.post ('http://127.0.0.1:5678/api/trend?database=WebPage')).data.data
        console.log(data)
        data = data.map((item)=>{
            return {
                text:item.Word,
                value:item.Heat
            }
        })

        setWords(data)
    })


    return (
        <div style={{backgroundColor: '#f3f3f3', minHeight:'100vh'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}} id={'searchContainer'}>
                <div style={{backgroundColor: '#fff', padding:'0 1rem 1rem 1rem'}} id={'infoContainer'}>
                    <FilterHeader searchString={props.searchString}/>
                </div>
                <div id={'relatedContainer'}>
                    <div style={{backgroundColor: '#fff', padding:'1rem',borderRadius:'1rem'}}>
                        <Divider>搜索热榜</Divider>
                        <WordCloud words={words} callbacks={callbacks}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;