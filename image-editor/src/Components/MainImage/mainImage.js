import React, { useEffect, useState, useRef } from 'react'
import ListImages from '../ListImages/listImages';
import './mainImage.css';
import { useSelector } from "react-redux"
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';



export default function MainImage({ isImage, imageText, textPosition }) {
    const options = useSelector(state => state.changeOption.value)
    const [src, setSrc] = useState('');

    const handleFileChange = (e) => {
        setSrc(URL.createObjectURL(e.target.files[0]))
    }

    // const domEl = useRef('');
    const downloadImage = async () => {
        htmlToImage.toJpeg(document.getElementById('image-id'), { quality: 0.95 })
        .then(function (dataUrl) {
            console.log(dataUrl,'dataUrl')
            var link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            console.log(link)
            link.click();
        });
    };

    function getImageStyle() {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })
        return { filter: filters.join(' ') }
    }
    console.log(getImageStyle())
    return (
        <div className='image-container'>
            <button className="btn" color="inherit" variant="contained"
                style={{ margin: '1%', padding: '1.5%' }} component="span">
                <input
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => { handleFileChange(e) }}
                >
                </input>
                New Image
            </button>
            <div className="main-image">
                {src ? (
                    <>
                        <div className='image-class' id="image-id">
                            <img src={src} className="edit-image" width="250px" height="250px" alt="Image to edit" style={getImageStyle()}></img>
                            <p className='imageTxt' style={{
                                left: `${textPosition.left}px`,
                                top: `${textPosition.top}px`,
                            }}>{imageText}</p>
                            <br />
                        </div>
                        <button style={{ margin: '2%' }} onClick={() => isImage()}>Edit Image</button>
                        <button onClick={() => { downloadImage(src) }}>Download!</button>
                    </>
                ) : (
                    <h1>Add a new image</h1>
                )}
            </div>
            <ListImages />
        </div>
    )
}