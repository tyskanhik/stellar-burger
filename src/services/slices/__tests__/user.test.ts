import { RequestStatus, TUser } from '@utils-types';
import userSlice, {
  checkUserAuth,
  initialState,
  logoutUser,
  userLogin,
  userRerister,
  updateUser,
  userActions
} from '../user';

const mockUser = {
  email: 'test@example.com',
  name: 'testUser',
  password: '123'
};

describe('Тест slice user', () => {
  it('Статус userRerister pending', () => {
    const state = userSlice(initialState, userRerister.pending('', mockUser));
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  it('Статус userRerister success', () => {
    const state = userSlice(
      initialState,
      userRerister.fulfilled(mockUser, '', mockUser)
    );
    expect(state.requestStatus).toBe(RequestStatus.Success);
    expect(state.data).toEqual(mockUser);
  });

  it('Статус userRerister failed', () => {
    const state = userSlice(
      initialState,
      userRerister.rejected(new Error('Network error'), '', {
        ...mockUser,
        password: '123'
      })
    );
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });

  it('Статус userLogin panding', () => {
    const state = userSlice(initialState, userLogin.pending('', mockUser));
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  it('Статус userLogin success', () => {
    const state = userSlice(
      initialState,
      userLogin.fulfilled(mockUser, '', mockUser)
    );
    expect(state.requestStatus).toBe(RequestStatus.Success);
    expect(state.data).toBe(mockUser);
  });

  it('Статус userLogin failed', () => {
    const state = userSlice(
      initialState,
      userLogin.rejected(new Error('Network error'), '', {
        ...mockUser,
        password: '123'
      })
    );
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });

  it('Тест checkUserAuth panding', () => {
    const state = userSlice(initialState, checkUserAuth.pending(''));
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  it('Тест checkUserAuth success', () => {
    const state = userSlice(
      initialState,
      checkUserAuth.fulfilled(mockUser, '')
    );
    expect(state.requestStatus).toBe(RequestStatus.Success);
    expect(state.data).toBe(mockUser);
  });

  it('Тест checkUserAuth failed', () => {
    const state = userSlice(
      initialState,
      checkUserAuth.rejected(new Error('Network error'), '')
    );
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });

  it('Тест updateUser pending', () => {
    const state = userSlice(initialState, updateUser.pending('', mockUser));
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  it('Тест updateUser success', () => {
    const state = userSlice(
      initialState,
      updateUser.fulfilled(mockUser, '', mockUser)
    );
    expect(state.requestStatus).toBe(RequestStatus.Success);
    expect(state.data).toBe(mockUser);
  });

  it('Тест updateUser failed', () => {
    const state = userSlice(
      initialState,
      updateUser.rejected(new Error('Network error'), '', {
        ...mockUser,
        password: '123'
      })
    );
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });

  it('Тест logoutUser pending', () => {
    const state = userSlice(initialState, logoutUser.pending(''));
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  it('Тест logoutUser success', () => {
    const state = userSlice(
      initialState,
      logoutUser.fulfilled(console.log(''), '')
    );
    expect(state.requestStatus).toBe(RequestStatus.Success);
    expect(state.data).toBe(null);
  });

  it('Тест logoutUser failed', () => {
    const state = userSlice(
      initialState,
      logoutUser.rejected(new Error('Network error'), '')
    );
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });
});
