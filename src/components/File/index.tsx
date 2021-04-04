import React from 'react';
import Image from 'next/image';
import { formatBytes } from '@utils/helpers';
export interface Props {
    name: string;
    size: string;
    href: string;
    title: string;
}

export const File: React.FC<Props> = ({
    name,
    size,
    href,
    title
}) => {
    return (
        <a href={href} target="_blank" title={title}>
            <div className="p-1 border border-neutral-3 rounded-md border-solid flex flex-row justify-between items-center hover:bg-gray-100">
                <div className="flex space-x-0.5 items-center">
                    <span className="flex items-center"><Image src="/img/file.svg" alt="Download file" height={20} width={20} /></span>
                    <span>{name}</span>
                    <span className="text-gray-400">({formatBytes(size)})</span>
                </div>
                <span className="justify-self-end flex items-center"><Image src="/img/arrow-right.svg" alt="Download file" height={20} width={20} /></span>
            </div>
        </a>
    )
  }

  export default File;
