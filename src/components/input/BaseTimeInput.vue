<template>
    <div class="time-input">
        <div class="time-input__value" @click.stop.prevent="open = !open">
            {{ modelValue || placeholder }}
        </div>

        <div class="time-input__options" v-if="open">
            <div class="time-input__option time-input--hours">
                <ul>
                    <li v-for="hour in hours" :key="hour" @click="selectHour(hour)">
                        {{ hour }}
                    </li>
                </ul>
            </div>
            <div class="time-input__option time-input--minutes">
                <ul>
                    <li v-for="minute in minutes" :key="minute" @click="selectMinute(minute)">
                        {{ minute }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { range } from 'lodash-es';

export default {
    name:  "BaseTimeInput",
    emits: ['update:modelValue'],
    props: {
        placeholder: {
            type:     String,
            required: false,
            default:  'Enter value',
        },
        modelValue:  {
            type:      String,
            required:  false,
            validator: (value) => {
                return value ? value.toString().at(2) === ':' : true;
            }
        },
        hourSteps:   {
            type:     Number,
            required: false,
            default:  1,
        },
        minuteSteps: {
            type:     Number,
            required: false,
            default:  5,
        },
    },
    setup (props, { emit }) {
        const hours   = computed(() => range(1, 25, props.hourSteps));
        const minutes = computed(() => range(0, 61, props.minuteSteps));
        const open    = ref(false);

        const selectHour   = (hour) => {
            updateTime(hour, parseInt(props.modelValue?.split(':')?.at(1)));
        };
        const selectMinute = (minute) => {
            updateTime(parseInt(props.modelValue?.split(':')?.at(0)), minute);
        };
        const updateTime   = (hour, minute) => {
            hour   = hour < 10 ? `0${hour}` : hour;
            minute = minute < 10 ? `0${minute}` : minute;

            emit('update:modelValue', `${hour}:${minute}`);

            open.value = false;
        };

        return {
            hours,
            minutes,
            open,

            selectHour,
            selectMinute,
        };
    },
};
</script>

<style lang="scss" scoped>
.time-input {
    position: relative;
    isolation: isolate;

    &__value {
        background-color: #ffffff;
        border-color: #d2d6dc;
        border-width: 1px;
        border-radius: 0.375rem;
        padding-top: 0.5rem;
        padding-right: 0.75rem;
        padding-bottom: 0.5rem;
        padding-left: 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        appearance: none;
        cursor: pointer;
    }

    &__options {
        position: absolute;
        top: calc(100% + 0.15rem);
        left: 0;
        width: 100px;
        height: 250px;
        background-color: #ffffff;
        border: 1px solid #dedede;
        border-radius: 0.5rem;
        padding: 0.5rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        z-index: 9999;
    }

    &__option {
        &--hours,
        &--minutes {
            height: inherit;
            overflow-y: auto;

            li {
                cursor: pointer;
            }
        }
    }
}
</style>
