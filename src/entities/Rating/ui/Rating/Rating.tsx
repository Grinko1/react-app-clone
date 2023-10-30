import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { StarRating  } from '@/shared/ui/deprecated/StarRating/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import {
  Button as ButtonDeprecated,
  ButtonSize,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Drawer } from '@/shared/ui/redesigned/Drawer/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Input } from '@/shared/ui/redesigned/Input/Input';

interface RatingProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const Rating = memo((props: RatingProps) => {
  const { className, title, feedbackTitle, rate = 0, hasFeedback, onAccept, onCancel } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');
  const { t } = useTranslation();

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [onAccept, hasFeedback],
  );

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [starsCount, feedback, onAccept]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [starsCount, onCancel]);

  const modalContent = (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated placeholder={t('Ваш отзыв')} value={feedback} onChange={setFeedback} />
        </>
      }
      off={
        <>
          <Text title={feedbackTitle} />
          <Input placeholder={t('Ваш отзыв')} value={feedback} onChange={setFeedback} />
        </>
      }
    />
  );

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card className={className} max>
          <VStack align='center' gap='8' max>
            <Text title={starsCount ? t('Спасибо за оценку') : title} />
            <StarRating selectedStars={rate} size={40} onSelect={onSelectStars} />
          </VStack>
          <BrowserView>
            <Modal isOpen={isModalOpen} lazy>
              <VStack gap='32' max>
                {modalContent}
                <HStack max gap='16' justify='end'>
                  <Button variant='outline' onClick={cancelHandle}>
                    {t('Закрыть')}
                  </Button>
                  <Button onClick={acceptHandler}> {t('Отправить')}</Button>
                </HStack>
              </VStack>
            </Modal>
          </BrowserView>
          <MobileView>
            <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
              <VStack gap='32' max>
                {modalContent}
                <Button onClick={acceptHandler} fullWidth size={ButtonSize.L}>
                  {t('Отправить')}
                </Button>
              </VStack>
            </Drawer>
          </MobileView>
        </Card>
      }
      off={
        <CardDeprecated className={className} max>
          <VStack align='center' gap='8' max>
            <TextDeprecated title={starsCount ? t('Спасибо за оценку') : title} />
            <StarRating  selectedStars={rate} size={40} onSelect={onSelectStars} />
          </VStack>
          <BrowserView>
            <Modal isOpen={isModalOpen} lazy>
              <VStack gap='32' max>
                {modalContent}
                <HStack max gap='16' justify='end'>
                  <ButtonDeprecated theme={ButtonTheme.OUTLINE_RED} onClick={cancelHandle}>
                    {t('Закрыть')}
                  </ButtonDeprecated>
                  <ButtonDeprecated onClick={acceptHandler}> {t('Отправить')}</ButtonDeprecated>
                </HStack>
              </VStack>
            </Modal>
          </BrowserView>
          <MobileView>
            <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
              <VStack gap='32' max>
                {modalContent}
                <ButtonDeprecated onClick={acceptHandler} fullWidth size={ButtonSize.L}>
                  {t('Отправить')}
                </ButtonDeprecated>
              </VStack>
            </Drawer>
          </MobileView>
        </CardDeprecated>
      }
    />
  );
});
