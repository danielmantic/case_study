"use client";

import { Listbox } from "@headlessui/react";
import { useState } from "react";
import clsx from "clsx";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

interface CountryOption {
  code: string;
  label: string;
  value: string; // e.g. "SK"
}

const getFlagEmoji = (countryCode: string) =>
  countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");

interface PhoneNumberInputProps {
  handler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  countryCode: string; // e.g. "+421"
  onCountryChange: (code: string) => void; // now accepts just code
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  handler,
  value,
  countryCode,
  onCountryChange,
}) => {
  const countries: CountryOption[] = getCountries().map((country) => ({
    value: country,
    code: `+${getCountryCallingCode(country)}`,
    label: `${getFlagEmoji(country)} ${country}`,
  }));

  const selectedCountry =
    countries.find((c) => c.code === countryCode) || countries[0];

  return (
    <div
      className={clsx(
        "flex items-center space-x-2 w-full border rounded-full px-4 py-2",
        value ? "bg-orange-100 border-orange-400" : "bg-white border-gray-300"
      )}
    >
      <Listbox
        value={selectedCountry}
        onChange={(newCountry) => onCountryChange(newCountry.code)}
      >
        {({ open }) => (
          <div className="relative w-[100px]">
            <Listbox.Button
              className="text-left w-full text-sm text-gray-700"
              aria-label="Select country"
            >
              {selectedCountry.label}
            </Listbox.Button>
            {open && (
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/10 focus:outline-none z-20">
                {countries.map((option) => (
                  <Listbox.Option
                    key={option.code}
                    value={option}
                    className={({ active, selected }) =>
                      clsx(
                        "cursor-pointer select-none px-4 py-2",
                        active ? "bg-blue-100 text-blue-900" : "text-gray-900",
                        selected && "font-medium"
                      )
                    }
                  >
                    {option.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            )}
          </div>
        )}
      </Listbox>

      <input
        type="text"
        value={value}
        onChange={handler}
        placeholder="Phone number"
        className={clsx(
          "w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400",
          value ? "bg-orange-100" : "bg-white"
        )}
      />
    </div>
  );
};

export default PhoneNumberInput;
