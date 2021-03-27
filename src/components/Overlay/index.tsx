import React from 'react';

export interface Props {
}

export const Overlay: React.FC<Props> = ({
}) => {
    return (
        <div className="w-full h-full top-0 left-0 fixed opacity-50 bg-primary-base" />
    )
  }

  export default Overlay;
