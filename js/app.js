const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const shuffleButton = document.getElementById('shuffle');

// Songs
const allSongs = [
    {
      id: 0,
      title: "Scratching The Surface",
      artist: "Quincy Larson",
      duration: "4:25",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
    },
    {
      id: 1,
      title: "Can't Stay Down",
      artist: "Quincy Larson",
      duration: "4:15",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
    },
    {
      id: 2,
      title: "Still Learning",
      artist: "Quincy Larson",
      duration: "3:51",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
    },
    {
      id: 3,
      title: "Cruising for a Musing",
      artist: "Quincy Larson",
      duration: "3:34",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
    },
    {
      id: 4,
      title: "Never Not Favored",
      artist: "Quincy Larson",
      duration: "3:35",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
    },
    {
      id: 5,
      title: "From the Ground Up",
      artist: "Quincy Larson",
      duration: "3:12",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
    },
    {
      id: 6,
      title: "Walking on Air",
      artist: "Quincy Larson",
      duration: "3:25",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
    },
    {
      id: 7,
      title: "Can't Stop Me. Can't Even Slow Me Down.",
      artist: "Quincy Larson",
      duration: "3:52",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
    },
    {
      id: 8,
      title: "The Surest Way Out is Through",
      artist: "Quincy Larson",
      duration: "3:10",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
    },
    {
      id: 9,
      title: "Chasing That Feeling",
      artist: "Quincy Larson",
      duration: "2:43",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
    },
  ];


//start working with the audio API

const audio =new Audio();


// working on tracking the song information 

let userData = {
songs:[...allSongs],

// song controllers

currentSong:null,
songCurrentTime:0
};

/*
 * -----------------------------------------------------------------
 * Highliting the currently playeing song 
 * -----------------------------------------------------------------
 */


const highlightCurrentSong = ()=>{
  // selecting all playlist elements 

const playlistSongElements = document.querySelectorAll(".playlist-song");

const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`)

// remove the attribute from every element in the array and focuse on the highlited one 
playlistSongElements.forEach((songEl) => {
  songEl.removeAttribute("aria-current");
  // use the if condition as a truthy 
  if(songToHighlight){
    songToHighlight.setAttribute("aria-current","true")

  }
});

};



// render songs 

const renderSongs = (array) => {
  const songsHTML = array.map((song)=> {
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `;
    })
    .join("");
  playlistSongs.innerHTML = songsHTML;

  
};

// get the index of songs function using indexOf()


const getCurrentSongIndex = ()=>{
  return userData?.songs.indexOf(userData?.currentSong);
}

// using the find() method to find the id 
// find method retrieve the element which fulfill the condition 
// if there is no item satisfies the condition it return (undefined)

const playSong = (id)=>{
  const song = userData?.songs.find((song)=>song.id ===id);
  audio.src = song.src;
  audio.title = song.title;

  // make sure that song will play from the beggining 
  // first: check if there is no current song or if the song is different from the song we are about to play

  if(userData?.currentSong === null || userData?.currentSong !== song.id){
    audio.currentTime = 0;
  }else{
    // set an else to make the song play from the time that song is paused in 
    audio.currentTime = userData?.songCurrentTime ;
  }

  userData.currentSong = song;


  // add the "playing" class to the play button

  playButton.classList.add("playing");

  // PLAY the song using play() method from the web audio api
  audio.play();
  highlightCurrentSong()
};

/*
 * -----------------------------------------------------------------
 * render the song title and the artist 
 * -----------------------------------------------------------------
 */

const setPlayerDisplay = ()=>{
  const playingSong = document.getElementById('player-song-title');
  const songArtist = document.getElementById('player-song-artist');
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  
}


/*
 * -----------------------------------------------------------------
 * play the next song function 
 * -----------------------------------------------------------------
 */


const playNextSong = ()=>{
  if(userData?.currentSong === null){
    playSong(userData?.songs[0].id);
  }else{
    const currentSongIndex = getCurrentSongIndex()
    // currentSongIndex ++;
    const nextSong = userData?.songs[currentSongIndex+1];
      playSong(nextSong.id)
  }
}


/*
 * -----------------------------------------------------------------
 * play the Previous song function 
 * -----------------------------------------------------------------
 */

const playPreviousSong = ()=>{
  if(userData?.currentSong === null){
    return 
  }else{
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }
}



// play song when the user click on it 

playButton.addEventListener('click',()=>{

  // check if the current song is not null then play the first song in the list
  if(!userData?.currentSong){
    playSong(userData?.songs[0].id)

  }else{
    playSong(userData?.currentSong.id)
  }
})

/*
 * -----------------------------------------------------------------
 * play the next song event listenr 
 * -----------------------------------------------------------------
 */


nextButton.addEventListener('click',playNextSong)


/*
 * -----------------------------------------------------------------
 * play the previous song event listenr and pass the (playPreiousSong) callback function
 * -----------------------------------------------------------------
 */

previousButton.addEventListener('click',playPreviousSong);

// pause function 

const pauseSong = ()=>{
// first we need to store the time of the current song 
audio.currentTime = userData.songCurrentTime;
playButton.classList.remove("playing");
// use pause method using 
audio.pause();
};


// pasue the song when the user clicks on it 

pauseButton.addEventListener('click',pauseSong);



// sort songs alphabitacally using the sort method  


const sortSongs = ()=>{
  userData?.songs.sort((a,b)=>{

    // iterate through the songs and create a compare between two array element
    // if the first element is less than the second element then sort the first one before the other 
    if(a.title < b.title){
      return -1

    }
    if (a.title > b.title) {
      return 1;
    }
    return 0
  })
  return userData?.songs;
}

renderSongs(sortSongs());
