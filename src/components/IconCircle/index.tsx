import React from 'react';
import classNames from 'classnames';

export interface Props {
    size: number;
    style: 'loading' | 'warning' | 'success' | 'error';
    className?: any;
}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const IconCircle: React.FC<Props> = ({
    style,
    size,
}) => {
       let animation = style === 'loading' ? true : false;
       const classes = classNames(`relative flex rounded font-heading text-md items-center h-${size} w-${size} ${animation && 'animate-spin'}`);
       return <div className={classes}><img src={`/img/circle-${style}.svg`} /></div>;
  }

  export default IconCircle;
