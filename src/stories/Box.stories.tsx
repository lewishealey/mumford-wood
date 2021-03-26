import Box from '@components/Box';

export default {
  title: 'Components/Box',
  component: Box,
  argTypes: {
    style: {
        control: {
            type: 'select',
            options: ['neutral', 'conservation', 'classic', 'heritage'],
            defaultValue: 'neutral',
        },
    },
    title: {
        control: {
            type: 'text',
        },
        defaultValue: 'Title'
    },
    summary: {
        control: {
            type: 'text',
        },
        defaultValue: 'wfwefw fewwfw fwe'
    }
}
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Box {...args} />;

//👇 Each story then reuses that template
export const Playground = Template.bind({});

Playground.args = {
  style: 'neutral',
  children: 'Hello'
};
