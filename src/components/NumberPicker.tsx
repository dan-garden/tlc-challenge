import { useState } from 'react';
import { getLatestResults } from '../lib/api';

import NumberPickerHeader from './NumberPickerHeader';
import NumberPickerSelector from './NumberPickerSelector';

interface NumberPickerProps {
    primaryCount: number;
    secondaryCount: number;
    primaryMax: number;
    secondaryMax: number;
}

const NumberPicker = ({
    primaryCount,
    secondaryCount,
    primaryMax,
    secondaryMax
}: NumberPickerProps) => {

    const [primaryNumbers, setPrimaryNumbers] = useState<number[]>([]);
    const [secondaryNumbers, setSecondaryNumbers] = useState<number[]>([]);
    const [loadingAutoFill, setLoadingAutoFill] = useState<boolean>(false);

    const handleAutoFill = async () => {

        setLoadingAutoFill(true);

        const results = await getLatestResults({
            CompanyId: 'GoldenCasket',
            MaxDrawCountPerProduct: 1,
            OptionalProductFilter: ['Powerball']
        });

        const { PrimaryNumbers, SecondaryNumbers } = results.DrawResults[0];

        setLoadingAutoFill(false);
        setPrimaryNumbers(PrimaryNumbers);
        setSecondaryNumbers(SecondaryNumbers);
  };

  const handleClear = () => {
    setPrimaryNumbers([]);
    setSecondaryNumbers([]);
  };

  return (
    <div className='w-full'>
        <div className="mb-5">
            <NumberPickerHeader
                primaryNumbers={primaryNumbers}
                primaryMax={primaryMax}
                secondaryNumbers={secondaryNumbers}
                secondaryMax={secondaryMax}
                handleAutoFill={handleAutoFill}
                loadingAutoFill={loadingAutoFill}
                handleClear={handleClear}
            />
        </div>
        <NumberPickerSelector
            id="primary-number-picker"
            count={primaryCount}
            max={primaryMax}
            value={primaryNumbers}
            onChange={numbers => setPrimaryNumbers(numbers)}
        />
        <div className='bg-gray-500 text-white w-full p-2 text-center text-xs uppercase'>
            Select your powerball
        </div>
        <NumberPickerSelector
            id="secondary-number-picker"
            count={secondaryCount}
            max={secondaryMax}
            value={secondaryNumbers}
            onChange={numbers => setSecondaryNumbers(numbers)}
        />
    </div>
  );
};

export default NumberPicker;