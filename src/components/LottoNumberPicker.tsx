import React, { useState } from 'react';
import { getLatestResults } from '../lib/api';
import { IconButton, Tooltip, Input } from "@material-tailwind/react";
import { BsLightningChargeFill, BsTrashFill } from "react-icons/bs";
import { AiOutlineLoading } from "react-icons/ai";

interface NumberPickerHeaderProps {
    primaryNumbers: number[];
    secondaryNumbers: number[];
    handleAutoFill: () => void;
    loadingAutoFill: boolean;
    handleClear: () => void;
}

const NumberPickerHeader = ({
    primaryNumbers,
    secondaryNumbers,
    handleAutoFill,
    loadingAutoFill,
    handleClear
}: NumberPickerHeaderProps) => {
    return <div className='flex flex-row justify-between'>
        <div>
            1
        </div>
        <div className='grid grid-cols-8 gap-1'>
            {primaryNumbers.map(num => <Input variant="outlined" label={`${num}`} />)}
            {secondaryNumbers.map(num => <Input variant="outlined" label={`${num}`}/>)}
        </div>
        <div className='grid gap-3 grid-cols-2'>
            <Tooltip content="Autofill" placement="top-end">
                <IconButton
                    color="deep-purple"
                    size="sm"
                    onClick={handleAutoFill}
                    disabled={loadingAutoFill}
                >
                    {loadingAutoFill ? <AiOutlineLoading className='animate-spin'/> : <BsLightningChargeFill /> }
                </IconButton>
            </Tooltip>
            <Tooltip content="Clear" placement="top-end">
                <IconButton
                    color="gray"
                    size="sm"
                    onClick={handleClear}
                    disabled={primaryNumbers.length === 0 && secondaryNumbers.length === 0}
                >
                    <BsTrashFill />
                </IconButton>
            </Tooltip>
        </div>
    
    </div>
};

const LottoNumberPicker: React.FC = () => {

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
    <div className='border max-w-xl mx-auto p-3 shadow-md rounded-md'>
        <NumberPickerHeader
            primaryNumbers={primaryNumbers}
            secondaryNumbers={secondaryNumbers}
            handleAutoFill={handleAutoFill}
            loadingAutoFill={loadingAutoFill}
            handleClear={handleClear}
        />

    </div>
  );
};

export default LottoNumberPicker;