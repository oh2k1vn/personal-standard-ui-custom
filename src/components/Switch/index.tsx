import React, { useState, useEffect, ForwardedRef, InputHTMLAttributes } from 'react';
import { cn } from '../../main';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: 'small' | 'medium' | 'large';
}

const Switch = React.forwardRef((props: SwitchProps, forwardedRef: ForwardedRef<HTMLInputElement>) => {
    const { size = 'medium', ...rest } = props;
    const [checked, setChecked] = useState(props.checked || false);

    useEffect(() => {
        if (props.checked !== undefined) {
            setChecked(props.checked);
        }
    }, [props.checked]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (props.onChange) {
            props.onChange(event);
        }
    };


    return (
        <label className={cn('inline-flex rounded-full transition-all duration-500 cursor-pointer', {
            'bg-gray-300': !checked,
            'bg-primary': checked,
            'h-6 w-10': size == 'small',
            'h-7 w-12': size == 'medium',
            'h-8 w-14': size == 'large'
        })}>
            <input
                ref={forwardedRef}
                {...rest}
                type="checkbox"
                className='hidden'
                checked={checked}
                onChange={handleChange}
            />
            <span className={cn('rounded-full transition-all duration-500 border-2 bg-white text-black', {
                'border-gray-300 translate-x-0': !checked,
                'border-primary': checked,
                'size-6': size == 'small',
                'size-7': size == 'medium',
                'size-8': size == 'large',
                'translate-x-4': size == 'small' && checked,
                'translate-x-5': size == 'medium' && checked,
                'translate-x-6': size == 'large' && checked
            })}></span>
        </label>
    );
});

export default Switch;
