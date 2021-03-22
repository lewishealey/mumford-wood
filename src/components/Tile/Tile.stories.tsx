import Tile from './index';

export default {
  title: 'Components/Tile',
  component: Tile,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Tile {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {
  href: 'https://google.com',
  size: 'default',
  highlight: 'Hello',
  title: 'Box Sash Window',
  image: 'http://www.mumfordwood.com/images/quick-links/conservation-range/box-sash-11-17.jpg',
  summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisl orci, sodales nec quam a, posuere posuere nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent ex leo, dignissim et odio mattis, sodales imperdiet lorem. Praesent cursus dapibus nulla, in pretium enim ornare vel.'
};
