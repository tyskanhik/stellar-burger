import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { selectorIngredientsData } from '../../services/slices/ingredients';
import { useParams } from 'react-router-dom';
import { getOrder } from '../../services/slices/order';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';

export const OrderInfo: FC = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const orderData = useAppSelector((store) => store.order.orderInfo);

  useEffect(() => {
    dispatch(getOrder(Number(param.number)));
  }, [dispatch, Number(param.number)]);

  const ingredients: TIngredient[] = useAppSelector(selectorIngredientsData);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
