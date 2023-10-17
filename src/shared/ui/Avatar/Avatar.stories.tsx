import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import AvatarImg from './storybook.jpg';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    size: 150,
    src: AvatarImg,
};
Primary.decorators =[ StoreDecorator({})]
export const Small = Template.bind({});
Small.args = {
    size: 50,
    src: AvatarImg,
};
