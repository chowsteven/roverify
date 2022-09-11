import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FaEdit, FaRegSave } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export const Playlist = ({ playlist, isChanging, setIsChanging }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState(playlist.name);
  const { user } = useContext(UserContext);

  // patch request to edit playlist name
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/playlists/${playlist._id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: editName }),
    });

    setIsEdit(!isEdit);

    // update isChanging so Sidebar useEffect updates
    setIsChanging(!isChanging);
  };

  const handleEditChange = (e) => {
    setEditName(e.target.value);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  // delete request to delete playlist
  const handleDelete = async () => {
    await fetch(`/api/playlists/${playlist._id}`, {
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
    <>
      {/* show text field to edit playlist name or show playlist name and actions */}
      {isEdit ? (
        <form onSubmit={handleEditSubmit} className='flex justify-between'>
          <input
            type='text'
            name='name'
            onChange={handleEditChange}
            value={editName}
            className='w-40 p-2 rounded-md'
            autoFocus
          />{' '}
          <button>
            <FaRegSave />
          </button>
        </form>
      ) : (
        // TODO: add cancel button
        <div className='flex justify-between pb-1'>
          <div className='text-lg truncate w-40'>
            <Link to={`/playlists/${playlist._id}`}>{playlist.name}</Link>
          </div>
          <div>
            <button type='button' onClick={handleEdit} className='pr-1'>
              <FaEdit />
            </button>
            <button type='button' onClick={handleDelete}>
              <MdDelete />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
