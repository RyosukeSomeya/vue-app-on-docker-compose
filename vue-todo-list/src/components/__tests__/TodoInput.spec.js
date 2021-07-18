import { mount } from '@vue/test-utils';
import TodoInput from '@/components/TodoInput';

describe('Testing TodoInput component', () => {
    let wrapper;

    // コンポーネント全体の確認
    afterEach(() => {
        wrapper.destroy();
    });
    it('コンポーネントが表示されているか確認', () => {
        wrapper = mount(TodoInput);
        expect(wrapper.isVueInstance).toBeTruthy();
        expect(wrapper.findComponent(TodoInput).exists()).toBe(true);
    });

    it('コンポーネント要素の表示確認', () => {
        wrapper = mount(TodoInput);
        expect(wrapper.text()).toContain('新規タスクの追加');
        expect(wrapper.find('input[type="text"]').exists()).toBe(true);
        expect(wrapper.find('button').exists()).toBe(true);
    });

    it('input要素の入力確認', async () => {
        wrapper = mount(TodoInput);
        const textInput = wrapper.find('input[type="text"]');
        await textInput.setValue('追加タスク1');
        console.log(wrapper.find('input[type="text"]').element)
        expect(wrapper.find('input[type="text"]').element.value).toBe('追加タスク1');
    });

    it ('追加ボタンクリックイベントの発火確認', () => {
        wrapper = mount(TodoInput);
        // Todo追加ボタンの発火テスト
        wrapper.find('button').trigger('click');
        expect(wrapper.emitted('sendNewTodo')).toBeTruthy();
    })
});
