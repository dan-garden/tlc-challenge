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
    const baseClass = 'rounded-full w-8 h-8 flex justify-center items-center text-sm';

    return <div className='flex justify-center items-center gap-1'>
        {primaryNumbersFilled.map((number, index) => {

            const isSelected = primaryNumbers[index] !== undefined;
            const className = `${baseClass} ${isSelected ? 'bg-deep-purple-500 text-white' : 'bg-white border-2 shadow-inner'}`;

            return <div key={index} className={className}>
                <span>{primaryNumbers[index]}</span>
            </div>
        })}

        {secondaryNumbersFilled.map((number, index) => {

            const isSelected = secondaryNumbers[index] !== undefined;
            const className = `${baseClass} ${isSelected ? 'bg-gray-500 text-white' : 'bg-white border-2 shadow-inner'}`;

            return <div key={index} className={className}>
                <span className="select-none">{isSelected ? secondaryNumbers[index] : 'PB'}</span>
            </div>
        })}

    </div>
};

export default NumberPickerSelected;