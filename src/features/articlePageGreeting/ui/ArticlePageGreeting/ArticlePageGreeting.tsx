import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { useJsonSettings } from '@/entities/User/model/selectors/getJsonSettings/getJsonSettings';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { isMobile } from 'react-device-detect';
import { Drawer } from '@/shared/ui/redesigned/Drawer/Drawer';

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isArticlesPageWasOpen } = useJsonSettings();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isArticlesPageWasOpen) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlesPageWasOpen: true }));
    }
  }, [dispatch, isArticlesPageWasOpen]);
  const onClose = () => setIsOpen(false);

  const text = (
    <Text
      title={t('Добро пожаловать на страницу статей')}
      text={t('Здесь вы можете искать и просматривать статьи на различный темы')}
    />
  );
  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} lazy onClose={onClose}>
        {text}
      </Drawer>
    );
  }
  return (
    <Modal isOpen={isOpen} lazy onClose={onClose}>
      {text}
    </Modal>
  );
});
