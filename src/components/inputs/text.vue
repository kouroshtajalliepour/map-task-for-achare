<script lang="ts" setup>
// * types
type IAutocomplete =
  | "on"
  | "off"
  | "name"
  | "honorific-prefix"
  | "given-name"
  | "additional-name"
  | "family-name"
  | "honorific-suffix"
  | "nickname"
  | "username"
  | "new-password"
  | "current-password"
  | "email"
  | "impp"
  | "tel"
  | "tel-country-code"
  | "tel-national"
  | "tel-area-code"
  | "tel-local"
  | "tel-local-prefix"
  | "tel-local-suffix"
  | "tel-extension"
  | "street-address"
  | "address-line1"
  | "address-line2"
  | "address-line3"
  | "address-level4"
  | "address-level3"
  | "address-level2"
  | "address-level1"
  | "country"
  | "country-name"
  | "postal-code"
  | "cc-name"
  | "cc-given-name"
  | "cc-additional-name"
  | "cc-family-name"
  | "cc-number"
  | "cc-exp"
  | "cc-exp-month"
  | "cc-exp-year"
  | "cc-csc"
  | "cc-type"
  | "bday"
  | "bday-day"
  | "bday-month"
  | "bday-year"
  | "sex"
  | "url"
  | "photo"
  | "one-time-code";

// * props and emits
const props = defineProps<{
  modelValue?: string | number;
  placeholder?: string;
  id?: string;
  autocomplete?: IAutocomplete;
  inputError?: string;
  validator?: any;
  inputmode?:
    | "text"
    | "search"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal";
  dir?: "ltr" | "rtl";
  type?: "number" | "text";
}>();
const emit = defineEmits(["update:modelValue", "update:inputError"]);

// * functions
function sanitizeNumber(e: any) {
  const input = e.target as HTMLInputElement;
  const persianToLatinMap: { [key: string]: string } = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };
  let sanitizedValue = input.value;

  sanitizedValue = sanitizedValue.replace(
    /[۰-۹]/g,
    (char: string) => persianToLatinMap[char]
  );
  sanitizedValue = sanitizedValue.replace(/\D/g, "");
  input.value = sanitizedValue;
}
let updateValueTimeOut: any;
function handleInput(e: any) {
  if (props.type === "number") {
    sanitizeNumber(e);
  }

  async function updateValue() {
    try {
      await props.validator(e.target.value);
    } catch (error: any) {
      emit("update:inputError", error.message);
    }
  }

  emit("update:inputError", "");
  emit("update:modelValue", e.target.value);
  clearTimeout(updateValueTimeOut);
  updateValueTimeOut = setTimeout(updateValue, 1000);
}
</script>

<template>
  <div :class="['text-input-wrapper', dir ? dir : '']">
    <input
      :value="modelValue?.toString()"
      :class="['text-input']"
      :inputmode="inputmode ? inputmode : 'text'"
      :id="id"
      type="text"
      :autocomplete="autocomplete"
      @input="handleInput"
      :placeholder="placeholder"
    />
  </div>
</template>

<style lang="scss">
.text-input-wrapper {
  width: 100%;
  display: flex;
  align-items: center;

  .text-input {
    background-color: white;
    font-size: 1.1em;
    width: 100%;
    border: 1px solid blue;
    padding: 3px;
    border-radius: 5px;
    outline: none;
    &:focus {
      border: 1px solid red;
    }
  }
  &.rtl {
    .text-input {
      direction: rtl;
    }
  }
  &.ltr {
    .text-input {
      direction: ltr;
    }
  }
}
</style>
