import { FC, ChangeEvent, SVGProps } from 'react';
import classNames from 'classnames';

const ErrorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(239 68 68)" {...props}>
    <path d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z" />
  </svg>
);

interface Props {
  id?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  label?: string;
  disabled?: boolean;
  rows?: number;
  errorMessage?: string;
  onChange?(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void;
  value?: string;
}

const Input: FC<Props> = ({
  id = '',
  type = 'text',
  placeholder = '',
  className = '',
  inputClassName = '',
  label = '',
  disabled = false,
  rows,
  errorMessage = '',
  onChange,
  value,
}) => {
  const baseProps = {
    id,
    type,
    className: classNames(
      'rounded appearance-none bg-white border border-gray-100 md:text-base text-xs text-black leading-5 pt-3 pr-9 pb-3 pl-3.5 w-full focus:border-black focus:outline-none p-3',
      inputClassName,
      { 'bg-lightgray placeholder:text-grey': disabled }
    ),
    placeholder,
    onChange,
    disabled,
    value,
  };
  return (
    <div className={classNames('min-h-[130px]', { 'sm:pt-2.5 pb-2.5': Boolean(label) }, className)}>
      {label && (
        <label htmlFor={id} className="block text-left leading-4 pb-4">
          {label}
        </label>
      )}
      <div className="relative">
        {rows ? <textarea {...baseProps} rows={rows} /> : <input {...baseProps} />}
        {Boolean(errorMessage) && <ErrorIcon className="absolute top-0 right-0 my-auto mr-2 h-full" />}
      </div>
      <span className="text-red-500">{errorMessage}</span>
    </div>
  );
};

export default Input;
