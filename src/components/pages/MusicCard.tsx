import React, { useState } from 'react';
import { SongType } from '../../types';

interface MusicCardProps {
  song: SongType;
}

function MusicCard({ song }: MusicCardProps) {
  const { trackName, previewUrl } = song;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <h3>{trackName}</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
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
