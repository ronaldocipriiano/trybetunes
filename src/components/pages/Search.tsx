import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';

function Search() {
  const [artistName, setArtistName] = useState('');
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(event.target.value);
  };

  const handleSearch = () => {
    setLoading(true);

    searchAlbumsAPI(artistName)
      .then((response) => {
        setAlbums(response);
      })
      .finally(() => {
        setLoading(false);
        setArtistName('');
      });
  };

  const handleAlbumClick = (albumId: string) => {
    navigate(`/album/${albumId}`);
  };

  const isButtonDisabled = artistName.length < 2;

  return (
    <div>
      <label htmlFor="artistInput">
        Pesquisar Artista:
        <input
          type="text"
          value={ artistName }
          id="artistInput"
          onChange={ handleInputChange }
          data-testid="search-artist-input"
        />
      </label>
      <button
        type="button"
        disabled={ isButtonDisabled || loading }
        onClick={ handleSearch }
        data-testid="search-artist-button"
      >
        Pesquisar
      </button>
      {loading && <p>Carregando...</p>}
      {albums.length > 0 ? (
        <div>
          <p>
            Resultado de álbuns de:
            {artistName}
          </p>
          <ul>
            {albums.map((album) => (
              <li key={ album.collectionId }>
                <a
                  href={ `/album/${album.collectionId}` }
                  onClick={ () => handleAlbumClick(album.collectionId.toString()) }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  {album.collectionName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{loading ? 'Carregando...' : 'Nenhum álbum foi encontrado.'}</p>
      )}
    </div>
  );
}

export default Search;
