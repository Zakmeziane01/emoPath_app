import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

describe('Navigation', () => {
  it('navigates between screens', async () => {
    const Stack = createStackNavigator();
    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    fireEvent.press(getByText('Go to Profile'));
    await waitFor(() => {
      expect(getByText('Profile Screen')).toBeTruthy();
    });
  });

  it('passes params between screens', async () => {
    const Stack = createStackNavigator();
    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    fireEvent.press(getByText('View Details'));
    await waitFor(() => {
      expect(getByText('Item Details')).toBeTruthy();
    });
  });
}); 