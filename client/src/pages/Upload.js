import { useState } from 'react';
import { useUpload } from '../hooks/useUpload';
import { usePlaylists } from '../hooks/usePlaylists';

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
    <div className='w-max mx-auto mt-20'>
      <form
        onSubmit={handleSubmit}
        encType='multipart/form-data'
        className='flex flex-col'
      >
        <div className='flex flex-col gap-1 mb-4'>
          <label htmlFor='artist'>Artist</label>
          <input
            type='text'
            name='artist'
            id='artist'
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className='border-2 rounded-md w-64 p-2 hover:border-zinc-500'
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
            className='border-2 rounded-md w-64 p-2 hover:border-zinc-500'
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

        <button
          className='w-max border-2 px-4 py-2 rounded-lg hover:scale-105'
          disabled={isLoading}
        >
          Upload
        </button>

        {/* if there are errors, display them */}
        {error ? <div>{error}</div> : null}
      </form>
    </div>
  );
};
