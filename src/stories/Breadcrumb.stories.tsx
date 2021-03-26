import Breadcrumb from '../components/Breadcrumb';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    crumbs: {
        control: {
            type: 'object',
        },
        defaultValue: [{
            label: 'First',
            link: 'fwfeefe'
        },{
            label: 'Second',
            link: 'fwfeefe'
        }],
    },
    }
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Breadcrumb {...args} />;

//👇 Each story then reuses that template
export const Playground = Template.bind({});
