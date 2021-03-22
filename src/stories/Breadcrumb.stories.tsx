import Breadcrumb from '../components/Breadcrumb';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Breadcrumb {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
