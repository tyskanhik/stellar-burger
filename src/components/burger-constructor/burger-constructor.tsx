import { FC, useMemo } from 'react';
import { RequestStatus, TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { selectorUserData } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';
import {
  clearOrder,
  selectorOrderData,
  selectorOrderStatus,
  submitOrder
} from '../../services/slices/order';
import { clearStateBurgerConstructor } from '../../services/slices/burgerConstructor';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';

export const BurgerConstructor: FC = () => {
  const constructorItems = useAppSelector((store) => store.burgerConstructor);

  const user = useAppSelector(selectorUserData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orderRequest =
    useAppSelector(selectorOrderStatus) === RequestStatus.Loading;

  const orderModalData = useAppSelector(selectorOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
    } else {
      const bunId = constructorItems.bun._id;
      const ingredientsId = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );
      const order = [bunId].concat(ingredientsId);
      dispatch(submitOrder(order));
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearStateBurgerConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
