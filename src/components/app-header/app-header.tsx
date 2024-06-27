import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectorUserData } from '../../services/slices/user';

export const AppHeader: FC = () => {
  const user = useSelector(selectorUserData);
  return <AppHeaderUI userName={user?.name} />;
};
