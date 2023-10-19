import { Checkbox } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
};

const plainOptions = ['Apple', 'Pear', 'Orange'];

const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
];

const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: false },
];

interface IProps {

}
const FilterOption = () => {
    return (
        <div className=''>
            <div className='text-text-primary border-stroke-disable flex items-center border-b px-4 pt-3 pb-2'>
                <span>
                    <svg viewBox="0 0 24 24" height={20} fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 16H14C14.5523 16 15 16.4477 15 17C15 17.5128 14.614 17.9355 14.1166 17.9933L14 18H10C9.44772 18 9 17.5523 9 17C9 16.4872 9.38604 16.0645 9.88338 16.0067L10 16H14H10ZM8 11H16C16.5523 11 17 11.4477 17 12C17 12.5128 16.614 12.9355 16.1166 12.9933L16 13H8C7.44772 13 7 12.5523 7 12C7 11.4872 7.38604 11.0645 7.88338 11.0067L8 11H16H8ZM5 6H19C19.5523 6 20 6.44772 20 7C20 7.51284 19.614 7.93551 19.1166 7.99327L19 8H5C4.44772 8 4 7.55228 4 7C4 6.48716 4.38604 6.06449 4.88338 6.00673L5 6H19H5Z" fill="currentColor"></path></svg>
                </span>
                <h3 className="text-base font-medium">Bộ lọc nâng cao</h3>
            </div>
            <div className='sm-scrollbar max-h-[calc(100vmin-45px-2*12px-16px)] overflow-auto px-4 [&>:last-child]:pb-0'>
                <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
                <br />
                <br />
                <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
                <br />
                <br />
                <Checkbox.Group
                    options={optionsWithDisabled}
                    disabled
                    defaultValue={['Apple']}
                    onChange={onChange}
                />
            </div>

        </div>
    )
}

export default FilterOption