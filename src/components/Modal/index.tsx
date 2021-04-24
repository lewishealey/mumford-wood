import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Overlay from '@components/Overlay';

export interface Props {
    children: any;
    isOpen: boolean;
}

export const Modal: React.FC<Props> = ({
    isOpen,
    children,
}) => {

    return isOpen ? (
        <div className="fixed top-0 left-0 h-full w-full z-50">
            <div className="absolute top-0 left-0 h-full w-full flex z-50 justify-center items-center">
                {children}
            </div>
            <Overlay />
        </div>) : null;
  }

  export default Modal;
