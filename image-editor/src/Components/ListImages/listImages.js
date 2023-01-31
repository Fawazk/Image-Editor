import React, { useEffect, useState } from 'react'
import { GeteditImageSubmit } from '../../apiCalls/axios'
import './listImages.css';

export default function ListImages() {
  const [recentImage, setRecentImage] = useState('')

  const setImageListData = (async () => {
    setRecentImage(await GeteditImageSubmit())
  })

  useEffect(() => {
    setImageListData()
  }, [])

  return (
    <div className='list-image-container'>
      <hr />
      <h3>Recent images</h3>
      <hr />
      <div className='list-image'>
        {recentImage && recentImage.map((obj, index) => {
          return (
            <img height='200px' width="200px" src={obj.edit_image} alt=""></img>
          )
        })}
      </div>
    </div>
  )
}
