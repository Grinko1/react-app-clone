import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Button } from '../Button/Button';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'shared/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
    decorators: [
    (Story) => (
      <div style={{ padding: '100px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  trigger:<Button>Open</Button>,
  items:[
    {
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
};
Normal.decorators =[ StoreDecorator({})]

export const TopLeft = Template.bind({});
TopLeft.args = {
  trigger:<Button>Open</Button>,
  items: [
     {
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
  ],

  direction: 'top left',
};

export const TopRight = Template.bind({});
TopRight.args = {
  trigger:<Button>Open</Button>,
  items: [
    {
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
  ],
  direction: 'top right',
};
export const BottomLeft = Template.bind({});
BottomLeft.args = {
  trigger:<Button>Open</Button>,
  items: [
    {
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
  ],

  direction: 'bottom left',
};
export const BottomRight = Template.bind({});
BottomRight.args = {
  trigger:<Button>Open</Button>,
  items: [
    {
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
  ],

  direction: 'bottom right',
};
