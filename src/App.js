import React from 'react';
import './App.css';
import Buttons from './Buttons';
import Screen from './Screen';
import ZingTouch from 'zingtouch';
import 'lodash';   //for js array and object manipulation 
import $ from 'jquery';

class App extends React.Component
{
    constructor()
    {
        super();
        this.temp_change_in_angle = 0;
        this.temp_selected = 0;
        this.state = {
            options: ['Games', 'Music', 'Settings', 'Media'],
            change_in_angle: 0,
            selected: 0,
            showPage: -1,
            general_menu: ['Games', 'Music', 'Settings', 'Media'],
            songs_sub_menu: ['All Songs', 'Artists', 'Albums'],
            current_music_selection: 0,
            song_index: -1,
            currently_on_play_music_screen: false,
        }
    }


    // ZingTouch for circular Buttons


    componentDidMount()
    {
        var zt = new ZingTouch.Region(document.getElementsByClassName('buttons-container')[0]);
        zt.bind(document.getElementsByClassName('buttons-container')[0], 'rotate', (event) =>
        {
            if (document.getElementsByClassName('screen-menu')[0].classList.contains('width-50'))//rotation will be enabled only when the side bar is shown to the user.
            {
                let dist = event.detail.distanceFromLast;
                this.temp_change_in_angle += dist;
                if (this.temp_change_in_angle > 60)
                {
                    this.temp_selected++;
                    this.temp_selected = this.temp_selected % this.state.options.length;
                    this.setState({
                        selected: this.temp_selected,
                        // song_index: -1
                    });

                    this.temp_change_in_angle = 0;
                }
                else if (this.temp_change_in_angle < -60)
                {
                    this.temp_selected--;
                    if (this.temp_selected === -1)
                        this.temp_selected = this.state.options.length - 1;

                    this.temp_selected = this.temp_selected % this.state.options.length;
                    this.setState({
                        selected: this.temp_selected,
                        // song_index: -1
                    });
                    this.temp_change_in_angle = 0;
                }
            }

        });
    }

    menuButtonClicked = () =>
    {

        let screenMenuClassList = document.getElementsByClassName('screen-menu')[0].classList;
        if (screenMenuClassList.contains('width-50'))
        {
            $('.screen-menu').removeClass('width-50');//hide menu
        }
        else
        {
            $('.screen-menu').addClass('width-50');//show menu
        }
    }

    selectButtonClicked = () =>
    {
        if(this.state.currently_on_play_music_screen&&!document.getElementsByClassName('screen-menu')[0].classList.contains('width-50'))// On the music play screen , when sidebar is hidden, the select button will not work.
        {
            return;
        }
        if (this.state.selected === 1 && this.state.options.length === 4)
        {
            this.setState(
                {
                    options: this.state.songs_sub_menu,
                    selected: 0,
                    showPage: -1,
                    song_index: -1,//Don't play any song at index -1
                }
            );
            this.temp_selected = 0;
            return;
        }
        if (!document.getElementsByClassName('screen-menu')[0].classList.contains('width-50'))//side menu is not visible
        {
            if (this.state.options.length === 3)//once music section in opened
            {
                if (this.state.showPage === 0)//all songs
                {
                    if (this.state.song_index === -1)//not on the music page
                    {
                        this.setState({
                            song_index: this.state.current_music_selection,//select song to play
                        });
                        this.temp_selected = 0;
                        return;
                    }

                }
            }
        }
        this.setState({
            showPage: this.state.selected,
            song_index: -1,//we dont want to play any song
            selected: 0,
        });
        this.temp_selected = 0;
        this.menuButtonClicked();
    }


    leftButtonClicked = () =>
    {
        // left right buttons can be used to navigate over songs
        if (this.state.currently_on_play_music_screen)//if i am on the play music screen
        {
            if (!document.getElementsByClassName('screen-menu')[0].classList.contains('width-50'))//if the menu is not present on the screen
            {
                if ($('#audio')[0] !== undefined)/* handling the turning off of button lights when i play the next song  */
                {
                    $('.buttons-container').removeClass('colored');
                }
                //here i can switch to next song
                if (this.state.song_index === 0)
                {
                    this.setState({
                        song_index: 5
                    });
                    return;
                }
                if (this.state.song_index !== -1)
                {
                    this.setState({
                        song_index: this.state.song_index - 1
                    });
                    return;
                }
            }
        }
            //when menu is open and it is on the songs page and left button is clicked then only the menu will be changed to general options

        if (this.state.options.length === 3 && document.getElementsByClassName('screen-menu')[0].classList.contains('width-50'))
            this.setState(
                {
                    options: this.state.general_menu,
                    song_index: -1,
                    selected: 0
                }
            );
        if (!document.getElementsByClassName('screen-menu')[0].classList.contains('width-50'))//side menu is not visible
        {
            if (this.state.options.length === 3)//music section
            {
                if (this.state.showPage === 0)//all songs page
                {
                    if (this.state.current_music_selection === 0)//if pointer is on 5th index and left button is clicked it will again move to 4th index.
                        this.setState({
                            current_music_selection: 5,
                            song_index: -1
                        });
                    else
                        this.setState({
                            current_music_selection: this.state.current_music_selection - 1,
                            song_index: -1
                        });
                }
            }
        }
    }

    rightButtonClicked = () =>
    {
                // right button can be used to change songs while playing songs
        if (this.state.currently_on_play_music_screen)//if on the play music screen
        {
            if (!document.getElementsByClassName('screen-menu')[0].classList.contains('width-50'))//if menu is not present on the screen
            {
                if ($('#audio')[0] !== undefined)/* handling the turning off of button lights when play the next song  */
                {
                    $('.buttons-container').removeClass('colored');
                }
                //navigate to next song
                if (this.state.song_index === 5)
                {
                    this.setState({
                        song_index: 0
                    });
                    return;
                }
                if (this.state.song_index !== -1)
                {
                    this.setState({
                        song_index: this.state.song_index + 1
                    });
                    return;
                }
            }
        }
        if (!document.getElementsByClassName('screen-menu')[0].classList.contains('width-50'))//when side menu is not visible
        {
            if (this.state.options.length === 3)//must be on the music section
            {
                if (this.state.showPage === 0)//must be on all songs page
                {
                    if (this.state.current_music_selection === 5)//if pointer is on 5th index and right button is clicked it will again move to 1st index.
                        this.setState({
                            current_music_selection: 0
                        });
                    else
                        this.setState({
                            current_music_selection: this.state.current_music_selection + 1
                        });
                }
            }
        }
    }

    currentlyOnPlayMusicScreen = () =>
    {
        if (this.state.currently_on_play_music_screen)
        {
            $('.buttons-container').removeClass('colored');
            this.setState({
                currently_on_play_music_screen: false
            });
        }
        else
            this.setState({
                currently_on_play_music_screen: true
            });
    }

    playPauseButtonClicked = () =>
    {
        if ($('#audio')[0] !== undefined)
        {
            if ($('#audio')[0].paused)//enable play pause button with button's light animation
            {
                $('#audio')[0].play();
                $('.buttons-container').addClass('colored');
                return;
            }
            $('#audio')[0].pause();
            $('.buttons-container').removeClass('colored');
        }
    }

    rotatePod=()=>
    {
        /* screen rotation feature */
        $('.App').toggleClass('rotate-anti-clockwise');
        $('.buttons-container').toggleClass('rotate-clockwise');
        $('.screen-container').toggleClass('rotate-clockwise');
    }

    render()
    {
        return (
            <div className="App">
                <Screen
                    selectedOption={this.state.selected}
                    showPage={this.state.showPage}
                    optionsInMenu={this.state.options}
                    currentMusicSelection={this.state.current_music_selection}
                    songIndex={this.state.song_index}
                    currentlyOnPlayMusicScreen={this.currentlyOnPlayMusicScreen}
                    playPauseButtonClicked={this.playPauseButtonClicked}

                />
                <Buttons
                    check={this.checker}
                    centerButton={this.centerButton}
                    menuButtonClicked={this.menuButtonClicked}
                    selectButtonClicked={this.selectButtonClicked}
                    leftButtonClicked={this.leftButtonClicked}
                    rightButtonClicked={this.rightButtonClicked}
                    playPauseButtonClicked={this.playPauseButtonClicked}
                />
                <button className="rotate" onClick={this.rotatePod}>
                    <i className="fas fa-undo"></i>
                </button>
            </div>
        );
    }

}

export default App;
