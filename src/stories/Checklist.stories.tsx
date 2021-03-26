import Checklist from '@components/Checklist';

export default {
  title: 'Components/Checklist',
  component: Checklist,
  argTypes: {
    label: {
        control: {
            type: 'text',
        },
        defaultValue: 'I would like to receive more information by email'
    },
    items: {
        control: {
            type: 'text',
        },
        defaultValue: 'wfwefw fewwfw fwe'
    }
}
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Checklist {...args} />;

//👇 Each story then reuses that template
export const Playground = Template.bind({});

Playground.args = {
  style: 'neutral',
  children: 'Hello'
};
