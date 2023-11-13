import * as React from 'react';
import {memo} from "react";

const CameraInfo = (props) => {
    const {info} = props;
    console.log('info', info);

    return (
        <div>
            <div>
                <strong>{info.city}</strong>
                <a
                    target="_new"
                    href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${info.city}`}
                >
                    Wikipedia
                </a>
            </div>
            <img width={240} src={info.image} />
        </div>
    );
}
export default CameraInfo