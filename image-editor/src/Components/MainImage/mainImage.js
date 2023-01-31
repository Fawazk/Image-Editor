import React, { useEffect, useState, useRef } from 'react'
import ListImages from '../ListImages/listImages';
import './mainImage.css';
import { useSelector } from "react-redux"
// import * as htmlToImage from 'html-to-image';
// import download from 'downloadjs';
// import domtoimage from 'dom-to-image';
// import { saveAs } from 'file-saver';
// import b64toBlob from 'b64-to-blob';
import html2canvas from 'html2canvas';
import { AddeditImageSubmit } from '../../apiCalls/axios'

export default function MainImage({ isImage, imageText, textPosition }) {
    const options = useSelector(state => state.changeOption.value)
    const [src, setSrc] = useState('');
    const [temp,setTemp] = useState('')

    const handleFileChange = (e) => {
        console.log(e.target.files[0],'e.target.files[0]')
        setSrc(URL.createObjectURL(e.target.files[0]))
        setTemp(e.target.files[0])
    }


    function getImageStyle() {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })
        return { filter: filters.join(' ') }
    }

    const getImageDataNofilter = () => {
        const filter = getImageStyle()
        console.log(filter.filter, 'filter.filter')
        return filter.filter
    }

    const handleEditedImage = (base64image) => {
        console.log(base64image,'bs64image')
        const blobimage=b64toBlob(base64image)
        const fileName = blobToFile(blobimage)
        const nameImage = `image_${(new Date().toJSON().slice(0,10))}.jpeg`
        console.log(typeof fileName,'filename')
        const data = new FormData();
        data.append('edit_image', fileName,nameImage);
        console.log(data,'data')
        AddeditImageSubmit(data)
    }

    const downloadImage = async () => {
        const node = await html2canvas(document.getElementById('image-id'))
        console.log(node, 'node')
        const dataURI = node.toDataURL("image/png", 1.0);
        console.log(dataURI, 'dataUrl')
        const blob = b64toBlob(dataURI)
        console.log(blob, 'blob')
        const file = blobToFile(blob)
        console.log(file, 'file')
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.filter = getImageDataNofilter();
            ctx.drawImage(img, 0, 0);
            handleEditedImage(canvas.toDataURL())
        };
    };


    function b64toBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }
    function blobToFile(theBlob, fileName) {
        return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
    }

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
                        <button onClick={() => downloadImage()}>Save Image</button>
                    </>
                ) : (
                    <h1>Add a new image</h1>
                )}
            </div>
            <div id="image-testing">

            </div>
            <ListImages />
        </div>
    )
}