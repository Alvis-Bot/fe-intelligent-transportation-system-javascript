import React, {useState} from 'react';
import ReactMapGL from '@goongmaps/goong-map-react';
import {AutoComplete, Button, Card, Checkbox, Col, Form, Input, message, Row, Space, Typography} from 'antd';
import polyline from "@mapbox/polyline";
import {Content} from "antd/es/layout/layout.js";
import AntMapSider from "../../components/AntMapSider.jsx";
import {ArrowDownOutlined, ArrowUpOutlined, CameraOutlined, EyeOutlined, SearchOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta.js";
import PropTypes from "prop-types";
import Pins from "../../components/Pin.jsx";

const ACCESS_TOKEN = 'eFzBsrBRpWlI8QY3XULInuOePLflHjV2ayqMhrcW';
const API_KEY = 'XAxNgR1hcRtwNuexftMPvKdaKmLFrqdhlgMOM4FN';
import {GeolocateControl, FullscreenControl, NavigationControl , Popup} from '@goongmaps/goong-map-react';

import CITIES from '../../assets/data/cities.json';
import CameraInfo from "../../components/CameraInfo.jsx";
import { useEffect } from 'react';
import AxiosClient from '../../services/AxiosClient.js';


const geolocateStyle = {
    top: 0, left: 0, padding: '10px'
};

const fullscreenControlStyle = {
    top: 36, left: 0, padding: '10px'
};

const navStyle = {
    top: 72, left: 0, padding: '10px'
};


function MapPage() {


    const [viewport, setViewport] = useState({
        latitude: 21.027763, longitude: 105.834160, zoom: 10
    });

    const [checkedList, setCheckedList] = useState([]);

    const [popupInfo, setPopupInfo] = useState(null);

    const [changeMenu, setChangeMenu] = useState('camera');
    const [dataCameras, setDataCameras] = useState([]);
    const renderMenu = (state) => {
        switch (state) {
            case 'camera':
                return <FilterNavigation
                    checkedList={checkedList}
                    setCheckedList={setCheckedList}
                    setViewport={setViewport}
                    viewport={viewport}
                />
            case 'direction':
                return <DirectionNavigation
                    setViewport={setViewport}
                    viewport={viewport}
                />
            case 'traffic':
                return <div>Tình trạng giao thông</div>
            default:
                break;
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await AxiosClient.get('/camera');
            setDataCameras(response.data);
        }
        fetchData();
    }, [])

    return (<>


        <Content
            style={{
                width: "100%", display: "flex", flexDirection: "row", height: "100vh",
            }}
        >

            <AntMapSider setChangeMenu={setChangeMenu}/>
            {
                renderMenu(changeMenu)
            }

            <ReactMapGL
                width="100%"
                height="100%"

                mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
                goongApiAccessToken={ACCESS_TOKEN}
                {...viewport}
                onViewportChange={setViewport}
            >

                {/*
                       Nếu checkedList chứa 'camera' thì mới hiển thị
                */}
                {
                    checkedList.includes('camera') && (
                        <Pins data={dataCameras} onClick={setPopupInfo}/>
                    )
                }

                { popupInfo  && (
                    <Popup
                        tipSize={5}
                        anchor="top"
                        longitude={popupInfo.location.longitude}
                        latitude={popupInfo.location.latitude}
                        closeOnClick={false}
                        onClose={setPopupInfo}
                    >
                        <CameraInfo info={popupInfo}/>
                    </Popup>
                )}
                <GeolocateControl style={geolocateStyle}/>
                <FullscreenControl style={fullscreenControlStyle}/>
                <NavigationControl style={navStyle}/>
                {/*<ScaleControl style={scaleControlStyle} />*/}
            </ReactMapGL>
        </Content>

    </>);
}

export default MapPage;

const searchResult = async (query) => {
    const response = await fetch(`https://rsapi.goong.io/Place/AutoComplete?api_key=${API_KEY}&input=${query}`);
    const data = await response.json();

    const result = data.predictions.map((prediction) => ({
        value: prediction.description,
        place_id: prediction.place_id
    }));
    console.log(result);

    return result.map(({value, place_id}) => ({
        value: value,
        place_id: place_id,
        label: (
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '45px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {value}
            </div>
        ),
    }));
}

const FilterNavigation = ({setViewport, viewport , setCheckedList , checkedList}) => {

    const onChange = (list) => {
        setCheckedList(list);
    };

    const [options, setOptions] = useState([]);
    const handleSearch = async (value) => {
        setOptions(value ? await searchResult(value) : []);
    };


    const onSelect = (place_id) => {
        console.log(place_id);

        if (!place_id) {
            return;
        }

        fetch(`https://rsapi.goong.io/Place/Detail?api_key=${API_KEY}&place_id=${place_id}`)
            .then((response) => response.json())
            .then((data) => {
                const {lat, lng} = data.result.geometry.location;
                //20.981971,105.864323
                setViewport({
                    ...viewport, latitude: lat, longitude: lng, zoom: 14
                });
            })
            .catch((error) => {
                console.error(error);
                message.error('Error fetching places.');
            });
    };

    return (<div
        style={{
            backgroundColor: "white", padding: "24px", width: "350px",
        }}
    >
        <Typography.Title
            style={{
                margin: 0,
                marginBottom: "26px", textTransform: "uppercase", fontWeight: "bold",
            }}
            level={5}>Bộ lọc</Typography.Title>
        <Form
            size={`large`}
            layout="vertical"
        >
            <Form.Item
                name="search"
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                    }}
                >
                    <AutoComplete
                        style={{
                            width: "100%",
                        }}
                        options={options}
                        onSelect={(value, option) => onSelect(option.place_id)}
                        onSearch={handleSearch}
                        size="large"
                    >
                        <Input

                            style={{
                                width: "100%",
                                height: "40px",

                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#f5f5f5",
                            }}
                            placeholder="Search"
                            prefix={<SearchOutlined style={{color: '#8c8c8c'}}/>} bordered={false}/>
                    </AutoComplete>
                    <Button
                        style={{}}
                        type={'dashed'}
                    >
                        <EyeOutlined/>
                    </Button>
                </div>
            </Form.Item>


            <Typography.Text
                style={{
                    // xám
                    color: "#8c8c8c",
                    textTransform: "capitalize",
                }}
            >Type of Place</Typography.Text>

            <Form.Item
                name="type"
            >
                <Checkbox.Group style={{width: '100%'}} onChange={onChange} value={checkedList}>
                    <Row
                        style={{
                            marginTop: "12px",
                            width: "100%",
                        }}
                        gutter={[16, 16]}
                    >
                        <Col span={24}>
                            <Card
                                style={{
                                    width: "100%",
                                    border: "none",
                                    borderRadius: "8px", // Example border radius
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Example box shadow
                                }}
                            >
                                <Space direction="horizontal" style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}>
                                    <Meta
                                        style={{
                                            color: "#007cbf",
                                            textTransform: "capitalize",
                                            fontWeight: "bold",
                                        }}
                                        avatar={<div
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                backgroundColor: "#007cbf",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <ArrowUpOutlined
                                                style={{
                                                    color: "white",
                                                    fontSize: "14px",
                                                }}
                                            />
                                        </div>}
                                        title={
                                            <Typography
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: "14px",
                                                    lineHeight: "43px",
                                                }}
                                            >
                                                Camera
                                            </Typography>
                                        }
                                    />
                                    <Checkbox  value="camera"></Checkbox>
                                </Space>
                            </Card>

                        </Col>
                    </Row>
                </Checkbox.Group>
            </Form.Item>
        </Form>
    </div>)
}

FilterNavigation.propTypes = {
    setViewport: PropTypes.func.isRequired,
    viewport: PropTypes.object.isRequired,
    setCheckedList: PropTypes.func.isRequired,
    checkedList: PropTypes.array.isRequired,
};
const DirectionNavigation = ({setViewport, viewport}) => {

    return (<div
        style={{
            backgroundColor: "white", padding: "16px", width: "350px",
        }}
    >
        <Typography.Title
            style={{
                margin: 0,
                marginBottom: "26px", textTransform: "uppercase", fontWeight: "bold",
            }}
            level={5}>Chỉ đường</Typography.Title>

        <Form
            style={{
                width: "100%",
            }}
            layout="vertical"
        >
            <Form.Item
                name="search"
            >
                <Space direction="horizontal"
                       align={"center"}
                       style={{width: "100%"}}>
                    <Input

                        placeholder="Vị trí bắt đầu"
                        prefix={<ArrowDownOutlined/>}
                        style={{
                            width: "100%",
                        }}

                    />
                    <Button style={{
                        backgroundColor: "#007cbf",
                        color: "white",
                    }}>
                        <CameraOutlined/>

                    </Button>
                </Space>
                <Space direction="horizontal"
                       align={"center"}
                       style={{width: "100%"}}>
                    <Input

                        placeholder="Vị trí bắt đầu"
                        prefix={<ArrowDownOutlined/>}
                        style={{
                            width: "100%",
                        }}

                    />
                    <Button style={{
                        backgroundColor: "#007cbf",
                        color: "white",
                    }}>
                        <CameraOutlined/>

                    </Button>
                </Space>
            </Form.Item>
        </Form>
    </div>)

}

DirectionNavigation.propTypes = {
    setViewport: PropTypes.func.isRequired,
    viewport: PropTypes.object.isRequired,
};


//
// <div style={{
//     width: '100%',
//     height: "100vh",
// }
// }>
//     <AutoComplete
//         style={{width: "100%", marginBottom: 10}}
//         options={optionsStart}
//         onSelect={(value, option) => handleStartSelect(option.place_id)}
//         onSearch={handleSearchStart}
//         placeholder="Enter start location"
//     />
//     <AutoComplete
//         style={{width: "100%", marginBottom: 10}}
//         options={optionsEnd}
//         onSelect={(value, option) => handleEndSelect(option.place_id)}
//         onSearch={handleSearchEnd}
//         placeholder="Enter end location"
//     />
//     <Button type="primary" onClick={onSearch}>Get Directions</Button>
// </div>
//
// <div style={{
//     margin: '24px 16px',
//     padding: 24,
//     width: "calc(100% - 300px)",
//     background: '#ccc',
// }}>
//
//
//     {/*<AutoComplete*/}
//     {/*    style={{ width: 300, marginBottom: 10 }}*/}
//     {/*    options={optionsStart}*/}
//     {/*    onSelect={(value , option) => handleStartSelect(option.place_id)}*/}
//     {/*    onSearch={handleSearchStart}*/}
//     {/*    placeholder="Enter start location"*/}
//     {/*/>*/}
//     {/*<AutoComplete*/}
//     {/*    style={{ width: 300, marginBottom: 10 }}*/}
//     {/*    options={optionsEnd}*/}
//     {/*    onSelect={(value , option) => handleEndSelect(option.place_id)}*/}
//     {/*    onSearch={handleSearchEnd}*/}
//     {/*    placeholder="Enter end location"*/}
//     {/*/>*/}
//     {/*<Button type="primary" onClick={onSearch}>Get Directions</Button>*/}
//     <ReactMapGL
//         style={{
//             position: "absolute",
//
//         }}
//         width="calc(100% - 80px)"
//         height="calc(100vh - 64px)"
//
//         mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
//         goongApiAccessToken={ACCESS_TOKEN}
//         {...viewport}
//         onViewportChange={setViewport}
//     >
//         {/*<Pins data={CITIES} onClick={setPopupInfo} />*/}
//         {/*{popupInfo && (*/}
//         {/*    <Popup*/}
//         {/*        tipSize={5}*/}
//         {/*        anchor="top"*/}
//         {/*        longitude={popupInfo.longitude}*/}
//         {/*        latitude={popupInfo.latitude}*/}
//         {/*        closeOnClick={false}*/}
//         {/*        onClose={setPopupInfo}*/}
//         {/*    >*/}
//         {/*        <CameraInfo info={popupInfo} />*/}
//         {/*    </Popup>*/}
//         {/*)}*/}
//         {/*/!*<Source id="my-data" type="geojson" data={geojson}>*!/*/}
//         {/*/!*    <Layer {...layerStyle} />*!/*/}
//         {/*/!*</Source>*!/*/}
//         {/*{direction && (*/}
//         {/*    <Source id="route" type="geojson" data={direction}>*/}
//         {/*        <Layer*/}
//         {/*            id="route"*/}
//         {/*            type="line"*/}
//         {/*            layout={{*/}
//         {/*                'line-join': 'round',*/}
//         {/*                'line-cap': 'round'*/}
//         {/*            }}*/}
//         {/*            paint={{*/}
//         {/*                'line-color': '#888',*/}
//         {/*                'line-width': 8*/}
//         {/*            }}*/}
//         {/*        />*/}
//         {/*    </Source>*/}
//         {/*)}*/}
//
//         {/*
//                     TODO: Add GeolocateControl, FullscreenControl, NavigationControl, ScaleControl
//                 */}
//         <GeolocateControl style={geolocateStyle}/>
//         <FullscreenControl style={fullscreenControlStyle}/>
//         <NavigationControl style={navStyle}/>
//         {/*<ScaleControl style={scaleControlStyle} />*/}
//     </ReactMapGL>