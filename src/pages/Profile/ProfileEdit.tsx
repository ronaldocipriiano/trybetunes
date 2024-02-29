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

  const handleInputChange = ({ target }:
  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div className="profile-edit-container">
      <form>
        {isPageLoading && <p style={ { display: 'none' } }>Editar perfil</p>}
        <img
          data-testid="profile-image"
          id="image"
          src={ user.image }
          alt=""
        />

        <label htmlFor="image">
          Foto
          <input
            data-testid="edit-input-image"
            type="text"
            id="image"
            value={ user.image }
            onChange={ handleInputChange }
            placeholder="URL da foto"
          />
        </label>

        <label htmlFor="name">
          Nome
          <input
            data-testid="edit-input-name"
            type="text"
            id="name"
            value={ user.name }
            onChange={ handleInputChange }
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            data-testid="edit-input-email"
            type="text"
            id="email"
            value={ user.email }
            onChange={ handleInputChange }
          />
        </label>

        <label htmlFor="description">
          Descrição
          <textarea
            data-testid="edit-input-description"
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
      </form>
    </div>
  );
}

export default ProfileEdit;
