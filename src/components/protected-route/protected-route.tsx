import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import {
  selectorAuthCheck,
  selectorUserData
} from '../../services/slices/user';
import { useAppSelector } from '../../services/hooks/hooks';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useAppSelector(selectorAuthCheck);
  const user = useAppSelector(selectorUserData);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        replace
        to='/login'
        state={{
          from: { ...location, locationState: location.state?.locationState }
        }}
      />
    );
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    const locationState = location.state?.from?.locationState || null;
    return <Navigate replace to={from} state={{ locationState }} />;
  }

  return children;
};
