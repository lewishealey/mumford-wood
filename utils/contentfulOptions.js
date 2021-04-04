import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const Bold = ({ children }) => <p className="weight-bold">{children}</p>;
const Text = ({ children }) => <p className="mb-1 font-body text-gray-800 text-sm md:text-base">{children}</p>;

export const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
  renderText: text => text.replace('!', '?'),
};
