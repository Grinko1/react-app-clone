import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Dropdown } from 'shared/ui/Popups/components/Dropdown/Dropdown';
import { Input } from 'shared/ui/Input/Input';
import { ListBox } from 'shared/ui/Popups/components/ListBox/ListBox';
import { Page } from 'widgets/Page/Page';


const MainPage = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const onChange = (val: string) => {
    setValue(val);
  };

  const people = [
    { value: 'Durward Reynolds',content: 'Durward Reynolds', disabled: false },
    { value: 'Kenton Towne', content: 'Kenton Towne', disabled: false },
    { value: 'Therese Wunsch',content: 'Therese Wunsch', disabled: false },
    { value: 'Benedict Kessler',content: 'Benedict Kessler', disabled: true },
    { value: 'Katelyn Rohan',content: 'Katelyn Rohan', disabled: false },
  ];
  const items =   [  {
      disabled:false,
      content:'first item',

    },
    {
      disabled:true,
      content:'second item',

    },
      {
      disabled:false,
      content:'third item',

    },
  ]

  return (
    <Page>
      {t('Главная страница')}
      <div> </div>
      <ListBox items={people} value='Kenton Towne' onChange={(value:string)=>{}} />
      <div></div>
      <Dropdown items={items} trigger={<Button>Dropdown</Button>}/>
      <span>new text sjdfnwjefn</span>
      {/* <MyPopover  trigger={<Button>Open</Button>}/> */}
    </Page>
  );
};

export default MainPage;
