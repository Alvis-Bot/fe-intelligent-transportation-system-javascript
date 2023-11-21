import * as React from 'react';
import { useState } from 'react';
import {memo} from "react";
import AxiosClient from '../services/AxiosClient';
import { useEffect } from 'react';
import { useRef } from 'react';

const CameraInfo = ({info}) => {
    const canvas = useRef(null)
    function loadData() {
        return AxiosClient.get("/camera/data/"+info?._id).then((res) => {
            return res.data
        }).then(DrawData)
    }

    function DrawData (datax) {

        const img = new Image()
        img.src = "data:image/png;base64,"+datax.img
        const ctx = canvas.current.getContext("2d");
        ctx.drawImage(img, 0, 0);
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 3;
        ctx.font = "18px serif";
        const arr = ['car','bus','motorbike','truck','bicycle',"motorcycle"];
        //const arr= []
        datax.box.forEach(([x1, y1, x2, y2, label,option]) => {
            if(label === "person")
            {
                return
            }
            if(arr.includes(label))
            {
                ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
                ctx.fillStyle = "#00ff00";
                console.log(label)
            }
            
            // if(!arr.includes(label))
            // {
            //     arr.push(label)
            // }
            
        });
        
    }

    useEffect(() => {
        loadData()
        let interval = setInterval(() => {
            loadData()
            console.log("load")
        }, 12000);
        return () => {
            console.log("clear")
            clearInterval(interval);
        };
    }, [info])
    
    return (
        <div>
            <div>
                <strong>{info?.name}</strong>
            </div>
            <canvas ref={canvas} width={518} height={294}> </canvas>
            <div>
                Tình trạng giao thông : Thông thoáng
                <br/>
                Các loại phương tiện Thường hoạt động : Xe máy, ô tô con , xe tải
            </div>
        </div>
    );
}
export default CameraInfo