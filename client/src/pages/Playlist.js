import { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Song } from '../components/Song';
import { Sidebar } from '../components/Sidebar';
import { MdOutlineAdd } from 'react-icons/md';
import { AudioPlayer } from '../components/AudioPlayer';

export const Playlist = () => {
  const [playlist, setPlaylist] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [currentSongIdx, setCurrentSongIdx] = useState(null);
  const [songDuration, setSongDuration] = useState('00:00');
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
    <div className='relative h-[calc(100vh-8rem)] overflow-y-hidden px-16 lg:flex lg:gap-36'>
      <div className='hidden lg:block'>
        <Sidebar />
      </div>
      <div className='lg:justify-self-center'>
        <div className='flex justify-between items-center mb-6'>
          <div className='truncate w-48 text-4xl font-semibold sm:w-56 md:w-64 lg:w-72 xl:w-[512px] 2xl:w-[768px]'>
            {playlist.name}
          </div>
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
              {playlist.songs.map((song, idx) => (
                <Song
                  key={song._id}
                  song={song}
                  idx={idx}
                  setIsPlaying={setIsPlaying}
                  setCurrentSongIdx={setCurrentSongIdx}
                  isChanging={isChanging}
                  setIsChanging={setIsChanging}
                  setSongDuration={setSongDuration}
                  // playlistName={playlist.name}
                />
              ))}
            </tbody>
          </table>
        )}

        {Object.keys(playlist).length === 0 ? null : (
          <AudioPlayer
            playlist={playlist.songs}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentSongIdx={currentSongIdx}
            setCurrentSongIdx={setCurrentSongIdx}
          />
        )}
      </div>
    </div>
  );
};
