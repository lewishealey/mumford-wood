import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
export interface Props {
    type: 'light' | 'dark';
    onSelect: any;
}

export const Keys: React.FC<Props> = ({
    onSelect,
    type
}) => {
    const handleArrowClick = (direction) => {
        onSelect(direction);
    }

    const styleType = type === "light" ? classNames(
        `bg-neutral-5 hover:bg-neutral-4 text-dark cursor-pointer p-1`,
    ) : classNames(
        `bg-neutral-0 hover:bg-neutral-1 text-white cursor-pointer p-1`,
    );

    return (
        <div className="inline-flex rounded-md overflow-hidden">
            <div className={styleType} onClick={() => handleArrowClick("prev")}>
                Left
            </div>
            <div className={styleType} onClick={() => handleArrowClick("next")}>
                Right
            </div>
        </div>
    )
  }

  export default Keys;
