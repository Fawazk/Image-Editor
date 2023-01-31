import React, { useEffect, useState, useRef } from 'react'
import ListImages from '../ListImages/listImages';
import './mainImage.css';
import { useSelector } from "react-redux"
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
// import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
// import b64toBlob from 'b64-to-blob';
import html2canvas from 'html2canvas';


export default function MainImage({ isImage, imageText, textPosition }) {
    const options = useSelector(state => state.changeOption.value)
    const [src, setSrc] = useState('');

    const handleFileChange = (e) => {
        setSrc(URL.createObjectURL(e.target.files[0]))
    }

    const domEl = useRef(null);
    const downloadImage = async () => {
        // const dataUrl = await htmlToImage.toJpeg(document.getElementById('image-id'));
        // console.log(dataUrl,'dataUrl')
        // var blob = b64toBlob(dataUrl)
        // // download image
        // const link = document.createElement('a');
        // link.download = 'html-to-img.jpeg';
        // link.href = URL.createObjectURL(blob);
        // console.log(link.href,'link.href')
        // link.click();

        // htmlToImage.toPng(document.getElementById('image-id'))
        //     .then(dataURI => {
        //         console.log(dataURI)
        //         download(dataURI, 'image.png')
        //     })
        //     .catch(() => console.log("Error"))
        const canvas = await html2canvas(document.getElementById('image-id'));
        const blob = b64toBlob(canvas.toDataURL("image/png", 1.0))
        console.log(blob, 'blob')
        var ctx = canvas.getContext('2d');
        // var imageData = ctx.getImageData(0,0,canvas.width,canvas.height)
        // ctx.filter =
        const fileName = blobToFile(blob)
        
        // console.log(fileName, 'fileName')
        // const image = canvas.toDataURL();
        // downloadImg(image, 'image.png');
    };
    // const downloadImg = (blob, fileName) => {
    //     const fakeLink = window.document.createElement("a");
    //     fakeLink.style = "display:none;";
    //     fakeLink.download = fileName;
    //     fakeLink.href = blob;
    //     document.body.appendChild(fakeLink);
    //     console.log(fakeLink)
    //     // fakeLink.click();
    //     document.body.removeChild(fakeLink);
    //     fakeLink.remove();
    // };

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

    function getImageStyle() {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })
        return { filter: filters.join(' ') }
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
                        <div className='image-class' ref={domEl} id="image-id">
                            <img src={src} className="edit-image" width="250px" height="250px" alt="Image to edit" style={getImageStyle()}></img>
                            <p className='imageTxt' style={{
                                left: `${textPosition.left}px`,
                                top: `${textPosition.top}px`,
                            }}>{imageText}</p>
                            <br />
                        </div>
                        <button style={{ margin: '2%' }} onClick={() => isImage()}>Edit Image</button>
                        <button onClick={()=>downloadImage()}>Save Image</button>
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