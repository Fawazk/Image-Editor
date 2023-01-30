import React from 'react'
import Slider from '../Slider/slider'
import './slidebarItem.css'

export default function SidebarItem({option}) {
    
    return (
        <div className="sidebar-item">
            <h3>{option.name}</h3>
            <Slider
                option = {option}
            />
        </div>
    )
}