import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserType } from '../../types';
import { getUser } from '../../services/userAPI';

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
    <div>
      <img
        data-testid="profile-image"
        id="image"
        src={ user.image }
        alt=""
      />
      <div>
        <h1 data-testid="profile-name">{ user.name }</h1>
        <p data-testid="profile-email">{ user.email }</p>
        <p data-testid="profile-description">{ user.description }</p>
      </div>
      <Link to="/profile/edit">Editar perfil</Link>
    </div>
  );
}

export default Profile;
