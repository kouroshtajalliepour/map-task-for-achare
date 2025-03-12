<script setup lang="ts">
// * types
type IEntry = {
  key: string;
  value: string;
};

// * imports
import { ref, watch } from "vue";

// * props and emits
const props = defineProps<{
  modelValue: string;
  entries: IEntry[];
}>();
const emit = defineEmits(["update:modelValue"]);

// * component data
const radioInputValue = ref("");

watch(
  () => radioInputValue.value,
  () => {
    emit("update:modelValue", radioInputValue.value);
  }
);
</script>

<template>
  <div class="radio-input-wrapper">
    <label class="radio-input-label main-label">جنسیت</label>
    <label
      :class="[
        'radio-input-label option-label',
        entry.key == radioInputValue ? 'active' : '',
      ]"
      v-for="entry in entries"
      :for="entry.key"
    >
      <input
        class="invisible-input"
        :value="entry.key"
        :id="entry.key"
        type="radio"
        v-model="radioInputValue"
      />
      <div class="custom-ratio-input"></div>
      <p class="radio-input-value">{{ entry.value }}</p>
    </label>
  </div>
</template>

<style lang="scss">
.radio-input-wrapper {
  margin: 30px 0;
  display: flex;
  width: 40%;
  .radio-input-label {
    display: flex;
    &.main-label {
      flex-basis: 50%;
    }
    &.option-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s ease-out;
      .invisible-input {
        visibility: hidden;
        width: 0px;
        height: 0px;
      }
      .custom-ratio-input {
        width: 17px;
        height: 17px;
        border-radius: 50%;
        border: solid 1px #00bfa5;
        position: relative;
      }
      &.active {
        .custom-ratio-input {
          &::before {
            content: "";
            position: absolute;
            background-color: #00bfa5;
            border-radius: 50%;
            width: 9px;
            height: 9px;
            top: calc(50% - 4.5px);
            right: calc(50% - 4.5px);
          }
        }
      }
      .radio-input-value {
        font-size: 12px;
        margin-right: 5px;
        margin-left: 40px;
      }
    }
  }
}
</style>
