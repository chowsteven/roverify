import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const useUpload = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  let navigate = useNavigate();

  const upload = async (artist, title, playlistName, song) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('artist', artist);
    formData.append('title', title);
    formData.append('playlistName', playlistName);
    formData.append('song', song);

    const response = await fetch('/api/songs', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    });
    const responseJSON = await response.json();

    if (!response.ok) {
      // clear loading state and set errors
      setIsLoading(false);
      setError(responseJSON.error);
    } else {
      // clear loading state
      setIsLoading(false);
      // navigate(-1);
    }
  };

  return { upload, isLoading, error };
};
