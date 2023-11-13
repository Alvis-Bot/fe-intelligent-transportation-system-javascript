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
        datax.box.forEach(([x1, y1, x2, y2, label,option]) => {
            if(label === "person")
            {
                return
            }
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
            ctx.fillStyle = "#00ff00";
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
        </div>
    );
}
export default CameraInfo