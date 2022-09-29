import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./css/index.module.css"
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineUser,AiOutlineUngroup } from "react-icons/ai";
import { RiPlantFill } from "react-icons/ri";
import { AiOutlineAreaChart } from "react-icons/ai";
import { BiExit } from "react-icons/bi";

function MenuAdmin(props) {
    const fakeMenu= [
        {
            name:"Trang chủ",
            url:'/adminVega',
            icon:<HiOutlineHome />
        },
        {
            name:"Nhóm hàng",
            url:'/adminVega/mainGroups',
            icon: <AiOutlineUngroup/>
        },
        {
            name:"Sản phẩm",
            url:'/adminVega/products',
            icon: <RiPlantFill/>
        },
        {
            name:"Người dùng",
            url:'/adminVega/users',
            icon:<AiOutlineUser/>
        },
        {
            name:"Báo cáo",
            url:'/adminVega/reports',
            icon:<AiOutlineAreaChart/>
        },
        {
            name:"Thoát",
            url:'/',
            icon:<BiExit/>
        }
        
    ]
    let indexMenuChoose = 2
    for(let i =0 ;i < fakeMenu.length ; i++)
    {
        if(fakeMenu[i].url === window.location.pathname)
        {
            indexMenuChoose = i + 1
        }
    }
   
    return (
        <div className={styles['adminMenu']}>

            <div className={styles['brand_name']}>
                <div id ={styles[indexMenuChoose === 1 ? 'borderRadiusBottomRight' : '']}className={styles['brand_name_container']}>
                   <p>Vega</p>
                </div>
            </div>

            <div className={styles['menuList']}>
                {
                    fakeMenu.map((item,index)=>
                    {
                        if(index+1 === indexMenuChoose){
                            return (
                                <div  key={index} className={styles['menuItem'] + " " + styles['menuItem_Choosen']} > 
                                    <div id={styles['choosen']} className={styles['menuItemContainer']}>
                                        <div className={styles['icon_label']} >
                                             <div id ={ styles['icon_menu_item_choose']} className={styles['icon_menu_item']}>{item.icon}</div>
                                             <Link to={item.url}> <span className={styles['menuLabel']  + " "+ styles['menuLabel_choosen']}>{item.name}</span></Link>
                                        </div>
                                    </div>
                                </div> 
                            )
                        }else if ( index + 1 === indexMenuChoose - 1){
                            return (
                                <div key={index} className={styles['menuItem']} > 
                                    <div className={styles['menuItemContainer']} id={styles['borderRadiusBottomRight']}>
                                       <div className={styles['icon_label']} >
                                             <div className={styles['icon_menu_item']}>{item.icon}</div>
                                             <Link to={item.url}><span className={styles['menuLabel']}>{item.name}</span></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else if ( index + 1 === indexMenuChoose + 1){
                           return (
                                <div key={index} className={styles['menuItem']} > 
                                    <div className={styles['menuItemContainer']} id={styles['borderRadiusTopRight']}>
                                    <div className={styles['icon_label']} >
                                             <div className={styles['icon_menu_item']}>{item.icon}</div>
                                             <Link to={item.url}> <span className={styles['menuLabel']}>{item.name}</span></Link>
                                        </div>
                                    </div>
                                </div> 
                           )
                        }else{
                            return (
                                <div key={index} className={styles['menuItem']} > 
                                    <div className={styles['menuItemContainer']}>
                                    <div className={styles['icon_label']} >
                                             <div className={styles['icon_menu_item']}>{item.icon}</div>
                                             <Link to={item.url}> <span className={styles['menuLabel']}>{item.name}</span></Link>
                                            
                                        </div>
                                    </div>
                                </div> 
                            )
                        }
                    }
                  )
                }

                {
                    indexMenuChoose  === fakeMenu.length ? (
                        <div className={styles['none_menuItem']}>
                            <div className={styles['none_menuItem_container']}>
        
                            </div>
                        </div>
                    ):''
                }

            </div>
        </div>
    )
}


export default MenuAdmin
