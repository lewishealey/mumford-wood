import GalleryItem from '@components/Gallery/item';

export default {
  title: 'Components/GalleryItem',
  component: GalleryItem
}

const Template = (args) => <GalleryItem {...args} />;
export const Playground = Template.bind({});
