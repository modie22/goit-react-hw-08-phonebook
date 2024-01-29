import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks';
import { logOut } from '../../redux/auth/authOperations';
import { MdOutlineLogout } from 'react-icons/md';
import { UserContainer, User, Btn } from './UserMenu.styled';

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();


  const handleLogOut = () => dispatch(logOut());

  return (
    <UserContainer>
      <User>{user.email}</User>
      <Btn type="button" onClick={handleLogOut}>
        <MdOutlineLogout />
        Logout
      </Btn>
    </UserContainer>
  );
};

export default UserMenu;
