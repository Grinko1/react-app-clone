import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import cls from './ListBox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../../../Button/Button';
import { DropDownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

export interface listBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}
interface ListBoxProps {
  items?: listBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: <T extends string>(value: T) => void;
  readonly?: boolean;
  direction?: DropDownDirection;
}

export function ListBox(props: ListBoxProps) {
  const {
    items,
    className,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom right',
  } = props;

  const optionClasses = [mapDirectionClass[direction]];

  return (
    <HListBox
      value={value}
      onChange={onChange}
      as="div"
      className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
      disabled={readonly}
    >
      <HListBox.Button className={popupCls.trigger} as="div">
        <Button disabled={readonly}>{value ?? defaultValue}</Button>
      </HListBox.Button>
      <HListBox.Options className={classNames(cls.options, {}, optionClasses)}>
        {items?.map((item) => (
          <HListBox.Option
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            as={Fragment}
          >
            {({ active, selected }) => (
              <li
                className={classNames(cls.item, {
                  [popupCls.active]: active,
                  [popupCls.selected]: selected,
                  [popupCls.disabled]: item.disabled,
                })}
              >
                {item.content}
              </li>
            )}
          </HListBox.Option>
        ))}
      </HListBox.Options>
    </HListBox>
  );
}
