import Card from '@components/Card';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
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
        },
        border: {
            control: {
                type: 'boolean',
            },
            defaultValue: false
        },
    }
}

const Template = (args) => <Card {...args} />;
export const Playground = Template.bind({});
