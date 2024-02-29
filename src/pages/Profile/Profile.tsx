import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import './profile.css';

function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setUser(await getUser());
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-info">
        <img data-testid="profile-image" src={ user.image } alt="" />
        <h1 data-testid="profile-name">{user.name}</h1>
        <div className="profile-details">
          <div className="profile-detail">
            <p className="detail-label">Email:</p>
            <p className="detail-value">{user.email || 'N/A'}</p>
          </div>
          <div className="profile-detail">
            <p className="detail-label">Descrição:</p>
            <p className="detail-value profile-detail-description">
              {user.description || 'N/A'}
            </p>
          </div>
        </div>
        <Link to="/profile/edit" className="edit-profile-button">
          Editar perfil
        </Link>
      </div>
    </div>
  );
}

export default Profile;
