import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../types';
import { getUser, updateUser } from '../../services/userAPI';

function ProfileEdit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
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
      setIsPageLoading(true);
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = target;
    setUser({ ...user, [id]: value });
    setButtonDisabled(!validateFields(user));
  };

  const validateFields = (prevUser: UserType) => {
    const { name, email, image, description } = prevUser;
    return !!(name && email && image && description);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await updateUser(user);
    setLoading(false);
    navigate(-1);
  };

  return (
    <div>
      { isPageLoading && <p style={ { display: 'none' } }>Editar perfil</p> }
      <img
        data-testid="profile-image"
        id="image"
        src={ user.image }
        alt=""
      />

      <label>
        <input
          data-testid="edit-input-image"
          type="text"
          id="image"
          value={ user.image }
          onChange={ handleInputChange }
        />
      </label>

      <label>
        Nome
        <input
          data-testid="edit-input-name"
          type="text"
          id="name"
          value={ user.name }
          onChange={ handleInputChange }
        />
      </label>

      <label>
        Email
        <input
          data-testid="edit-input-email"
          type="text"
          id="email"
          value={ user.email }
          onChange={ handleInputChange }
        />
      </label>

      <label>
        Descrição
        <input
          data-testid="edit-input-description"
          type="text"
          id="description"
          value={ user.description }
          onChange={ handleInputChange }
        />
      </label>

      <button
        data-testid="edit-button-save"
        disabled={ buttonDisabled }
        onClick={ handleSubmit }
      >
        Salvar
      </button>
    </div>
  );
}

export default ProfileEdit;
