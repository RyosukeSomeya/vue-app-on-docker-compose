import { mount } from '@vue/test-utils';
import TodoDisplay from '@/components/TodoDisplay';

describe('Testing TodoDisplay component', () => {
    let wrapper;
    const todoSample = [
        { comment: 'テストtodo1', state: 'wip' },
        { comment: 'テストtodo2', state: 'wip' },
        { comment: 'テストtodo3', state: 'done' },
    ];
    // コンポーネント全体の確認
    afterEach(() => {
        wrapper.destroy();
    });
    it('コンポーネントが表示されているか確認', () => {
        wrapper = mount(TodoDisplay);
        expect(wrapper.isVueInstance).toBeTruthy();
        expect(wrapper.findComponent(TodoDisplay).exists()).toBe(true);
    });

    // 初期表示の確認
    it('tableのtheadが表示されているか確認', () => {
        wrapper = mount(TodoDisplay);
        expect(wrapper.find('thead').exists()).toBeTruthy();
        // thは4つ存在する
        expect(wrapper.findAll('th').length).toEqual(4);
        // クラス名ｓ'todo-it'と'comment-col'の
        expect(wrapper.find('.todo-it').exists()).toBeTruthy();
        expect(wrapper.find('.comment-col').exists()).toBeTruthy();
    });

    // todoが存在する場合
    it('todoが存在する場合の表示確認', () => {
        wrapper = mount(TodoDisplay, {
            propsData: {
                showState: 'all',
                todos: todoSample
            }
        });
        // ヘッダー行と合わせて4行のテーブルの存在確認
        // ラジオボタンの「すべて」が選択されている場合。
        expect(wrapper.findAll('tr').length).toEqual(4);
        // 作業中が2アイテム存在する。
        expect(wrapper.findAll('.wip-btn').length).toEqual(2);
        // 完了が1アイテム存在する。
        expect(wrapper.findAll('.done-btn').length).toEqual(1);
        // 表示されているテキスト確認
        expect(wrapper.text()).toContain('テストtodo1');
        expect(wrapper.text()).toContain('テストtodo2');
        expect(wrapper.text()).toContain('テストtodo3');
    })

    it('クリックイベントの発火確認', () => {
        wrapper = mount(TodoDisplay, {
            propsData: {
                showState: 'all',
                todos: todoSample
            }
        });
        // 状態変更ボタンの発火テスト
        wrapper.find('.wip-btn').trigger('click');
        expect(wrapper.emitted('changeStateIndex')).toBeTruthy();

        // 削除ボタンの発火テスト
        wrapper.find('.delete-btn').trigger('click');
        expect(wrapper.emitted('deleteTodoIndex')).toBeTruthy();
    })

    it('ラジオボタンの「作業中」が選択されている場合の表示確認', () => {
        wrapper = mount(TodoDisplay, {
            propsData: {
                showState: 'wip',
                todos: todoSample,
            }
        });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.wip-btn').length).toEqual(2);
        });
    });

    it('ラジオボタンの「完了」が選択されている場合の表示確認', () => {
        wrapper = mount(TodoDisplay, {
            propsData: {
                showState: 'done',
                todos: todoSample,
            }
        });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.done-btn').length).toEqual(1);
        });
    });
});
