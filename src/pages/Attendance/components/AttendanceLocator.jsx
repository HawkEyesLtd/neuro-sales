import bluePin from '@assets/blue-pin.png';
import redPin from '@assets/red-pin.png';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import labelChange from '@utils/labelChange';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const containerStyle = {
    width: '100%',
    height: '90vh',
};

const center = {
    lat: 23.685,
    lng: 90.3563,
};

function AttendanceLocator({
    data,
    infoWindowState: visibleInfoWindow,
    setInfoWindowState: setVisibleInfoWindow,
}) {
    const [zoom, setZoom] = useState(0);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback((map) => {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
        setTimeout(() => {
            setZoom(7);
        }, 800);
    }, []);

    const onUnmount = React.useCallback((map) => {
        setMap(null);
    }, []);

    // info window visibility
    // const [visibleInfoWindow, setVisibleInfoWindow] = useState({
    //     visible: false,
    //     lat: null,
    //     lng: null,
    //     name: '',
    //     imageURL: '',
    //     time: '',
    //     kind: '',
    //     usercode: '',
    // });

    return (
        <div className="component-box-container" style={{ position: 'sticky', top: 0 }}>
            <div className="box-heading">Attendance Locator</div>

            <div style={{ padding: '10px', width: '100%' }}>
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={zoom}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        {data?.map(
                            ({
                                lat,
                                lon,
                                withinRadius,
                                user: { name, kind, id, usercode },
                                punchInAt: time,
                                image: { original: imageURL },
                            }) => (
                                <Marker
                                    key={id}
                                    onClick={() =>
                                        setVisibleInfoWindow({
                                            lat,
                                            lng: lon,
                                            visible: true,
                                            name,
                                            time,
                                            imageURL,
                                            kind,
                                            usercode,
                                        })
                                    }
                                    icon={withinRadius ? bluePin : redPin}
                                    position={{ lat, lng: lon }}
                                />
                            )
                        )}
                        {visibleInfoWindow.visible && (
                            <InfoWindow
                                onCloseClick={() =>
                                    setVisibleInfoWindow({
                                        visible: false,
                                        lat: null,
                                        lng: null,
                                        name: '',
                                        imageURL: '',
                                        time: '',
                                        kind: '',
                                        usercode: '',
                                    })
                                }
                                position={{
                                    lat: visibleInfoWindow.lat,
                                    lng: visibleInfoWindow.lng,
                                }}
                            >
                                <>
                                    <img
                                        src={visibleInfoWindow.imageURL}
                                        width="80"
                                        alt="user_image"
                                    />
                                    <p style={{ margin: '10px 0 0 0' }}>{visibleInfoWindow.name}</p>
                                    <p style={{ margin: '0' }}>
                                        {labelChange(visibleInfoWindow.usercode)}
                                    </p>
                                    <p style={{ margin: '0' }}>
                                        {labelChange(visibleInfoWindow.kind)}
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        {dayjs(visibleInfoWindow.time).format('hh:mm:ss A')}
                                    </p>
                                </>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                ) : null}
            </div>
        </div>
    );
}

export default AttendanceLocator;
