import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export default function InputBox({
  Title,
  Placeholder,
  Inputname,
  InputType,
  ErrorMessage,
  onChange,
  isError,
  className,
  value,
}) {
  return (
    <div>
      <label
        htmlFor={Inputname}
        className="block font-medium leading-6 text-gray-900"
      >
        {Title}
      </label>
      <div
        className={`relative mt-2 rounded-md shadow-sm ${
          isError ? "ring-1 ring-red-500" : ""
        }`}
      >
        <input
          type={InputType}
          name={Inputname}
          id={Inputname}
          className={`input-box block rounded-md border-0 py-3 pr-10 ring-1 ring-inset mt-3 pl-5 w-[370px] focus:ring-inset outline-none text-[#767676] ${className} ${
            isError ? "ring-red-500" : "ring-[#E1E1E1]"
          }`}
          placeholder={Placeholder}
          autoComplete="off"
          onChange={(e) => {
            onChange(e);
          }}
          value={value}
        />
        {isError && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {isError && (
        <p className="mt-2 text-sm text-red-600" id={`${Inputname}-error`}>
          {ErrorMessage}
        </p>
      )}
    </div>
  );
}
