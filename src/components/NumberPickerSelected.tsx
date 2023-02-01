interface NumberPickerSelectedProps {
    primaryNumbers: number[];
    primaryMax: number;
    secondaryNumbers: number[];
    secondaryMax: number;
}

const NumberPickerSelected = ({
    primaryNumbers=[],
    primaryMax,
    secondaryNumbers=[],
    secondaryMax
}: NumberPickerSelectedProps) => {

    const primaryNumbersFilled = new Array(primaryMax).fill(0);
    const secondaryNumbersFilled = new Array(secondaryMax).fill(0);
    const baseClass = 'rounded-full w-6 h-6 sm:w-8 sm:h-8 flex justify-center items-center text-xs sm:text-sm';

    return <div className='flex justify-center items-center gap-1' data-testid="selected-numbers">
        {primaryNumbersFilled.map((number, index) => {

            const isSelected = primaryNumbers[index] !== undefined;
            const className = `${baseClass} ${isSelected ? 'bg-deep-purple-500 text-white' : 'bg-white border-2 shadow-inner'}`;

            return <div key={index} className={className}>
                <span className="select-none" data-testid={`primary-${primaryNumbers[index]}`}>{primaryNumbers[index]}</span>
            </div>
        })}

        {secondaryNumbersFilled.map((number, index) => {

            const isSelected = secondaryNumbers[index] !== undefined;
            const className = `${baseClass} ${isSelected ? 'bg-gray-500 text-white' : 'bg-white border-2 shadow-inner'}`;

            return <div key={index} className={className}>
                <span className="select-none" data-testid={`secondary-${secondaryNumbers[index]}`}>{isSelected ? secondaryNumbers[index] : 'PB'}</span>
            </div>
        })}

    </div>
};

export default NumberPickerSelected;