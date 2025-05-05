import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../lib/auth';

describe('Authentication', () => {
  it('handles successful login', async () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );

    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(getByText('Welcome')).toBeTruthy();
    });
  });

  it('handles login error', async () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );

    fireEvent.changeText(getByTestId('email-input'), 'wrong@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'wrongpass');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(getByText('Invalid credentials')).toBeTruthy();
    });
  });

  it('handles successful registration', async () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <RegisterScreen />
      </AuthProvider>
    );

    fireEvent.changeText(getByTestId('name-input'), 'Test User');
    fireEvent.changeText(getByTestId('email-input'), 'new@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.press(getByTestId('register-button'));

    await waitFor(() => {
      expect(getByText('Registration successful')).toBeTruthy();
    });
  });

  it('handles logout', async () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <ProfileScreen />
      </AuthProvider>
    );

    fireEvent.press(getByTestId('logout-button'));

    await waitFor(() => {
      expect(getByText('Login')).toBeTruthy();
    });
  });
}); 