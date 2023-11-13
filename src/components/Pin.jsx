import {Marker} from '@goongmaps/goong-map-react';
import PropTypes from "prop-types";
import ICON from "../assets/images/map-marker-svgrepo-com.svg";
const SIZE = 24;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function Pins(props) {
    const {data, onClick} = props;
    console.log(data)
    return data.map((city, index) => (
        <Marker key={`marker-${index}`} longitude={city.location.longitude} latitude={city.location.latitude}>
            <img

                src={ICON}
                alt="marker"
                style={{
                    cursor: 'pointer',
                    fill: '#d00',
                    stroke: 'none',
                    width: SIZE,
                    transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                }}
                onClick={() => onClick(city)}
            />
        </Marker>
    ));
}

Pins.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            city: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired
        })
    ).isRequired,
    onClick: PropTypes.func.isRequired
};



export default Pins