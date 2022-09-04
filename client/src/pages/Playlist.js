import { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Song } from '../components/Song';
import { Sidebar } from '../components/Sidebar';

export const Playlist = () => {
  const [playlist, setPlaylist] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('');
  const { id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getPlaylist = async () => {
      const targetPlaylist = await fetch(`/api/playlists/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const playlistJSON = await targetPlaylist.json();
      setPlaylist(playlistJSON.playlist);
    };

    if (user) {
      getPlaylist();
    }
  }, [user, id]);

  return (
    <div>
      <Sidebar />
      <div>
        <div>{playlist.name}</div>
        <Link to='/upload'>Add a song</Link>
      </div>
      {playlist.songs && (
        <table>
          <thead>
            <tr>
              <th>Play</th>
              <th>Song Name</th>
              <th>Artist</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {playlist.songs.map((song) => (
              <Song
                key={song._id}
                song={song}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                setCurrentSong={setCurrentSong}
              />
            ))}
          </tbody>
        </table>
      )}
      {isPlaying && <audio src={currentSong} controls />}
    </div>
  );
};
