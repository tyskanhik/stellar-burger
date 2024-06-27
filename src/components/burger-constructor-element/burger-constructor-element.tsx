import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  deliteIngredient,
  swapIngredient
} from '../../services/slices/burgerConstructor';
import { useAppDispatch } from '../../services/hooks/hooks';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();
    const handleMoveDown = () => {
      dispatch(swapIngredient({ index, direction: 'down' }));
    };

    const handleMoveUp = () => {
      dispatch(swapIngredient({ index, direction: 'up' }));
    };

    const handleClose = () => {
      dispatch(deliteIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
