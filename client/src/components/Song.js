import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

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
      <td>
        <button type='button' onClick={handlePlay}>
          Play
        </button>
      </td>
      {isEdit ? (
        <>
          <td>
            <form id='edit' onSubmit={handleEditSubmit}>
              <input
                type='text'
                name='title'
                value={editTitle}
                onChange={handleEditTitleChange}
              />
              <input
                type='text'
                name='artist'
                value={editArtist}
                onChange={handleEditArtistChange}
              />
            </form>
          </td>
          <td>{song.duration}</td>
          <td>
            <button form='edit'>Save</button>
          </td>
          {/* TODO: add cancel button */}
        </>
      ) : (
        <>
          <td>{song.title}</td>
          <td>{song.artist}</td>
          <td>{song.duration}</td>
          <td>
            <button type='button' onClick={handleEdit}>
              Edit
            </button>
            <button type='button' onClick={handleDelete}>
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};
