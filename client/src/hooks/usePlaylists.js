import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const { user } = useContext(UserContext);

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
  }, [user]);

  return { playlists };
};
