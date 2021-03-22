import TextField from '../components/TextField';

export default {
  title: 'Components/TextField',
  component: TextField,
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
            options: ['primary', 'secondary', 'fade', 'ghost']
        },
        defaultValue: 'primary',
    },
    label: {
        control: {
            type: 'text'
        },
        defaultValue: 'Label'
    },
}
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <TextField {...args} />;

//👇 Each story then reuses that template
export const Playground = Template.bind({});

Playground.args = {
  style: 'primary',
  size: 'default',
  children: 'Hello'
};
