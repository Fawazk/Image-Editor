import React, { useEffect, useState } from 'react';
import './App.css';
import MainImage from './Components/MainImage/mainImage';
import Sidebar from './Components/Sidebar/sidebar';
import { useSelector } from "react-redux"



function App() {

  const options = useSelector(state => state.changeOption.value)
  const [textEdit, setTextEdit] = useState('')
  const [isImage, setIsImage] = useState(false)
  const [textPosition,setTextPosition]=useState(
    {
      'top': 0,
      'left': 0
    }
  )
  

  const isImageChecking = () => {
    setIsImage(!isImage)
  }

  const handleText = ((e) => {
    setTextEdit(e.target.value)
  })

  // function handleSliderChange({ target }) {

  // }

  const handleTextPosition = ((value) => {
    if (value==='down'){
      setTextPosition({'top':textPosition.top-5,'left':textPosition.left})
    }
    else if(value==='left'){
      setTextPosition({'top':textPosition.top,'left':textPosition.left+5})
    }
    else if(value==='right'){
      setTextPosition({'top':textPosition.top,'left':textPosition.left-5})
    }
    else if(value==='top'){
      setTextPosition({'top':textPosition.top+5,'left':textPosition.left})
    }

  })

  return (
    <div className='container'>
      <MainImage 
      isImage={isImageChecking} 
      imageText={textEdit}
      textPosition={textPosition}
       />
      {isImage ? (
        <>
          <Sidebar
            handleText={handleText}
            handleTextPosition={handleTextPosition}
            options={options}
          />
        </>
      ) : <></>}
    </div>
  );
}

export default App;
