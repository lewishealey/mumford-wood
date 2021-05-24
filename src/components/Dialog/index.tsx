import React from "react";
import IconCircle from "@components/IconCircle";

export interface DialogProps {
  children: any;
  success?: boolean;
  error?: boolean;
  isLoading?: boolean;
  title?: string;
  summary?: string;
  onCloseClick: () => void;
}

export const Dialog: React.FC<DialogProps> = ({
  success,
  error,
  isLoading,
  title,
  summary,
  children,
  onCloseClick,
}) => {
  return (
    <div className="bg-white rounded-md shadow relative text-center justify-center p-2 w-28 border-t-4 border-primary-base border-solid max-h-screen overflow-x-auto">
      {isLoading ? (
        <><h4 className="text-2xl font-heading mb-1">Loading</h4></>
      ) : (
        <>
          <div
            className="absolute top-1 right-1 cursor-pointer"
            onClick={onCloseClick}
          >
            <img src="/img/close.svg" />
          </div>
          {error && (
            <div className="m-auto flex justify-center mb-1">
              <IconCircle size={3} style="error" />
            </div>
          )}
          {success && (
            <div className="m-auto flex justify-center mb-1">
              <IconCircle size={3} style="success" />
            </div>
          )}
          {title && <h4 className="text-2xl font-heading mb-1">{title}</h4>}
          {summary && (
            <p className="text-base font-body mb-1 text-neutral-1">{summary}</p>
          )}
          <div className="">{children}</div>
        </>
      )}
    </div>
  );
};

export default Dialog;
