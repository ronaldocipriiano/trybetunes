import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import './search.css';

function Search() {
  const [artistName, setArtistName] = useState('');
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [searchResult, setSearchResult] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(event.target.value);
  };

  const handleSearch = () => {
    setLoading(true);

    searchAlbumsAPI(artistName)
      .then((response) => {
        setAlbums(response);
        setArtistName('');
        setSearchResult(`Resultado de álbuns de: ${artistName}`);
        setSearchPerformed(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAlbumClick = (albumId: string) => {
    navigate(`/album/${albumId}`);
  };

  const isButtonDisabled = artistName.length < 2;

  return (
    <div className="search-page">
      <div className="container-search">
        <input
          type="text"
          value={ artistName }
          id="artistInput"
          onChange={ handleInputChange }
          data-testid="search-artist-input"
          placeholder="Nome do artista ou banda"
        />
        <button
          type="button"
          disabled={ isButtonDisabled || loading }
          onClick={ handleSearch }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </div>
      <div className="search-results">
        {loading && (
          <div className="loading-container">
            <div className="loading-content">
              <FontAwesomeIcon icon={ faSpinner } spin />
              <p className="loading-text">Carregando...</p>
            </div>
          </div>
        )}
        {searchPerformed && albums.length === 0 && (
          <div className="not-found-container">
            <p className="not-found-text">Nenhum álbum foi encontrado.</p>
          </div>
        )}
        {searchPerformed && albums.length > 0 && (
          <p className="response-search">{searchResult }</p>
        )}
        {albums.length > 0 && (
          <div className="album-grid">
            {albums.map((album) => (
              <div key={ album.collectionId } className="album-card">
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <h3>{album.collectionName}</h3>
                <p>{album.artistName}</p>
                <button
                  onClick={ () => handleAlbumClick(album.collectionId.toString()) }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
