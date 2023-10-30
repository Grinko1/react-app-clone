import { ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Portal } from '@/shared/ui/redesigned/Portal/Portal';
import { useTheme } from '@/app/providers/ThemeProvider';
import cls from './Modal.module.scss';
import { Overlay } from '../Overlay/Overlay';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { toggleFeatures } from '@/shared/lib/features';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, lazy } = props;
  const { theme } = useTheme();

  const { isClosing, isMounted, close } = useModal({
    onClose,
    isOpen,
    animationDelay: ANIMATION_DELAY,
  });

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(cls.Modal, mods, [
          className,
          theme,
          'app_modal',
          toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.modalOld,
            off: () => cls.modalNew,
          }),
        ])}>
        <Overlay onClick={close} className={cls.overlay} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
