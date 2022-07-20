import { userEvent, within } from '@storybook/testing-library';
import BaseInput from '../components/input/BaseInput';

export default {
    title:      'Inputs/BaseInput',
    component:  BaseInput,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/vue/configure/story-layout
        layout: 'fullscreen',
    },
};

const Template = () => ({
    // Components used in your story `template` are defined in the `components` object
    components: { BaseInput },

    // Here we define the `template`
    template: '<base-input />',
});

// More on interaction testing: https://storybook.js.org/docs/vue/writing-tests/interaction-testing
export const Input = Template.bind({
    type: 'text',
});
Input.play         = async ({ canvasElement }) => {
    const canvas      = within(canvasElement);
    console.log(canvas);
    const input = await canvas.getByRole('textbox');
    console.log(input);
    await userEvent.click(input);
    userEvent.type('Hello Storybook!');
};
