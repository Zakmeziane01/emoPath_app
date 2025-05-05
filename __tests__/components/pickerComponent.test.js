import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PickerComponent from '../../components/pickerComponent';

describe('PickerComponent', () => {
  const items = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ];

  it('renders correctly with items', () => {
    const { getByTestId } = render(
      <PickerComponent items={items} />
    );
    expect(getByTestId('picker')).toBeTruthy();
  });

  it('handles selection change', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <PickerComponent 
        items={items} 
        onValueChange={onValueChange}
      />
    );
    fireEvent(getByTestId('picker'), 'onValueChange', '1');
    expect(onValueChange).toHaveBeenCalledWith('1');
  });

  it('shows placeholder', () => {
    const { getByText } = render(
      <PickerComponent 
        items={items} 
        placeholder="Select an option"
      />
    );
    expect(getByText('Select an option')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'gray' };
    const { getByTestId } = render(
      <PickerComponent 
        items={items} 
        style={customStyle}
      />
    );
    const picker = getByTestId('picker');
    expect(picker.props.style).toContainEqual(customStyle);
  });
}); 