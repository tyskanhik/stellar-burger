import { FC, useMemo } from 'react';
import { RequestStatus, TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState, useDispatch } from '../../services/store';
import { selectorUserData } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';
import {
  clearOrder,
  selectorOrderData,
  selectorOrderStatus,
  submitOrder
} from '../../services/slices/order';
import { clearStateBurgerConstructor } from '../../services/slices/burgerConstructor';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    (store: RootState) => store.burgerConstructor
  );

  const user = useSelector(selectorUserData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderRequest =
    useSelector(selectorOrderStatus) === RequestStatus.Loading;

  const orderModalData = useSelector(selectorOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const bunId = constructorItems.bun._id;
    const ingredientsId = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    const order = [bunId].concat(ingredientsId);
    dispatch(submitOrder(order));

    !user ? navigate('/login') : console.log('оформить заказ');
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
