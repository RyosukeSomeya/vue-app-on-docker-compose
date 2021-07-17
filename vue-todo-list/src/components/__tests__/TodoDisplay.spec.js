import { mount } from '@vue/test-utils';
import TodoDisplay from '@/components/TodoDisplay';

describe('Testing TodoDisplay component', () => {
    // コンポーネント全体の確認
    const wrapper = mount(TodoDisplay);
    it('コンポーネントが表示されているか確認', () => {
        console.log(wrapper.html())
        expect(wrapper.isVueInstance).toBeTruthy();
        expect(wrapper.findComponent(TodoDisplay).exists()).toBe(true);
    });

    it('tableのtheadが表示されているか確認', () => {
        // expect(wrapper.findComponent('thead')).toBe(true);
        // expect(wrapper.html().classes()).toContain('todo-it');
    });
})
