import React, { useEffect, useRef, useState } from 'react';
import { Container, Container as MapDiv, Marker, NaverMap, useNavermaps } from 'react-naver-maps';

interface mapProps {
    address: string;
}
const NaverMapsComponent = ({ address }: mapProps) => {
    const mapElement = useRef(null);
    const { naver } = window;
    const [addressX, setAddressX] = useState<number>(0);
    const [addressY, setAddressY] = useState<number>(0);
    const navermaps = useNavermaps();

    //주소 -> 좌표 변환
    const convertAddressToXY = () => {
        naver.maps.Service.geocode(
            {
                query: address,
            },
            (status, res) => {
                if (status !== naver.maps.Service.Status.OK) {
                    return alert('Somxwething Wrong!');
                }
                const result = res.v2;
                console.log('result: ', result);
                setAddressX(Number(result.addresses[0].x));
                setAddressY(Number(result.addresses[0].y));
            },
        );
    };

    useEffect(() => {
        const onSuccessGeolocation = (position: any) => {
            const currentLocation = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
            const location = new naver.maps.LatLng(addressY, addressX);
            if (address != 'current') {
                map.setCenter(location);
            } else {
                map.setCenter(currentLocation);
                setAddressY(position.coords.latitude);
                setAddressX(position.coords.longitude);
            }
            map.setZoom(16);
        };
        const onErrorGeolocation = () => {
            alert('naver map error!');
        };

        const map = new naver.maps.Map('map', {
            zoomControl: true,
            mapTypeId: naver.maps.MapTypeId.NORMAL,
        });

        if (address != 'current') {
            convertAddressToXY();
            const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(addressY, addressX),
                map: map,
            });
        } else {
            const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(addressY, addressX),
                map: map,
            });
        }

        // const infowindow = new naver.maps.InfoWindow();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
        } else {
            // const center = map.getCenter();
            // infowindow.setContent(
            //     '<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>',
            // );
            // infowindow.open(map, center);
        }
    }, [address, addressX, addressY]);
    return (
        <>
            <div className="w-full h-full">
                <div ref={mapElement} id="map" className="w-full h-full" />
                <Marker position={new navermaps.LatLng(addressX, addressY)}></Marker>
            </div>
        </>
    );
};

export default NaverMapsComponent;
