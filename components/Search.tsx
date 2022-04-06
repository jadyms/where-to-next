import React, { ChangeEvent, FunctionComponent } from "react";
import { Search } from "./styled/Search.styled";

export type SearchProperties = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  readonly id: string;
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

const SearchInput: FunctionComponent<SearchProperties> = ({
  id,
  disabled = false,
  name,
  type = "text",
  value,
  placeholder = "Search a country by name...",
  className,
  ariaLabel,
  maxLength = 160,
  onChange,
  onBlur,
  onFocus,
  ...rest
}) => {
  return (
    <Search
      type={type}
      name={name}
      id={id}
      value={value}
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
  );
};

export default SearchInput;
