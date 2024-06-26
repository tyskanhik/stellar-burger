import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addToBurgerConstructor } from '../../services/slices/burgerConstructor';
import { useAppDispatch } from '../../services/hooks/hooks';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleAdd = () => {
      const id: string = self.crypto.randomUUID();
      const ingredientPipe = { ...ingredient, id };
      dispatch(addToBurgerConstructor(ingredientPipe));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
