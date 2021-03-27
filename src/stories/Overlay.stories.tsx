import Overlay from '@components/Overlay';

export default {
  title: 'Components/Overlay',
  component: Overlay,
  argTypes: {
        children: {
            defaultValue: 'clwhlf',
        }
    }
}

const Template = (args) => <Overlay {...args} />;
export const Playground = Template.bind({});
