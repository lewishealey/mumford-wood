import React from 'react';

export interface BodyProps {
    children: any,
}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const Body: React.FC<BodyProps> = ({
    children
}) => {
    return ( <div className="space-y-1 font-body text-lg mb-1">
                {children}
            </div>
    )
  }

  export default Body;
