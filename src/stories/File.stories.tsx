import File from '@components/File';

export default {
  title: 'Components/File',
  component: File,
  argTypes: {
    name: {
        control: {
            type: 'text',
        },
        defaultValue: 'FENSA for Fire Escape',
    },
    size: {
        control: {
            type: 'text',
        },
        defaultValue: '8 KB',
    },
    href: {
        control: {
            type: 'text',
        },
        defaultValue: 'http://www.mumfordwood.com/_literature_127148/The_Style_Guide',
    },
    title: {
        control: {
            type: 'text',
        },
        defaultValue: 'Request a brochure',
    },
    }
}

const Template = (args) => <File {...args} />;
export const Playground = Template.bind({});
