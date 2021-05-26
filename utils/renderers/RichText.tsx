import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import classnames from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { ReactNode } from 'react';

const Bold = ({ children }) => <p className="weight-bold">{children}</p>;
const Text = ({ children }) => <p className="mb-1 font-body text-gray-800 text-lg md:text-base">{children}</p>;

export interface RichTextProps {
  content: any;
  classNames?: any;
}

export const RichText: React.FC<RichTextProps> = ({ content, classNames }) => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderText: (text) => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        {
          return (
            <a
              href={node.data.uri}
              className="richTextHyperlink"
              title="View more information"
              rel="noreferrer"
              target={node.data.uri.startsWith('/') ? '' : '_blank'}>
              {children}
            </a>
          );
        }
      },
      [INLINES.ASSET_HYPERLINK]: (node: any, children: any) => {
        {
          const hyperlinkAsset = content.links.assets.hyperlink.find(
            (i) => i?.sys?.id === node.data.target.sys.id
          );

          if (!hyperlinkAsset) {
            return;
          }
          return (
            <a
              href={hyperlinkAsset.url}
              target="blank"
              className="richTextHyperlink"
              rel="noopener"
              title="View file">
              {children}
            </a>
          );
        }
      },
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        // Get the hyperlink from the link data
        const hyperlinkEntry = content.links.entries.hyperlink.find(
          (i) => i?.sys?.id === node.data.target.sys.id
        );

        if (!hyperlinkEntry) {
          return;
        }

        // Construct the URL, we need to add new model types here if the type ID is not the same as the URL
        const url = `/${hyperlinkEntry.__typename.toLowerCase()}/${
          hyperlinkEntry.slug
        }`;

        return (
          <Link href={url} passHref>
            <a className="no-underline" title="Find out more">
              {children}
            </a>
          </Link>
        );
      },
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc list-inside space-y-2">{children}</ul>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <Text>
          {children}
        </Text>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <Text>
          {children}
        </Text>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <Text>
          {children}
        </Text>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <Text>
          {children}
        </Text>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <Text>
          {children}
        </Text>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <Text>
          {children}
        </Text>
      ),
      [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <Text>
          {children[0].props.children}
        </Text>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <Text>
          {children}
        </Text>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <Text>
          {children}
        </Text>
      ),
      [BLOCKS.HR]: (node, children) => <hr />,
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        const entry = content.links.entries.block.find(
          (i) => i?.sys?.id === node.data.target?.sys?.id
        );
        if (!entry) {
          return;
        }
        if (entry.__typename) {
          switch (entry.__typename.toLowerCase()) {
            // case 'youtube':
            //   const youtubeUrl = `https://www.youtube.com/embed/${GetYoutubeID(
            //     entry.youtubeUrl
            //   )}`;

            //   return (
            //     <div className="embed-responsive aspect-ratio-16/9">
            //       <iframe
            //         className="embed-responsive-item"
            //         src={youtubeUrl}
            //         title="Embedded Media"
            //       />
            //     </div>
            //   );
            case 'iframe':
              return (
                <iframe
                  className="w-full"
                  height={entry.height ? entry.height : '320'}
                  src={entry.iframeUrl}
                />
              );
            // case 'section':
            //   return (
            //     <Section
            //       heading={entry.sectionHeader}
            //       description={entry.sectionSummary}
            //       background="bg-white"
            //       type="Card"
            //       isCarousel
            //       cardBackground="bg-stone"
            //       wrapperClassName="full-width"
            //       items={SectionRenderer(entry)}
            //       xlCols={3}
            //       lgCols={3}
            //       mdCols={2}
            //       smCols={1}
            //       centerText={entry.centerText}
            //     />
            //   );
            // case 'tile':
            //   return (
            //     <Tile
            //       image={entry?.background?.image?.url}
            //       heading={entry.title}
            //       subtitle={entry.subtitle}
            //       button={{
            //         buttonType: 'Primary',
            //         children: 'Read more',
            //         link: entry.link
            //           ? slugToURL(entry.link?.__typename, entry.link?.slug)
            //           : null,
            //       }}
            //       className="full-width"
            //     />
            //   );
          }
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        let mediaAsset = null;

        const asset = content.links.assets.block.find(
          (i) => i?.sys?.id === node.data.target?.sys?.id
        );

        if (!asset) {
          return;
        }

        // if (asset) {
        //   switch (asset.contentType) {
        //     case 'image/jpeg':
        //       mediaAsset = (
        //         <div className="py-10">
        //           <div className="relative aspect-ratio-16/9 rounded overflow-hidden">
        //             <Image
        //               src={asset.url}
        //               alt={asset.description}
        //               cover
        //               fullWidth
        //               fullHeight
        //             />
        //           </div>
        //           {asset.description && (
        //             <Text>
        //               {asset.description}
        //             </Text>
        //           )}
        //         </div>
        //       );
        //       break;
        //   }
        // }
        return <>{mediaAsset}</>;
      },
    //   [INLINES.EMBEDDED_ENTRY]: (node, children) => {
    //     const entry = content.links.entries.inline.find(
    //       (i) => i?.sys?.id === node.data.target?.sys?.id
    //     );

    //     if (!entry) {
    //       return;
    //     }
    //     return (
    //       <Card
    //         link={slugToURL(entry.__typename, entry.slug)}
    //         heading={entry.title}
    //         content={entry.summary}
    //         image={entry.heroCollection?.items[0]?.image?.url}
    //         direction="horizontal"
    //         size="small"
    //         color="gray"
    //       />
    //     );
    //   },
    },
  };

  return (
    <div className={classnames('rich-text pb-4', classNames)}>
      {content && documentToReactComponents(content.json, options)}
    </div>
  );
};

export default RichText;
