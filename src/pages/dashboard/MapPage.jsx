import React, {useRef, useState} from 'react';
import ReactMapGL, {Layer, Source} from '@goongmaps/goong-map-react';
import {AutoComplete, Button, Card, Checkbox, Col, Form, Input, message, Row, Space, Typography,List} from 'antd';
import polyline from "@mapbox/polyline";
import {Content} from "antd/es/layout/layout.js";
import AntMapSider from "../../components/AntMapSider.jsx";
import {AlertFilled, ArrowDownOutlined, ArrowUpOutlined, CameraOutlined, EyeOutlined, SearchOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta.js";
import PropTypes from "prop-types";
import Pins from "../../components/Pin.jsx";
const ACCESS_TOKEN = 'eFzBsrBRpWlI8QY3XULInuOePLflHjV2ayqMhrcW';
const API_KEY = 'XAxNgR1hcRtwNuexftMPvKdaKmLFrqdhlgMOM4FN';
import {GeolocateControl, FullscreenControl, NavigationControl, Popup} from '@goongmaps/goong-map-react';
import CameraInfo from "../../components/CameraInfo.jsx";
import { useEffect } from 'react';
import AxiosClient from '../../services/AxiosClient.js';
import checkPointIcon from "../../assets/images/check.png";
const geolocateStyle = {
    top: 0, left: 0, padding: '10px'
};
const fullscreenControlStyle = {
    top: 36, left: 0, padding: '10px'
};

const navStyle = {
    top: 72, left: 0, padding: '10px'
};

const geojson = {
    type: 'FeatureCollection',
    features: [
      {type: 'Feature', geometry: {type: 'Point', coordinates: [ 106.6965, 10.8414]}}
    ]
  };
  
  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };
function MapPage() {


    const [viewport, setViewport] = useState({
        latitude: 10.8414, longitude: 106.6965, zoom: 12, bearing: 0, pitch: 0
    });

    const [direction, setDirection] = useState(null);
    const [checkedList, setCheckedList] = useState([]);
    const [checkPoint, setCheckPoint] = useState([]);
    const [popupInfo, setPopupInfo] = useState(null);
    const [timkiemdiadiem, setTimkiemdiadiem] = useState(null);
    const map = useRef(null);
    const [changeMenu, setChangeMenu] = useState('camera');
    const [dataCameras, setDataCameras] = useState([]);
    const addLayerImage = (location) => {
        if(map)
        {
            const map2 = map.current.getMap()
            map2.addImage("check",checkPointIcon)
            map2.addSource("my-data", {
                type: 'FeatureCollection',
                features: [
                  {type: 'Feature', geometry: {type: 'Point', coordinates: [ location.longitude, location.latitude]}}
                ]
              });
            map2.addLayer({
                id: 'point',
                type: 'circle',
                paint: {
                  'circle-radius': 10,
                  'circle-color': '#007cbf'
                }
            });

        }
    }
    const RenderMenu = (props) => {
        const {state} = props;
        switch (state) {
            case 'camera':
                return (<FilterNavigation
                    checkedList={checkedList}
                    setCheckedList={setCheckedList}
                    setViewport={setViewport}
                    viewport={viewport}
                    setCheckPoint={setCheckPoint}
                    paintCheckPoint={addLayerImage}
                    setTimkiemdiadiem={setTimkiemdiadiem}
                    />)
            case 'direction':
                return <DirectionNavigation
                    direction={direction}
                    setDirection={setDirection}
                    setViewport={setViewport}
                    viewport={viewport}
                />
            case 'alert':
                return <AlertDiv />
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
                RenderMenu({state: changeMenu})
            }
            <ReactMapGL
                width="100%"
                height="100%"
                ref={map}
                mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
                goongApiAccessToken={ACCESS_TOKEN}
                {...viewport}
                onViewportChange={setViewport}
            >
                
                {/*
                       Nếu checkedList chứa 'camera' thì mới hiển thị
                */}
                {checkedList.includes('camera') && (<Pins data={dataCameras} onClick={setPopupInfo}/>)}
                {
                    checkPoint.length > 0 &&
                    (
                        <Source id="my-data" type="geojson" data={{
                            type: 'FeatureCollection',
                            features: checkPoint
                        }}>
                            <Layer
                                id="point"
                                type="circle"
                                paint= {
                                    {
                                        'circle-radius': 10,
                                        'circle-color': '#007cbf'
                                      }
                                }
                            />
                        </Source>
                    )
                }
                {popupInfo && (<Popup
                    tipSize={5}
                    anchor="top"
                    longitude={popupInfo.location.longitude}
                    latitude={popupInfo.location.latitude}
                    closeOnClick={false}
                    onClose={setPopupInfo}
                >
                    <CameraInfo info={popupInfo}/>
                </Popup>)}

                 {
                    timkiemdiadiem && (<Source id="my-data" type="geojson" data={{
                        type: 'FeatureCollection',
                        features: timkiemdiadiem
                    }}>
                        <Layer
                            id="point"
                            type="circle"
                            paint= {
                                {
                                    'circle-radius': 10,
                                    'circle-color': '#007cbf'
                                    
                                }
                            }
                        />
                    </Source>)
                 }   
                {direction && (
                    <div>
                        <Source type={'geojson'} data={direction}>
                            <Layer
                                id="route"
                                type="line"
                                layout={{
                                    'line-join': 'round',
                                    'line-cap': 'round'
                                }}
                                paint={{
                                    'line-color': '#1e88e5',
                                    'line-width': 8
                                }}
                            />
                        </Source>
                        <Source type="geojson" data={geojson}>
                            <Layer {...layerStyle} />
                        </Source>
                    </div>

                )}
                <GeolocateControl style={geolocateStyle}/>
                <FullscreenControl style={fullscreenControlStyle}/>
                <NavigationControl style={navStyle}/>
                {/*<ScaleControl style={scaleControlStyle} />*/}
            </ReactMapGL>
        </Content>

    </>)
        ;
}

export default MapPage;

const searchResult = async (query) => {
    const response = await fetch(`https://rsapi.goong.io/Place/AutoComplete?api_key=${API_KEY}&input=${query}`);
    const data = await response.json();

    const result = data.predictions.map((prediction) => ({
        value: prediction.description, place_id: prediction.place_id
    }));

    return result.map(({value, place_id}) => ({
        value: value, place_id: place_id, label: (<div
            style={{
                display: 'flex', width: '100%', height: '45px', alignItems: 'center', justifyContent: 'space-between',
            }}
        >
            {value}
        </div>),
    }));
}

const FilterNavigation = ({setViewport, viewport, setCheckedList, checkedList,setCheckPoint,setTimkiemdiadiem}) => {

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
                setTimkiemdiadiem([
                    {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                          "coordinates": [
                            lat,
                            lng
                          ],
                          "type": "Point"
                        }
                      }
                ])
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
                margin: 0, marginBottom: "26px", textTransform: "uppercase", fontWeight: "bold",
            }}
            level={5}>Bộ lọc</Typography.Title>
        <Form
            size={`large`}
            layout="vertical"
        >
            <Form.Item
                name="search"
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
                            width: "100%", height: "50px",

                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", backgroundColor: "#f5f5f5",
                        }}
                        placeholder="Search"
                        prefix={<SearchOutlined style={{color: '#8c8c8c'}}/>} bordered={false}/>
                </AutoComplete>
            </Form.Item>


            <Typography.Text
                style={{
                    // xám
                    color: "#8c8c8c", textTransform: "capitalize",
                }}
            >Type of Place</Typography.Text>

            <Form.Item
                name="type"
            >
                <Checkbox.Group style={{width: '100%'}} onChange={onChange} value={checkedList}>
                    <Row
                        style={{
                            marginTop: "12px", width: "100%",
                        }}
                        gutter={[16, 16]}
                    >
                        <Col span={24}>
                            <Card
                                style={{
                                    width: "100%", border: "none", borderRadius: "8px", // Example border radius
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
                                            color: "#007cbf", textTransform: "capitalize", fontWeight: "bold",
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
                                                    color: "white", fontSize: "14px",
                                                }}
                                            />
                                        </div>}
                                        title={<Typography
                                            style={{
                                                fontWeight: "bold", fontSize: "14px", lineHeight: "43px",
                                            }}
                                        >
                                            Camera
                                        </Typography>}
                                    />
                                    <Checkbox value="camera"></Checkbox>
                                </Space>
                            </Card>

                        </Col>
                    </Row>
                </Checkbox.Group>
            </Form.Item>
        </Form>
    </div>)
}

const DirectionNavigation = ({setViewport, viewport, direction, setDirection}) => {

    const [optionsStart, setOptionsStart] = useState([]);
    const [optionsEnd, setOptionsEnd] = useState([]);

    const [latLngStart, setLatLngStart] = useState([]);
    const [latLngEnd, setLatLngEnd] = useState([]);

    const handleSearchStart = async (value) => {
        setOptionsStart(value ? await searchResult(value) : []);
    }

    const handleSearchEnd = async (value) => {
        setOptionsEnd(value ? await searchResult(value) : []);
    }


    const handleStartSelect = (place_id) => {
        console.log(place_id);

        if (!place_id) {
            return;
        }

        fetch(`https://rsapi.goong.io/Place/Detail?api_key=${API_KEY}&place_id=${place_id}`)
            .then((response) => response.json())
            .then((data) => {
                const {lat, lng} = data.result.geometry.location;
                //20.981971,105.864323
                setLatLngStart(`${lat},${lng}`);
                setViewport({
                    ...viewport, latitude: lat, longitude: lng, zoom: 14
                });
            })
            .catch((error) => {
                console.error(error);
                message.error('Error fetching places.');
            });
    }


    const handleEndSelect = (place_id) => {
        if (!place_id) {
            return;
        }

        fetch(`https://rsapi.goong.io/Place/Detail?api_key=${API_KEY}&place_id=${place_id}`)
            .then((response) => response.json())
            .then((data) => {
                const {lat, lng} = data.result.geometry.location;
                //20.981971,105.864323
                setLatLngEnd(`${lat},${lng}`);
                setViewport({
                    ...viewport, latitude: lat, longitude: lng, zoom: 14
                });
            })
            .catch((error) => {
                console.error(error);
                message.error('Error fetching places.');
            });
    }

    const getDirection = async () => {

        if (!latLngStart || !latLngEnd) {
            return;
        }

        const response = await fetch(`https://rsapi.goong.io/Direction?api_key=${API_KEY}&origin=${latLngStart}&destination=${latLngEnd}`);
        const data = await response.json();
        const route = data.routes[0];

        const geometry_string = route.overview_polyline.points;
        const geoJSON = polyline.toGeoJSON(geometry_string);
        setDirection(geoJSON);
    }


    return (<div
        style={{
            backgroundColor: "white", padding: "16px", width: "350px",
        }}
    >
        <Typography.Title
            style={{
                margin: 0, marginBottom: "26px", textTransform: "uppercase", fontWeight: "bold",
            }}
            level={5}>Chỉ đường</Typography.Title>
        <Form
            style={{
                width: "100%",
            }}
            layout="vertical"
        >
            <Form.Item
                name="start"
            >
                <AutoComplete
                    style={{
                        width: "100%",
                    }}
                    options={optionsStart}
                    onSelect={(value, option) => handleStartSelect(option.place_id)}
                    onSearch={handleSearchStart}
                    size="large"
                >
                    <Input

                        placeholder="Vị trí bắt đầu"
                        prefix={<ArrowDownOutlined/>}
                        style={{
                            width: "100%",
                        }}

                    />
                </AutoComplete>
            </Form.Item>

            <Form.Item
                name="end"
            >

                <AutoComplete
                    style={{
                        width: "100%",
                    }}
                    options={optionsEnd}
                    onSelect={(value, option) => handleEndSelect(option.place_id)}
                    onSearch={handleSearchEnd}
                    size="large"
                >
                    <Input

                        placeholder="Vị trí kết thúc"
                        prefix={<ArrowUpOutlined/>}
                        style={{
                            width: "100%",
                        }}
                    />
                </AutoComplete>
            </Form.Item>
            <Form.Item>
                <Button
                    style={{
                        width: "100%",
                    }}
                    type="primary"
                    size={`large`}
                    onClick={getDirection}
                >Tìm đường</Button>
            </Form.Item>
        </Form>
    </div>)

}



const DataTaiNan = [
    {
        where :"đường Nguyễn Duy Trinh",
        time : "13-11-2023"
    },
    {
        where : "đường Nguyễn Văn Tăng",
        time : "12-11-2023"
    }
]

const AlertDiv = () => {

   


    return (<div
        style={{
            backgroundColor: "white", padding: "16px", width: "350px",
        }}
    >
        <Typography.Title
            style={{
                margin: 0, marginBottom: "26px", textTransform: "uppercase", fontWeight: "bold",
            }}
            level={5}>Tai Nạn</Typography.Title>
        
        <div>
            <List
            dataSource={DataTaiNan}
                renderItem={item  => {

                    return (
                        <List.Item>
                            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                                <div style={{fontSize:"19px"}}><AlertFilled/> Tai Nạn Giao Thông </div>
                                <div>{item.where}</div>
                                <div>{item.time}</div>
                            </div>
                        </List.Item>
                    )
                }}
            
            />
                
        </div>
    </div>)

}