import Dialog from '@components/Dialog';
import TextField from '@components/TextField';
import Button from '@components/Button';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {
    success: {
        control: {
            type: 'boolean',
        },
        defaultValue: false
    },
    title: {
        control: {
            type: 'text',
        },
        defaultValue: 'Download a brochure'
    },
    summary: {
        control: {
            type: 'text'
        },
        defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ante nisl, commodo efficitur rhoncus nec, euismod vitae risus. Vivamus gravida bibendum viverra.'
    }

    }
}

const Template = (args) => <Dialog {...args}>
<div className="space-y-1">
    <TextField
        type="text"
        label="First name*"
        name="first_name"
    />
    <TextField
        type="text"
        label="Last name*"
        name="last_name"
    />
    <TextField
        type="email"
        label="Email address*"
        name="email"
    />
    <TextField
        type="text"
        label="Phone number*"
        name="phone"
    />
    <TextField
        type="text"
        label="What profession are you?"
        name="profession"
    />
    <TextField
        type="text"
        label="Additional information"
        name="notes"
    />
    <Button
        size="default"
        style="primary"
        >
        Download PDF (3MB)
    </Button>
</div>
    </Dialog>;
export const Playground = Template.bind({});
