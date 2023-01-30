
import React, { useEffect, useState } from 'react'
import { change_Option } from "../../Redux/ChangeOptions/changeOptionSlice"
import { useSelector, useDispatch } from "react-redux"


export default function Slider({ option }) {

  const dispatch = useDispatch()
  const options = useSelector(state => state.changeOption.value)

  function handleSliderChange({ target }) {
    dispatch(change_Option({
      option: options.map((item, index) => {
        if (item.name === target.name) {
          return { ...item, value: target.value }
        }
        return item
      })
    }
    ))
  }
  useEffect(() => {

  }, [])

  return (
    <div className="slider-container">
      <button>{option.value}%</button>
      <input
        type="range"
        className="slider"
        name={option.name}
        min={option.range.min}
        max={option.range.max}
        value={option.value}
        onChange={(e) => { handleSliderChange(e) }}
      ></input>
    </div>
  )
}