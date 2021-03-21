import React from 'react';

class Music extends React.Component
{
    componentDidMount()
    {
        this.props.currentlyOnPlayMusicScreen();
        this.props.playPauseButtonClicked();
    }
    componentWillUnmount()
    {
        this.props.currentlyOnPlayMusicScreen()
    }
    render()
    {
        const {songIndex, Songs}=this.props;
        return (
            <div className="screen-music">
                <h2>{Songs[songIndex].name}</h2>
                <div className="song-image">
                    <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQT0kwjsN-yiBUPsFiv0x18yoMpN-Yd4WMupg&usqp=CAU'} alt="song item"></img>
                </div>
                {/* firebase songs used for src */}
                <div style={{marginTop:20}}>
                    <audio controls="seeking" id="audio" src={Songs[songIndex].url}></audio> 
                </div>
                <div className='screen-music-instruction'>
                    <p>
                        Press "<i className="fas fa-play"></i>/<i className="fas fa-pause"></i>" button to play/pause.
                    </p>
                </div>
            </div>
        );
    }
};

export default Music;