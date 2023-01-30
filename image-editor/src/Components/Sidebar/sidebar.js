import React, { useState } from 'react'
import SidebarItem from '../SlidebarItem/slidebarItem'
import './sidebar.css'
import { change_Option } from "../../Redux/ChangeOptions/changeOptionSlice"
import { useSelector, useDispatch } from "react-redux"

const DEFAULT_OPTIONS = [
    {
      name: 'Brightness',
      property: 'brightness',
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: '%'
    },
    {
      name: 'Contrast',
      property: 'contrast',
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: '%'
    },
    {
      name: 'Saturation',
      property: 'saturate',
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: '%'
    },
    {
      name: 'Grayscale',
      property: 'grayscale',
      value: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: '%'
    },
    {
      name: 'Sepia',
      property: 'sepia',
      value: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: '%'
    },
    {
      name: 'Hue Rotate',
      property: 'hue-rotate',
      value: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: 'deg'
    },
    {
      name: 'Blur',
      property: 'blur',
      value: 0,
      range: {
        min: 0,
        max: 20
      },
      unit: 'px'
    }
  ]
    


export default function Sidebar({handleText,handleTextPosition}) {
    const dispatch = useDispatch()
    const options = useSelector(state => state.changeOption.value)
    const [editOption,setEditOption] = useState('')

    const changeEditer=((item)=>{
      setEditOption(item)
    })

    const resetOptions=(()=>{
        dispatch(change_Option({
            option:DEFAULT_OPTIONS
        }
        ))
    })

    return (
        <div className='sidebar-container'>
          <div className='sidebar-btn-container'>
                <button className="btn" color="inherit" variant="contained"
                style={{ margin: '1%', padding: '1.5%' }} component="span"
                onClick={()=>{changeEditer('filters')}}
                >filters</button>
                <button className="btn" color="inherit" variant="contained"
                style={{ margin: '1%', padding: '1.5%' }} component="span"
                onClick={()=>{changeEditer('text')}}
                >Text</button>
                <hr/>
          </div>
            <div className="sidebar">
            {editOption==='text'?(
              <div style={{margin:'3%'}}>
              <h4>Enter your text here</h4>
              <input style={{padding:"2%"}} onChange={(e)=>{handleText(e)}} type="text" placeholder="Enter your text"/>
              <br/>
              <br/>
              <h3>Click to move the position of text</h3>
              <hr/>
              <button className='textpostionhandler' name='top' onClick={(e)=>{handleTextPosition(e.target.name)}}>Move text to top</button>
              <br/>
              <button className='textpostionhandler' name='left' onClick={(e)=>{handleTextPosition(e.target.name)}}>Move text to left</button>
              <br/>
              <button className='textpostionhandler' name='right' onClick={(e)=>{handleTextPosition(e.target.name)}}>Move text to right</button>
              <br/>
              <button className='textpostionhandler' name='down' onClick={(e)=>{handleTextPosition(e.target.name)}}>Move text to down</button>
              {/* <input onClick={} type="submit"/> */}
              </div>
            ):(
              <>
              <button className="btn" color="inherit" variant="contained"
                style={{ margin: '1%', padding: '1.5%',width:'95%' }} component="span"
                onClick={()=>{resetOptions()}}
                >Reset</button>
                <div className='sidebar-filter'>
              {options.map((option, index) => {
                  return (
                      <SidebarItem
                          key={index}
                          option = {option}
                      />
                  )
              })}
                </div>
              </>
            )
          }
            </div>
        </div>
    )
}
