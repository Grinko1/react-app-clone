import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import { Dropdown, ListBox } from '@/shared/ui/Popups';
import { Page } from '@/widgets/Page/Page';
import { Rating } from '@/entities/Rating';

const MainPage = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const onChange = (val: string) => {
    setValue(val);
  };

  const people = [
    { value: 'Durward Reynolds', content: 'Durward Reynolds', disabled: false },
    { value: 'Kenton Towne', content: 'Kenton Towne', disabled: false },
    { value: 'Therese Wunsch', content: 'Therese Wunsch', disabled: false },
    { value: 'Benedict Kessler', content: 'Benedict Kessler', disabled: true },
    { value: 'Katelyn Rohan', content: 'Katelyn Rohan', disabled: false },
  ];
  const items = [{
    disabled: false,
    content: 'first item',
    href: 'grfge',

  },
  {
    disabled: true,
    content: 'second item',

  },
  {
    disabled: false,
    content: 'third item',

  },
  ];

  return (
    <Page data-testid={'MainPage'}>
      {t('Главная страница')}
      <Rating title="Как вам статья?" feedbackTitle="Оставьте отзыв" hasFeedback />
      <div> </div>
      <ListBox items={people} value="Kenton Towne" onChange={(value:string) => {}} />
      <div />
      <Dropdown items={items} trigger={<Button>Dropdown</Button>} />
      <span>new text sjdfnwjefn</span>
      {/* <MyPopover  trigger={<Button>Open</Button>}/> */}
    </Page>
  );
};

export default MainPage;
