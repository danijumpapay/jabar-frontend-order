import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { useEffect } from 'react';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapSelectorProps {
    lat: number;
    lng: number;
    onChange: (lat: number, lng: number) => void;
}

const SearchControl = ({ onChange }: { onChange: (lat: number, lng: number) => void }) => {
    const map = useMap();

    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        // @ts-ignore
        const searchControl = new GeoSearchControl({
            provider: provider,
            style: 'bar',
            showMarker: false,
            showPopup: false,
            autoClose: true,
            retainZoomLevel: false,
            animateZoom: true,
            keepResult: true,
            searchLabel: 'Cari jalan, wilayah, atau koordinat...',
        });

        map.addControl(searchControl);

        const handleSearch = (result: any) => {
            if (result.location) {
                onChange(result.location.y, result.location.x);
            }
        };

        // Handle raw input for coordinates fallback
        const handleRawSearch = (e: any) => {
            const query = e.query;
            const coordRegex = /^(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)$/;
            const match = query.match(coordRegex);

            if (match) {
                const lat = parseFloat(match[1]);
                const lng = parseFloat(match[2]);
                onChange(lat, lng);
                map.setView([lat, lng], 17);
            }
        };

        map.on('geosearch/showlocation', handleSearch);
        // @ts-ignore
        map.on('geosearch/search', handleRawSearch);

        return () => {
            map.removeControl(searchControl);
            map.off('geosearch/showlocation', handleSearch);
            // @ts-ignore
            map.off('geosearch/search', handleRawSearch);
        };
    }, [map, onChange]);

    return null;
};

const LocationMarker = ({ lat, lng, onChange }: MapSelectorProps) => {
    const map = useMap();

    useEffect(() => {
        map.setView([lat, lng], map.getZoom());
    }, [lat, lng, map]);

    useMapEvents({
        click(e) {
            onChange(e.latlng.lat, e.latlng.lng);
        },
    });

    return (
        <Marker
            position={[lat, lng]}
            draggable={true}
            eventHandlers={{
                dragend: (e) => {
                    const marker = e.target;
                    const position = marker.getLatLng();
                    onChange(position.lat, position.lng);
                },
            }}
        />
    );
};

export const MapSelector = ({ lat, lng, onChange }: MapSelectorProps) => {
    return (
        <div className="h-[300px] w-full rounded-2xl overflow-hidden border border-gray-100 mb-4 shadow-inner relative">
            <MapContainer
                center={[lat, lng]}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                {/* Google Maps Style Tile Layer */}
                <TileLayer
                    url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                    attribution="&copy; Google Maps"
                />
                <LocationMarker lat={lat} lng={lng} onChange={onChange} />
                <SearchControl onChange={onChange} />
            </MapContainer>
            <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
                <p className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-bold text-gray-500 shadow-sm border border-gray-100">
                    Klik atau geser pin untuk ubah lokasi
                </p>
            </div>
        </div>
    );
};
