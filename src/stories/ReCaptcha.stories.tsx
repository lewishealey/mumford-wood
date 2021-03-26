import ReCaptcha from '@components/ReCaptcha';

export default {
  title: 'Components/ReCaptcha',
  component: ReCaptcha,
}

const Template = (args) => <ReCaptcha {...args} />;
export const Playground = Template.bind({});
