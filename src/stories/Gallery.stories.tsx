import Gallery from '@components/Gallery';

export default {
  title: 'Components/Gallery',
  component: Gallery,
}

const Template = (args) => <Gallery {...args} />;
export const Playground = Template.bind({});
