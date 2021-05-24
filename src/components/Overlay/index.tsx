import React from 'react';

export interface Props {
    onClick: () => void;
}

export const Overlay: React.FC<Props> = ({
    onClick
}) => {
    return (
        <div className="w-full h-full top-0 left-0 fixed opacity-50 bg-primary-base" onClick={() => onClick}/>
    )
  }

  export default Overlay;
