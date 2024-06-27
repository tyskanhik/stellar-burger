import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks/hooks';

export const IngredientDetails: FC = () => {
  const ingredients = useAppSelector((state) => state.ingredients.data);
  const params = useParams();

  const ingredientData = ingredients?.find(
    (item: TIngredient) => item._id === params.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
