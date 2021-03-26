import Button from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
        control: {
            type: 'select',
            options: ['default', 'compact'],
            defaultValue: 'default',
        },
    },
    style: {
        control: {
            type: 'select',
            options: ['primary', 'secondary', 'fade', 'ghost'],
            defaultValue: 'primary',
        },
    },
}
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Button {...args} />;

//👇 Each story then reuses that template
export const Playground = Template.bind({});

Playground.args = {
  style: 'primary',
  size: 'default',
  children: 'Hello'
};
