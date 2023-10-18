import { ReactNode, memo } from 'react';
import cls from './Drawer.module.scss';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import { useModal } from 'shared/lib/hooks/useModal/useModal';

interface DrawerProps {
    className?: string;
    children:ReactNode
    isOpen?:boolean
    onClose:()=>void
}

export const Drawer = memo((props: DrawerProps) => {
    const { className, children, isOpen, onClose } = props
    const {theme} = useTheme()
   
      const { isClosing, isMounted, close } = useModal({
    onClose,
    isOpen,
    animationDelay: 300,
  });
   const mods:Mods = {
        [cls.opened] : isOpen,
         [cls.isClosing]: isClosing,
    }
  return (
    <Portal>
    <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
    <Overlay onClick={close}/>
    <div className={cls.content}>
        {children}
    </div>
    </div>
    </Portal>
  );
});