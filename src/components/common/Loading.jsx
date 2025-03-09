const Loading = () => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(255,255,255,0.7)',
                zIndex: 999,
            }}
        >
            <div className="loading">
                <div className="loading-item"></div>
                <div className="loading-item"></div>
                <div className="loading-item"></div>
                <div className="loading-item"></div>
                <div className="loading-item"></div>
            </div>
            <div className="loading_text h5 my-3">NOW LOADING...ʕ̯•͡ˑ͓•̯᷅ʔ</div>
        </div>
    );
};

export default Loading;
