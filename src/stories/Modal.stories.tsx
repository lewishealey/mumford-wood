import Modal from '@components/Modal';
import Dialog from '@components/Dialog';
import Form from '@components/Form';

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {

    }
}

const Template = (args) => <Modal {...args}>
        <Dialog>
            <Form type="estimate" />
        </Dialog>
    </Modal>;
export const Playground = Template.bind({});
