import Form from '@components/Form';

export default {
  title: 'Components/Form',
  component: Form,
  argTypes: {
    type: {
        control: {
            type: 'select',
            options: ['estimate', 'apprenticeship', 'brochure'],
        },
        defaultValue: 'estimate',
    }
}
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Form {...args} />;

//👇 Each story then reuses that template
export const Playground = Template.bind({});

Playground.args = {
  type: 'estimate'
};
