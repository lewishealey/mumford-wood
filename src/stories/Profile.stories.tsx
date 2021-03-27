import Profile from '@components/Profile';

export default {
  title: 'Components/Profile',
  component: Profile,
}

const Template = (args) => <Profile {...args} />;
export const Playground = Template.bind({});
