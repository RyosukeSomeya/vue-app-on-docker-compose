import { mount, shallowMount } from '@vue/test-utils';
import TodoDisplay from '@/components/TodoDisplay';

describe('Testing TodoDisplay component', () => {
    // コンポーネント全体の確認
    const wrapper = shallowMount(TodoDisplay);
    it('コンポーネントが表示されているか確認', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
        expect(wrapper.findComponent(TodoDisplay).exists()).toBe(true);
    });

    // 初期表示の確認
    it('tableのtheadが表示されているか確認', () => {
        expect(wrapper.find('thead').exists()).toBeTruthy();
        // thは4つ存在する
        expect(wrapper.findAll('th').length).toEqual(4);
        // クラス名ｓ'todo-it'と'comment-col'の
        expect(wrapper.find('.todo-it').exists()).toBeTruthy();
        expect(wrapper.find('.comment-col').exists()).toBeTruthy();
    });

})
