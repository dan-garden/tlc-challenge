import { render, screen } from '@testing-library/react';
import NumberPicker from './NumberPicker';

jest.mock('../lib/api', () => ({
  getLatestResults: jest.fn().mockResolvedValue({
    DrawResults: [{
      PrimaryNumbers: [1, 2, 3, 4, 5],
      SecondaryNumbers: [6]
    }]
  })
}));

describe('NumberPicker', () => {

    const primaryCount = 5;
    const secondaryCount = 1;
    const primaryMax = 45;
    const secondaryMax = 20;

    const { getByTestId } = render(
        <NumberPicker
            primaryCount={primaryCount}
            secondaryCount={secondaryCount}
            primaryMax={primaryMax}
            secondaryMax={secondaryMax}
        />
    );

  it('should render primary and secondary number picker components', () => {

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

    // const autoFillButton = screen.getBy('autofill-button');
    // fireEvent.click(autoFillButton);

    // const primaryNumbers = await screen.findByText('1, 2, 3, 4, 5');
    // expect(primaryNumbers).toBeInTheDocument();

    // const secondaryNumbers = await screen.findByText('6');
    // expect(secondaryNumbers).toBeInTheDocument();
  });

//   it('should clear numbers when clear button is clicked', async () => {
//     const { getByTestId, queryByText } = render(
//       <NumberPicker
//         primaryCount={5}
//         secondaryCount={1}
//         primaryMax={45}
//         secondaryMax={20}
//       />
//     );

//     const autoFillButton = screen.getByTestId('auto-fill-button');
//     fireEvent.click(autoFillButton);

//     const clearButton = screen.getByTestId('clear-button');
//     fireEvent.click(clearButton);

//     const primaryNumbers = screen.queryByText('1, 2, 3, 4, 5');
//     expect(primaryNumbers).toBeNull();

//     const secondaryNumbers = screen.queryByText('6');
//     expect(secondaryNumbers).toBeNull();
//   });
});