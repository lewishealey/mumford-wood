import React from 'react';
import classNames from 'classnames';
import Success from '../../icons/circle-success.svg';
import Error from '../../icons/circle-error.svg';
import Warning from '../../icons/circle-warning.svg';
import Loading from '../../icons/circle-loading.svg';

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
       let iconName;
       let animation = false;

       switch(style) {
            case 'success':
                iconName = Success;
                break;
            case 'error':
                iconName = Error;
                break;
            case 'warning':
                iconName = Warning;
                break;
            case 'loading':
                iconName = Loading;
                animation = true;
                break;
       }

       const classes = classNames(`IconCircle`, `IconCircle--style-${style}`,`relative flex rounded font-heading text-md items-center h-${size} w-${size} ${animation && 'animate-spin'}`);

       return (
            <img src={iconName} className={classes}/>
        )
  }

  export default IconCircle;
