// =============================================================================
// Section 1: Main Application Vairables 
// =============================================================================
// 

const playlsitSongs = document.querySelector("#playlist-songs");
const playButton = document.querySelector("#play");
const pauseButton = document.querySelector("#pause");
const playNext =document.querySelector("#next");
const playPrevious = document.querySelector("#previous")
const shuffleButton = document.querySelector("#shuffle");


// start to creat the songs list 


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

// start to create the audio instance which handle the audio API

// =============================================================================
// Section 2: call the audio constant  
// =============================================================================
// 
const audio = new Audio();

// we need to handle the user data, in this case the data are the songs 
// we can handel this by creating an object containes the songs
//  and and the playback time of the song and which song is played 

let userData ={
    songs:[...allSongs],
    // to handle the current song information 
    currentSong: null,
    songCurrentTime:0

};
// =============================================================================
// Play songs function
// =============================================================================
// 

const playSong = (id)=>{
  // find the played song then to assign it late to the user data
  const song = userData?.songs.find((song)=>
    song.id === id
  );
  // This tells the audio element where to find the audio data for the selected song.
  audio.src =song.src;
  // this tells the audio element to get the titile for the song 
  audio.title=song.title;
  // check if there is no played songs or the user will play another song instead of the song is already playing 
  if(userData?.currentSong === null || userData?.currentSong?.id !== song.id){
    audio.currentTime = 0
  }else{
    // if the user choose the same song(this canbe modified in the future to make this action the same like above )
    audio.currentTime = userData?.songCurrentTime
  }
  // assign the song to be played
  userData.currentSong=song;

  // playButton.classList.add("playing")
  audio.play()
  HighlightSong()
  setPlayerDisplay()
  setPlayButtonAccessibleText()
};

// =============================================================================
// Pause songs function
// =============================================================================
// 
const pauseSong = ()=>{
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing");
  audio.pause();
  console.log('the song is stoped')
  console.log(Math.floor(audio.currentTime))
  
}





// =============================================================================
// Section 3: Render the songs on the front-end 
// =============================================================================
// 



/*
*start to render the song by creating a function,
*in this function we will pass an array as aparameter, and the reason is 
*that all songs are recorded in an array so we used an array parameter, in other words 
* this is sed to handel the passed array 
*/

const renderSongs = (array)=>{
  // use the array parameter
  const songsHTML = array.map(song=>{
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
  }).join("")
  playlsitSongs.innerHTML = songsHTML;
}


// =============================================================================
// make the song play button more accessible 
// =============================================================================
// 

const setPlayButtonAccessibleText = ()=>{
  const song = userData?.currentSong||userData?.songs[0];
  song.setAttribute('aria-label',song?.title ? `Play ${song.title}` : "Play")
}






// =============================================================================
// get the current song index 
// =============================================================================
// 

const getCurrentSongIndex = ()=>{
  return userData?.songs.indexOf(userData?.currentSong)
}



// =============================================================================
// // 
// make sure that the first song in the playlist will be played first (related to the play song)
// //
// =============================================================================

playButton.addEventListener("click",()=>{
  if(userData?.currentSong === null){
    playSong(userData?.songs[0].id)
  }else{
    playSong(userData?.currentSong.id)
  }

console.log("hello ")
console.log(getCurrentSongIndex())
console.log("the current song is "+ userData?.songs[currentSongId +1].title);

  
})

pauseButton.addEventListener("click",pauseSong);



// =============================================================================
// play next and play previous songs 
// 
// =============================================================================


// play next song 

const playNextSong = ()=>{
  if(userData?.currentSong === null){
    playSong(userData?.songs[0].id)
  }else{
    const currentSongId = getCurrentSongIndex();
    playSong(userData?.songs[currentSongId +1].id);
    console.log("the current song is "+ userData?.songs[currentSongId +1].title);
    console.log(typeof(currentSongId))
  }

};


// play previous song 
const playPreviousSong = ()=>{
  if(userData?.songs===null){
    playSong(userData?.songs[0].id)
  }else{
    
    const currentSong = getCurrentSongIndex();
    playSong(userData.songs[currentSong].id -1);
    
  }
};


// =============================================================================
// Shuffle songs function
// =============================================================================
// 

const shuffle = ()=>{
  // use 
}


// declare next and previous functions 

playNext.addEventListener("click", playNextSong)
playPrevious.addEventListener("click",playPreviousSong)


// =============================================================================
// Highlight the playing song 
// =============================================================================
// 

const HighlightSong = ()=>{
const playlistSongElements = document.querySelectorAll('.playlist-song');
// get the id of the inserted html in the render song function to get the song id 
const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);
playlistSongElements.forEach((songEl)=>{
// remove tha aria-current attribute from all other elements in the song lists
songEl.removeAttribute("aria-current")
})
// add the attribute again to the song of
if(songToHighlight){
  songToHighlight.setAttribute("aria-current","true");
}
}

// ==========================================================================================
//Display the song title and artist display 
// ==========================================================================================
// 

const setPlayerDisplay = ()=>{
const playingSong = document.getElementById("player-song-title");
const songArtist = document.getElementById("player-song-artist");
const currentTitle = userData?.currentSong?.title;
const  currentArtist = userData?.currentSong?.artist;
//  use a ternary to check if the title equal the song title and song artist
playingSong.textContent = currentTitle ? currentTitle : "";
songArtist.textContent = currentArtist ? currentArtist : "";



}



// ==========================================================================================
//  build the Sorting function  (sort the songs function alephabitcally)
// ==========================================================================================
// 




const sortSongs = ()=>{
  userData?.songs.sort((a,b)=> a.title.localeCompare(b.title) );
  return userData?.songs;
}
sortSongs()


// we sued the optiona chaining in callling the function and that for the reason 
// preventing errors when dealing with nested properties that containes null or undefined 
renderSongs(userData?.songs);

function getAudiocurrentTime (){
  
}

pauseButton.addEventListener