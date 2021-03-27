import Slideshow from '@components/Slideshow';

export default {
  title: 'Components/Slideshow',
  component: Slideshow,
}

const Template = (args) => <Slideshow {...args} />;
export const Playground = Template.bind({});
