import { Field, Flex, Input, InputGroup } from "@chakra-ui/react";
import useThemedColors from "../../../hooks/useThemedColors";
import { useState } from "react";
import { set } from "react-hook-form";

const LimitedFieldGroup = ({
  name,
  type,
  preInputText,
  invalid,
  label,
  placeholder,
  error,
  onchangeValue,
  Controller,
  control,
  limit,
}) => {
  const { textSecondary } = useThemedColors();
//   const [invalid2, setInvalid2] = useState(false);

  return (
    <Field.Root invalid={invalid}>
      <Field.Label fontSize={"22px"} color={textSecondary}>
        {label}
      </Field.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputGroup startElement={preInputText ?? preInputText}>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              onChange={async (e) => {
                if (onchangeValue) {
                  await onchangeValue(e.target.value);
                }

                if (e.target.value.length <= limit) {
                  const value =
                    e.target.value === "" ? null : Number(e.target.value);
                  field.onChange(value);
                }
              }}
              fontSize={"20px"}
              paddingY={1}
              paddingX={2}
              height={"auto"}
              color={textSecondary}
              ps={label == "phone number" ? "8ch" : ""}
            />
          </InputGroup>
        )}
      />

      {error && <p className="text-[18px] text-[#f00]">{error.message}</p>}
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
};

export default LimitedFieldGroup;
