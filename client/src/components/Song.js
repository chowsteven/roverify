import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { FaPlay, FaEdit, FaRegSave } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export const Song = ({
  song,
  isPlaying,
  setIsPlaying,
  setCurrentSong,
  isChanging,
  setIsChanging,
  playlistName,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(song.title);
  const [editArtist, setEditArtist] = useState(song.artist);
  const { user } = useContext(UserContext);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    setCurrentSong(song.songURL);
  };

  // patch request to edit song title/artist
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/songs/${song._id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: song._id,
        title: editTitle,
        artist: editArtist,
        playlistName,
      }),
    });

    setIsEdit(!isEdit);

    // update isChanging so Sidebar useEffect updates
    setIsChanging(!isChanging);
  };

  const handleEditTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleEditArtistChange = (e) => {
    setEditArtist(e.target.value);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  // delete request to delete song
  const handleDelete = async () => {
    await fetch(`/api/songs/${song._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    });

    // update isChanging so Sidebar useEffect updates
    setIsChanging(!isChanging);
  };

  return (
    <tr>
      {isEdit ? (
        <>
          <td>
            <form id='edit' onSubmit={handleEditSubmit}>
              <input
                type='text'
                name='title'
                value={editTitle}
                onChange={handleEditTitleChange}
                className='w-28 rounded-md p-2 mr-4 md:w-64 xl:w-96 2xl:w-[512px]'
              />
            </form>
          </td>
          <td>
            <form>
              <input
                type='text'
                name='artist'
                value={editArtist}
                onChange={handleEditArtistChange}
                className='w-28 rounded-md p-2 mr-4 md:w-64 xl:w-96 2xl:w-[512px]'
              />
            </form>
          </td>
          <td>{song.duration}</td>
          <td>
            <button form='edit'>
              <FaRegSave size={24} />
            </button>
          </td>
          {/* TODO: add cancel button */}
        </>
      ) : (
        <>
          <td className='py-2'>{song.title}</td>
          <td className='py-2'>{song.artist}</td>
          <td className='py-2'>{song.duration}</td>
          <td className='flex justify-end gap-2 pt-2.5'>
            <button type='button' onClick={handlePlay}>
              <FaPlay size={14} />
            </button>
            <button type='button' onClick={handleEdit}>
              <FaEdit size={14} />
            </button>
            <button type='button' onClick={handleDelete}>
              <MdDelete size={18} />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};
