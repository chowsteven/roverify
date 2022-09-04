export const Song = ({ song, isPlaying, setIsPlaying, setCurrentSong }) => {
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    setCurrentSong(song.songURL);
  };

  return (
    <tr>
      <td>
        <button type='button' onClick={handlePlay}>
          Play
        </button>
      </td>
      <td>{song.title}</td>
      <td>{song.artist}</td>
      <td>{song.duration}</td>
      <td>
        <button type='button'>Edit</button>
        <button type='button'>Delete</button>
      </td>
    </tr>
  );
};
