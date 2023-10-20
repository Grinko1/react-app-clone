import { memo, useState } from 'react';
import cls from './StarRating.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import StartIcon from '@/shared/assets/icons/star.svg';
import { Icon } from '../Icon/Icon';

interface StarRatingProps {
  className?: string;
  onSelect?: (starCount: number) => void;
  size?: number;
  selectedStars?: number;
}
const starts = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
  const { className, size = 30, selectedStars = 0, onSelect } = props;

  const [currentStarCount, setCurrentStarCount] = useState(selectedStars);
   const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

   const onHover = (starsCount:number) => () =>{
    if(!isSelected){
        setCurrentStarCount(starsCount)
    }
   }
   const onLeave = () => {
    if(!isSelected){
        setCurrentStarCount(0)
    }
   }

   const onClick = (starsCount:number) => () => {
    if(!isSelected){
      onSelect?.(starsCount)
      setCurrentStarCount(starsCount)
      setIsSelected(true)
    }
   }

  return (
    <div className={classNames(cls.StarRating, {}, [className])}>
      {starts.map((star) => (
        <Icon
          Svg={StartIcon}
          key={star}
          className={classNames(cls.starIcon, {[cls.selected] : isSelected}, [currentStarCount >= star ? cls.hovered : cls.normal])}
          width={size}
          height={size}
          onMouseLeave={onLeave}
          onMouseEnter={onHover(star)}
          onClick={onClick(star)}
        />
      ))}
    </div>
  );
});
