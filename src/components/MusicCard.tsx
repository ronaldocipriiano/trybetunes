import React, { useEffect, useState } from 'react';
import { SongType } from '../types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

type MusicCardProps = {
  song: SongType;
  updateFavoriteSongs?: (trackId: number) => void;
};

function MusicCard({ song, updateFavoriteSongs = () => '' }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(loading);

  useEffect(() => {
    const favoriteSongs = async () => {
      const index = (await getFavoriteSongs())
        .findIndex((favorite) => favorite.trackId === song.trackId);
      setIsFavorite(index >= 0);
      setLoading(false);
    };
    favoriteSongs();
  }, [song.trackId]);

  const handleFavoriteToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsFavorite(checked);
    updateFavoriteSongs(song.trackId);

    if (checked) {
      await addSong(song);
    } else {
      await removeSong(song);
    }
  };

  return (
    <div className="music-card">
      <h3>{song.trackName}</h3>
      <audio data-testid="audio-component" src={ song.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
        .
      </audio>
      <label
        htmlFor={ `checkbox-music-${song.trackId}` }
        data-testid={ `checkbox-music-${song.trackId}` }
      >
        <input
          type="checkbox"
          checked={ isFavorite }
          id={ `checkbox-music-${song.trackId}` }
          onChange={ handleFavoriteToggle }
        />
        { isFavorite ? (
          <img src="/src/images/checked_heart.png" alt="favorite" />
        ) : (
          <img src="/src/images/empty_heart.png" alt="favorite" />
        )}
      </label>
    </div>
  );
}

export default MusicCard;
