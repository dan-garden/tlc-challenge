import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NumberPicker from './NumberPicker';

const mockPrimaryNumbers = [1, 2, 3, 4, 5];
const mockSecondaryNumbers = [6];

jest.mock('../lib/api', () => ({
    getLatestResults: () => {
      return Promise.resolve({
        DrawResults: [
          {
            PrimaryNumbers: mockPrimaryNumbers,
            SecondaryNumbers: mockSecondaryNumbers
          }
        ]
      });
    }
}));

describe('NumberPicker', () => {

    const primaryCount = 5;
    const secondaryCount = 1;
    const primaryMax = 45;
    const secondaryMax = 20;


  it('should render primary and secondary number picker components', () => {

    render(
      <NumberPicker
          primaryCount={primaryCount}
          secondaryCount={secondaryCount}
          primaryMax={primaryMax}
          secondaryMax={secondaryMax}
      />
  );

    const primaryNumberPicker = screen.getByTestId('primary-number-picker');
    const secondaryNumberPicker = screen.getByTestId('secondary-number-picker');

    // Check that the primary number picker is rendered
    expect(primaryNumberPicker).toBeInTheDocument();

    // Check that the primary number picker has the correct number of numbers
    new Array(primaryCount).fill(0).forEach((_, index) => {
        const number = index + 1;
        expect(primaryNumberPicker).toHaveTextContent(number.toString());
    });

    // Check that the secondary number picker is rendered
    expect(secondaryNumberPicker).toBeInTheDocument();

    // Check that the secondary number picker has the correct number of numbers
    new Array(secondaryCount).fill(0).forEach((_, index) => {
        const number = index + 1;
        expect(secondaryNumberPicker).toHaveTextContent(number.toString());
    });
  });

  it('should auto-fill numbers when auto-fill button is clicked', async () => {

    render(
      <NumberPicker
          primaryCount={primaryCount}
          secondaryCount={secondaryCount}
          primaryMax={primaryMax}
          secondaryMax={secondaryMax}
      />
  );
    
    // Click the auto-fill button
    const autoFillButton = screen.getByTestId('auto-fill-button');
    fireEvent.click(autoFillButton);

    // Wait for the auto-fill to complete
    await waitFor(() => {
        expect(autoFillButton).not.toBeDisabled();

        const selectedNumbers = screen.getByTestId('selected-numbers');

        // Check for primary numbers
        mockPrimaryNumbers.forEach((number) => {
            expect(selectedNumbers).toHaveTextContent(number.toString());
        });

        // Check for secondary numbers
        mockSecondaryNumbers.forEach((number) => {
            expect(selectedNumbers).toHaveTextContent(number.toString());
        });
    });
  });

  it('should clear numbers when clear button is clicked', async () => {

    render(
      <NumberPicker
          primaryCount={primaryCount}
          secondaryCount={secondaryCount}
          primaryMax={primaryMax}
          secondaryMax={secondaryMax}
      />
    );

      // Click first number in primary number picker
      fireEvent.click(screen.getByTestId('primary-number-picker-1'));

      // Check that the number is selected
      await waitFor(() => {
          expect(screen.getByTestId('selected-numbers')).toHaveTextContent('1');
      });

      // Click the clear button
      fireEvent.click(screen.getByTestId('clear-button'));

      // Check that the number is no longer selected
      await waitFor(() => {
          expect(screen.getByTestId('selected-numbers')).not.toHaveTextContent('1');;
      });

  });

});