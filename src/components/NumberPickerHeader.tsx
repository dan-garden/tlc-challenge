import { IconButton } from "@material-tailwind/react";
import { AiOutlineLoading } from "react-icons/ai";
import { BsLightningChargeFill, BsTrashFill } from "react-icons/bs";

import NumberPickerSelected from './NumberPickerSelected';

interface NumberPickerHeaderProps {
    primaryNumbers: number[];
    primaryMax: number;
    secondaryNumbers: number[];
    secondaryMax: number;
    handleAutoFill: () => void;
    loadingAutoFill: boolean;
    handleClear: () => void;
}

const NumberPickerHeader = ({
    primaryNumbers,
    primaryMax,
    secondaryNumbers,
    secondaryMax,
    handleAutoFill,
    loadingAutoFill,
    handleClear
}: NumberPickerHeaderProps) => {
    return <div className='flex flex-row justify-between items-center'>
        <div className="hidden sm:block">1</div>
        <div>
            <NumberPickerSelected
                primaryNumbers={primaryNumbers}
                primaryMax={primaryMax}
                secondaryNumbers={secondaryNumbers}
                secondaryMax={secondaryMax}
            />
        </div>
        <div className='flex justify-end sm:grid gap-1 sm:grid-cols-2'>
            {/* <Tooltip content="Autofill with previous weeks results" placement="bottom-start" open={false}> */}
                <IconButton
                    data-testid="autofill-button"
                    color="deep-purple"
                    size="sm"
                    aria-label="Autofill with previous weeks results"
                    onClick={handleAutoFill}
                    disabled={loadingAutoFill}
                >
                    {loadingAutoFill ? <AiOutlineLoading className='animate-spin'/> : <BsLightningChargeFill /> }
                </IconButton>
            {/* </Tooltip> */}
            {/* <Tooltip content="Clear all selected numbers" placement="bottom-start" open={false}> */}
                <IconButton
                    title="Clear all selected numbers"
                    color="gray"
                    size="sm"
                    onClick={handleClear}
                    disabled={primaryNumbers.length === 0 && secondaryNumbers.length === 0}
                >
                    <BsTrashFill />
                </IconButton>
            {/* </Tooltip> */}
        </div>
    
    </div>
};

export default NumberPickerHeader;