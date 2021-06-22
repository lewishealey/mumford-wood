import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import classnames from "classnames";

import Link from "next/link";
import Image from "next/image";
import React, { ReactNode } from "react";

const Bold = ({ children }) => <p className="weight-bold">{children}</p>;
const Text = ({ children }) => (
  <p className="mb-1 font-body text-gray-800 text-lg md:text-base">
    {children}
  </p>
);

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
      return text.split("\n").reduce((children, textSegment, index) => {
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
              target={node.data.uri.startsWith("/") ? "" : "_blank"}
            >
              {children}
            </a>
          );
        }
      },
      [INLINES.ASSET_HYPERLINK]: (node: any, children: any) => {
        {
          const hyperlinkAsset = content?.links?.assets?.hyperlink.find(
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
              title="View file"
            >
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
        <h1 className="text-3xl mb-1">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-2xl mb-1">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-xl mb-1">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className="text-md mb-1">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5 className="text-base mb-0.5">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6 className="text-sm mb-0.5">{children}</h6>
      ),
      [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <Text>{children[0].props.children}</Text>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.QUOTE]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.HR]: (node, children) => <hr />,
    //   [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
    //     const entry = content?.links?.entries?.block?.find(
    //       (i) => i?.sys?.id === node.data.target?.sys?.id
    //     );
    //     if (!entry) {
    //       return;
    //     }
    //     if (entry.__typename) {
    //       switch (
    //         entry.__typename.toLowerCase()
    //         // case 'download':
    //         //   return (
    //         //     <div className="flex column w-full flex-wrap border-gray-300 border rounded">
    //         //         <Download
    //         //             title={entry.name}
    //         //             files={convertToFormat(entry.filesCollection.items)}
    //         //             user={null}
    //         //         />
    //         //     </div>
    //         //   );
    //       ) {
    //       }
    //     }
    //   },
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        let mediaAsset = null;

        const asset = content?.links?.assets?.block?.find(
          (i) => i?.sys?.id === node.data.target?.sys?.id
        );

        if (!asset) {
          return;
        }
        if (asset) {
          switch (asset.contentType) {
            case "image/jpeg":
              mediaAsset = (
                <div className="py-10">
                  <div className="relative aspect-ratio-16/9 rounded overflow-hidden">
                    <Image
                      src={asset.url}
                      alt={asset.description}
                      width="100%"
                      height="auto"
                    />
                  </div>
                  {asset.description && <Text>{asset.description}</Text>}
                </div>
              );
              break;
            case "application/pdf":
              mediaAsset = (
                <div className="py-1">
                  <a
                    href={asset.url}
                    title={asset.description}
                    target="_blank"
                    className="relative border p-1 rounded hover:bg-neutral-4 justify-between space-x-0.5 items-center inline-flex"
                  >
                    <Image
                      src="/img/file.svg"
                      alt="Download file"
                      height={20}
                      width={20}
                    />
                    <span>{asset.title}</span>
                  </a>
                </div>
              );
              break;
          }
        }
        return <>{mediaAsset}</>;
      },
    },
  };

  return (
    <div className={classnames("rich-text", classNames)}>
      {content && documentToReactComponents(content.json, options)}
    </div>
  );
};

export default RichText;
