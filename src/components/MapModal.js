function MapModal({ lat, lon }) {
    return (
        <div>
            <iframe
                title="google map"
                width="100%"
                height="420px"
                target="_parent"
                frameBorder="0"
                src={`https://maps.google.com/maps?q=${lat},${lon}&hl=es;z=14&output=embed`}
            />
        </div>
    );
}

export default MapModal;
