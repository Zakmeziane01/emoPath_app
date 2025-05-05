import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { DataProvider, useData } from '../lib/data';

describe('Data Handling', () => {
  it('fetches and displays data', async () => {
    const { getByTestId, getByText } = render(
      <DataProvider>
        <DataScreen />
      </DataProvider>
    );

    await waitFor(() => {
      expect(getByText('Data loaded')).toBeTruthy();
    });
  });

  it('handles data creation', async () => {
    const { getByTestId, getByText } = render(
      <DataProvider>
        <CreateDataScreen />
      </DataProvider>
    );

    fireEvent.changeText(getByTestId('title-input'), 'New Item');
    fireEvent.changeText(getByTestId('content-input'), 'Test content');
    fireEvent.press(getByTestId('submit-button'));

    await waitFor(() => {
      expect(getByText('Data created successfully')).toBeTruthy();
    });
  });

  it('handles data update', async () => {
    const { getByTestId, getByText } = render(
      <DataProvider>
        <EditDataScreen />
      </DataProvider>
    );

    fireEvent.changeText(getByTestId('title-input'), 'Updated Title');
    fireEvent.press(getByTestId('update-button'));

    await waitFor(() => {
      expect(getByText('Data updated successfully')).toBeTruthy();
    });
  });

  it('handles data deletion', async () => {
    const { getByTestId, getByText } = render(
      <DataProvider>
        <DeleteDataScreen />
      </DataProvider>
    );

    fireEvent.press(getByTestId('delete-button'));

    await waitFor(() => {
      expect(getByText('Data deleted successfully')).toBeTruthy();
    });
  });

  it('handles data error states', async () => {
    const { getByTestId, getByText } = render(
      <DataProvider>
        <DataScreen />
      </DataProvider>
    );

    // Simulate network error
    fireEvent.press(getByTestId('refresh-button'));

    await waitFor(() => {
      expect(getByText('Error loading data')).toBeTruthy();
    });
  });
}); 