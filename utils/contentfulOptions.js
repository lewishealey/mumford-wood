import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const Bold = ({ children }) => <p className="weight-bold">{children}</p>;
const Text = ({ children }) => <p className="mb-1 font-body text-gray-800 text-lg md:text-base">{children}</p>;

export const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    [MARKS.CODE]: (node) => {
        return <div className="px-6 py-3 my-4 bg-gray-500 text-blue-300 font-mono rounded-lg">{node}</div>
    }
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
  renderText: text => text.replace('!', '?'),
};
