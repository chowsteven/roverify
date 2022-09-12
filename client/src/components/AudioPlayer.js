import { useState, useRef } from 'react';
import { secondsToTimer } from '../utils/secondsToTimer';
import {
  BiSkipNext,
  BiSkipPrevious,
  BiRepeat,
  BiShuffle,
} from 'react-icons/bi';
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs';

export const AudioPlayer = ({
  playlist,
  isPlaying,
  setIsPlaying,
  currentSongIdx,
  setCurrentSongIdx,
}) => {
  // set current song
  const currentSong = playlist[currentSongIdx];

  // set initial progress to 00:00
  const [currentSongTime, setCurrentSongTime] = useState('00:00');
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // create refs to manipulate progress bar and audio
  const barRef = useRef(null);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const playSong = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };

  const pauseSong = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const handleShuffle = () => {
    // TODO
  };

  const handlePrevious = () => {
    // if trying to go backwards at 0, loop back to end of playlist
    if (currentSongIdx === 0) {
      setCurrentSongIdx(playlist.length - 1);
    } else {
      setCurrentSongIdx((prevIdx) => prevIdx - 1);
    }
  };

  const handleNext = () => {
    // if trying to go forwards at end of playlist, loop back to beginning of playlist
    if (currentSongIdx === playlist.length - 1) {
      setCurrentSongIdx(0);
    } else {
      setCurrentSongIdx((prevIdx) => prevIdx + 1);
    }
  };

  const handleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const updateProgressBar = (e) => {
    // get progress as a %
    const percentProgress = (e.target.currentTime / currentSong.duration) * 100;

    // set as width
    progressRef.current.style.width = `${percentProgress}%`;

    // convert current song time from seconds to mm:ss
    setCurrentSongTime(
      new Date(1000 * e.target.currentTime).toISOString().substring(14, 19)
    );
  };

  const setProgress = (e) => {
    // get width of progress bar and target progress
    const barWidth = barRef.current.offsetWidth;
    const targetProgress = e.nativeEvent.offsetX;

    // set target time in the progress bar and skip to target audio time
    setCurrentSongTime((targetProgress / barWidth) * currentSong.duration);
    audioRef.current.currentTime =
      (targetProgress / barWidth) * currentSong.duration;
  };

  const handleEnd = () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      handleNext();
    }
  };

  return (
    // TODO: add current song info
    <div className='absolute inset-x-0 bottom-8 flex flex-col justify-center items-center'>
      {/* controls */}
      <div className='flex items-center gap-2'>
        <button onClick={handleShuffle}>
          {isShuffle ? (
            <BiShuffle size={28} color='green' />
          ) : (
            <BiShuffle size={28} />
          )}
        </button>
        <button onClick={handlePrevious}>
          <BiSkipPrevious size={46} />
        </button>
        <div>
          {isPlaying ? (
            <button onClick={pauseSong}>
              <BsPauseCircle size={34} />
            </button>
          ) : (
            <button onClick={playSong}>
              <BsPlayCircle size={34} />
            </button>
          )}
        </div>
        <button onClick={handleNext}>
          <BiSkipNext size={46} />
        </button>
        <button onClick={handleRepeat}>
          {isRepeat ? (
            <BiRepeat size={28} color='green' />
          ) : (
            <BiRepeat size={28} />
          )}
        </button>
      </div>

      {/* progress bar */}
      <div className='flex items-center gap-2'>
        <div>{currentSongTime}</div>
        <div
          ref={barRef}
          className='w-64 h-1 rounded-md bg-gray-500 sm:w-72 lg:w-96'
          onClick={(e) => setProgress(e)}
        >
          <div ref={progressRef} className='w-0 h-1 bg-black'></div>
        </div>

        <div>
          {currentSong ? secondsToTimer(currentSong.duration) : '00:00'}
        </div>
      </div>

      {/* audio element (hidden) */}
      <audio
        src={currentSong ? currentSong.songURL : null}
        ref={audioRef}
        autoPlay
        onTimeUpdate={(e) => updateProgressBar(e)}
        onEnded={handleEnd}
      />
    </div>
  );
};
