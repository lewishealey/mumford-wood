import React from 'react';

export interface PortalProps {
    title: string,
}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const Portal: React.FC<PortalProps> = ({
    title,
    children
}) => {
    return ( <div className="w-full bg-royal-neutral py-2 rounded-md">
                <div className="bg-white m-auto relative w-20 text-center p-1 rounded border-primary-base border-t-4 border-solid">
                    <h2 className="font-heading text-2xl">{title}</h2>
                    {children}
                </div>
            </div>
    )
  }

  export default Portal;
