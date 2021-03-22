import IconCircle from '../components/IconCircle';

export default {
  title: 'Components/IconCircle',
  component: IconCircle,
  argTypes: {
    style: {
        control: {
            type: 'select',
            options: ['success', 'error', 'warning', 'loading'],
            defaultValue: 'success',
        },
    },
}
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <IconCircle {...args} />;

//👇 Each story then reuses that template
export const Playground = Template.bind({});

Playground.args = {
  style: 'success',
  size: 4,
};
