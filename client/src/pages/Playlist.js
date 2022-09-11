import { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Song } from '../components/Song';
import { Sidebar } from '../components/Sidebar';
import { MdOutlineAdd } from 'react-icons/md';

export const Playlist = () => {
  const [playlist, setPlaylist] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
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
  }, [user, id, isChanging]);

  return (
    <div className='px-16 lg:flex lg:gap-36'>
      <div className='hidden lg:block'>
        <Sidebar />
      </div>
      <div className='lg:justify-self-center'>
        <div className='flex justify-between items-center mb-6'>
          <div className='text-4xl font-semibold'>{playlist.name}</div>
          <Link to='/upload' className='flex items-center gap-1'>
            <MdOutlineAdd />
            Add a song
          </Link>
        </div>
        {playlist.songs && (
          <table className='w-full lg:justify-self-center'>
            <thead>
              <tr>
                <th className='text-start w-48 text-lg md:w-64 xl:w-96 2xl:w-[512px]'>
                  Song Name
                </th>
                <th className='text-start w-48 text-lg md:w-64 xl:w-96 2xl:w-[512px]'>
                  Artist
                </th>
                <th className='text-start w-24 text-lg'>Duration</th>
                <th className='text-end text-lg'>Actions</th>
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
                  isChanging={isChanging}
                  setIsChanging={setIsChanging}
                  playlistName={playlist.name}
                />
              ))}
            </tbody>
          </table>
        )}
        {isPlaying && <audio src={currentSong} controls />}
      </div>
    </div>
  );
};
