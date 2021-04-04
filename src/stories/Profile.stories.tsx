import Profile from '@components/Profile';

export default {
  title: 'Components/Profile',
  component: Profile,
  argTypes: {
        image: {
            control: {
                type: 'text',
            },
            defaultValue: 'http://www.mumfordwood.com/images/team/Ben-Greenwood.jpg',
        },
    }
}

const Template = (args) => <Profile {...args} />;
export const Playground = Template.bind({});
