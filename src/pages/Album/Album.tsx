import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../../components/MusicCard';
import { AlbumType, SongType } from '../../types';
import './album.css';

function Album() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [musics, setMusics] = useState<SongType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const [albumData, ...songs] = await getMusics(id);
          setAlbum(albumData);
          setMusics(songs);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="album-page">
      <div className="album-info">
        {album && (
          <>
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <h1 data-testid="album-name">{album.collectionName}</h1>
            <h2 data-testid="artist-name">{album.artistName}</h2>
          </>
        )}
      </div>
      <div className="album-musics">
        {musics.length > 0 ? (
          musics.map((music) => (
            <MusicCard key={ music.trackId } song={ music } />
          ))
        ) : (
          <p>Nenhuma música encontrada.</p>
        )}
      </div>
    </div>
  );
}

export default Album;
