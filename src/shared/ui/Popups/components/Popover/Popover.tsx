import { Popover as HPopover  } from '@headlessui/react';
import { ReactNode } from 'react';
import { DropDownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import cls from './Popover.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface MyPopoverProps {
  className?: string;
  children:ReactNode;
  trigger: ReactNode;
  direction?: DropDownDirection;
}
export function Popover(props: MyPopoverProps) {
  const { className, children,trigger, direction = 'bottom right' } = props;
  const optionClasses = [mapDirectionClass[direction]];
  return (
    <HPopover className={popupCls.popup}>
      <HPopover.Button as='div' className={popupCls.trigger}>{trigger}</HPopover.Button>

      <HPopover.Panel className={classNames(cls.menu, {}, optionClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
}
