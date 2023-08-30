import React, { FC } from 'react';
import classnames from 'classnames';

interface Props {
  title: string;
  classNames?: string;
  text?: string;
}

const ErrorPropertyCallout: FC<Props> = ({ title, classNames, text = '' }) => (
  <div className={classnames('bg-red-200 py-4 px-9 flex flex-col gap-0.5 text-red-800', classNames)}>
    <span className="font-extrabold">{title}</span>
    <span>{text}</span>
  </div>
);

export default ErrorPropertyCallout;
