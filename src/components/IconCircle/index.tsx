import React from 'react';
import classNames from 'classnames';
import Success from '@icon/circle-success.svg';
import Error from '@icon/circle-error.svg';
import Warning from '@icon/circle-warning.svg';
import Loading from '@icon/circle-loading.svg';

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
       const IconSVG = require(`@icon/circle-${style}.svg`);
       return <IconSVG.ReactComponent className={classes} />;
  }

  export default IconCircle;
