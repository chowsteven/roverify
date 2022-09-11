import { useState } from 'react';
import { useUpload } from '../hooks/useUpload';
import { usePlaylists } from '../hooks/usePlaylists';
import { MdOutlineError } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

export const Upload = () => {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [song, setSong] = useState(null);
  const { upload, isLoading, error } = useUpload();
  const { playlists } = usePlaylists();

  const handleSubmit = (e) => {
    e.preventDefault();

    upload(artist, title, playlistName, song);
  };

  return (
    <div className='flex flex-col items-center mt-20'>
      <div className='text-3xl font-semibold mb-8'>Upload a song</div>
      <form
        onSubmit={handleSubmit}
        encType='multipart/form-data'
        className='flex flex-col w-64'
      >
        <div className='flex flex-col gap-1 mb-4'>
          <label htmlFor='artist'>Artist</label>
          <input
            type='text'
            name='artist'
            id='artist'
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className='border-2 rounded-md w-64 p-2 bg-gray-100 hover:border-gray-500'
            required={true}
          />
        </div>

        <div className='flex flex-col gap-1 mb-4'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 rounded-md w-64 p-2 bg-gray-100 hover:border-gray-500'
            required={true}
          />
        </div>

        <div className='flex flex-col gap-1 mb-4'>
          <label htmlFor='playlistName'>Playlist</label>
          <select
            className='border-2 rounded-md w-64 p-2 bg-white'
            onChange={(e) => setPlaylistName(e.target.value)}
            name='playlistName'
            id='playlistName'
            value={playlistName}
          >
            <option>Choose a playlist</option>
            {playlists.map((playlist) => (
              <option key={playlist._id}>{playlist.name}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col gap-1 mb-4'>
          <label htmlFor='song'>Upload a song:</label>
          <input
            type='file'
            name='song'
            id='song'
            accept='.mp3'
            onChange={(e) => setSong(e.target.files[0])}
          />
        </div>

        {isLoading ? (
          <ClipLoader size={24} />
        ) : (
          <button className='w-max border-2 px-4 py-2 mb-8 rounded-lg hover:scale-105'>
            Upload
          </button>
        )}

        {/* if there are errors, display them */}
        {error ? (
          <div className='flex items-center gap-2 text-red-700'>
            <MdOutlineError /> {error}
          </div>
        ) : null}
      </form>
    </div>
  );
};
