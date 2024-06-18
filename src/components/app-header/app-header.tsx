import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectorUser } from '../../services/slices/user';

export const AppHeader: FC = () => {
  const user = useSelector(selectorUser);
  return <AppHeaderUI userName={user?.name} />;
};
