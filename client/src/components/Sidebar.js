import { useState, useContext, useEffect } from 'react';
import { Playlist } from './Playlist';
import { UserContext } from '../context/UserContext';

export const Sidebar = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addName, setAddName] = useState('');
  const [isChanging, setIsChanging] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const { user } = useContext(UserContext);

  // fetch all playlists
  // normally would import usePlaylist hook, but need to change dependencies
  useEffect(() => {
    const getPlaylists = async () => {
      const playlists = await fetch('/api/playlists', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const playlistsJSON = await playlists.json();
      setPlaylists(playlistsJSON.playlists);
    };

    if (user) {
      getPlaylists();
    }
  }, [user, isAdd, isChanging]);

  // post request to api to create new playlist
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    await fetch('/api/playlists', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: addName }),
    });

    setIsAdd(!isAdd);
  };

  // update addName state
  const handleAddChange = (e) => {
    setAddName(e.target.value);
  };

  // show and hide add button/text field
  const handleAdd = () => {
    setIsAdd(!isAdd);
  };

  return (
    <div>
      {/* show playlists in sidebar */}
      {playlists.map((playlist) => (
        <Playlist
          key={playlist._id}
          playlist={playlist}
          isChanging={isChanging}
          setIsChanging={setIsChanging}
        />
      ))}

      {/* show text field to add playlist, or show add playlist button */}
      {isAdd ? (
        <form onSubmit={handleAddSubmit}>
          <input
            type='text'
            name='name'
            onChange={handleAddChange}
            value={addName}
          />
          <button>Add</button>
        </form>
      ) : (
        <button type='button' onClick={handleAdd}>
          Add new playlist
        </button>
      )}
    </div>
  );
};
