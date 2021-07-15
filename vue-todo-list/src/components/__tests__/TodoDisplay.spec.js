import { mount } from '@vue/test-utils';
import TodoDisplay from '@/components/TodoDisplay';

describe('Testing TodoDisplay component', () => {
    it('Testing TodoList component', () => {
        const wrapper = mount(TodoDisplay)
        expect(wrapper.isVueInstance).toBeTruthy()
    })
})
