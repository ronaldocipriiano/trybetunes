import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import MusicCard from '../../components/MusicCard';
import './favorites.css';

function Favorites() {
  const [tracks, setTracks] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTracks(await getFavoriteSongs());
      setLoading(false);
    };
    fetchData();
  }, [selectedTrack]);

  const handleRemoveFavorite = (trackId: number) => {
    setSelectedTrack(trackId);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="favorites-page">
      <h1>Músicas Favoritas</h1>
      {tracks.map((track) => (
        <MusicCard
          key={ track.trackId }
          song={ track }
          updateFavoriteSongs={ () => handleRemoveFavorite(track.trackId) }
        />
      ))}
    </div>
  );
}

export default Favorites;
