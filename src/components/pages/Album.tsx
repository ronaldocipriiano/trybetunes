import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import MusicCard from './MusicCard';
import { AlbumType, SongType } from '../../types';

function Album() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [musics, setMusics] = useState<SongType[]>([]);

  useEffect(() => {
    if (id) {
      getMusics(id)
        .then((response: any[]) => {
          const [albumData, ...songs] = response;
          setAlbum(albumData);
          setMusics(songs);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      {album && (
        <div>
          <h2 data-testid="artist-name">{ album.artistName }</h2>
          <h1 data-testid="album-name">
            { album.collectionName }
          </h1>
        </div>
      )}
      {musics.length > 0 ? (
        <div>
          {musics.map((music) => (
            <MusicCard key={ music.trackId } song={ music } />
          ))}
        </div>
      ) : (
        <p>Nenhuma música encontrada.</p>
      )}
    </div>
  );
}

export default Album;
