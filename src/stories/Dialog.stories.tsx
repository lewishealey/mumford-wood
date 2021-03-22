import Dialog from '../components/Dialog';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {
    success: {
        control: {
            type: 'boolean',
            options: [
                'success',
                'error'
            ]
        },
        defaultValue: 'success'
    },
    title: {
        control: {
            type: 'text',
        },
        defaultValue: 'Title'
    }
    }
}

const Template = (args) => <Dialog {...args} />;
export const Playground = Template.bind({});
