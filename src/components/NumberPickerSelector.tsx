import { ImCross } from 'react-icons/im';

interface NumberPickerSelectorProps {
    id: string;
    max: number;
    count: number;
    value: number[];
    onChange: (numbers: number[]) => void;
}

const NumberPickerSelector = ({
    id,
    max,
    count,
    value,
    onChange
}: NumberPickerSelectorProps) => {

    const numbers = new Array(count).fill(0).map((number, index) => index + 1);
    const isMax = value.length === max;

    const handleSelect = (number: number) => {
        const index = value.indexOf(number);
        if (index === -1) {
            if (value.length < max) {
                onChange([...value, number]);
            }
        } else {
            const newValue = [...value];
            newValue.splice(index, 1);
            onChange(newValue);
        }
    };

    return <div className='grid grid-cols-10 gap-1' id={id} data-testid={id}>
        {numbers.map(number => {

            const isSelected = value.indexOf(number) !== -1;
            const selectedClass = isSelected ? 'bg-deep-purple-50 cursor-pointer' : `${!isMax ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-not-allowed'}`;
            const className = `rounded-md flex justify-center text-deep-purple-800 items-center p-2 text-sm relative ${selectedClass}`;

            return <div key={number} className={className} onClick={() => handleSelect(number)}>
                {isSelected && <div className='absolute top-0 left-0 w-full h-full z-0 flex justify-center items-center'>
                    <ImCross className='text-deep-purple-100 text-3xl opacity-50' />
                </div>}
                <span className='z-10 font-medium select-none'>{number}</span>
            </div>
        })}
    </div>
};

export default NumberPickerSelector;