import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  if (onlyUnAuth) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (onlyUnAuth) {
    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth) {
    // если пользователь на странице авторизации и данные есть в хранилище
    return <Navigate replace to='/' />;
  }

  return children;
};
