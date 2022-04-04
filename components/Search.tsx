import React, { ChangeEvent, FunctionComponent, ReactNode } from "react";

export type SearchProperties = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  readonly id: string;

  readonly error?: string | readonly string[] | null | ReactNode;

  readonly leadingIcon?: ReactNode;
  readonly name?: string;
  readonly type?: string;
  readonly value?: any;

  readonly placeholder?: string;

  readonly ariaLabel?: string;

  readonly className?: string;
  readonly disabled?: boolean;

  readonly maxLength?: number;

  readonly onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Search: FunctionComponent<SearchProperties> = ({
  id,
  error,
  leadingIcon,
  disabled = false,
  name,
  type = "text",
  value,
  placeholder = "Search a country by name...",
  className = "w-full",
  ariaLabel,
  maxLength = 160,
  onChange,
  onBlur,
  onFocus,
  ...rest
}) => {
  const disabledClassName = disabled ? "opacity-75 cursor-not-allowed" : "";
  const errorClassName = error ? "border-red-300" : "";
  const leadingIconClassName = leadingIcon ? "pl-10" : "";

  return (
    <div className={``}>
      <div>
        <div className="mt-1 relative">
          {leadingIcon && (
            <span className="absolute inset-y-0 start-0 ps-3 flex items-center">
              {leadingIcon}
            </span>
          )}
          <input
            type={type}
            name={name}
            id={id}
            value={value}
            className={`block p-2 rounded-2xl focus:outline-none ${className} ${leadingIconClassName} ${disabledClassName} ${errorClassName}`}
            placeholder={placeholder}
            disabled={disabled}
            aria-describedby={id}
            aria-label={ariaLabel ?? id}
            maxLength={maxLength}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            {...rest}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
