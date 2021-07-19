import { mount } from '@vue/test-utils';
import App from '@/App';
import TodoFilter from '@/components/TodoFilter';
import TodoDisplay from '@/components/TodoDisplay';
import TodoInput from '@/components/TodoInput';

describe('Testing App component', () => {
    let wrapper;
    describe('アプリケーション全体の確認', () => {
        beforeEach(() => {
            wrapper = mount(App)
        });

        afterEach(() => {
            wrapper.destroy();
        });

        it('Appコンポーネントが表示されている', () => {
            expect(wrapper.isVueInstance).toBeTruthy();
            expect(wrapper.findComponent(App).exists()).toBe(true);
            expect(wrapper.find('h1').text()).toBe('TodoList');
        });

        it('子コンポーネントがそれぞれ表示されている', () => {
            expect(wrapper.findComponent(TodoFilter).exists()).toBe(true);
            expect(wrapper.findComponent(TodoDisplay).exists()).toBe(true);
            expect(wrapper.findComponent(TodoInput).exists()).toBe(true);
        });
    });

    describe('コンポーネント間のテスト', () => {
        let radios;
        const todoSample = [
            { comment: 'テストtodo1', state: 'wip' },
            { comment: 'テストtodo2', state: 'wip' },
            { comment: 'テストtodo3', state: 'done' },
        ];

        beforeEach(() => {
            wrapper = mount(App, {
                data() {
                    return {
                        showState: 'all',
                        todos: todoSample
                    }
                }
            });
        });

        afterEach(() => {
            wrapper.destroy();
        });

        describe('TodoFilterテスト', () => {
            beforeEach(() => {
                const todoFilter = wrapper.findComponent(TodoFilter);
                radios = todoFilter.findAll('input[type="radio"]');
            })

            describe('表示する状態の選択にあわせてTodoの表示数テスト', () => {
                it('「すべて」が選択されると3つのtodoリストが表示されること', async () => {
                    await radios.at(0).trigger('change');
                    expect(wrapper.findAll('.todo-index').length).toEqual(3);
                });

                it('「作業中」が選択されると2つのtodoリストが表示されること', async () => {
                    await radios.at(1).trigger('change');
                    expect(wrapper.findAll('.todo-index').length).toEqual(2);
                });

                it('「完了」が選択されると1つのtodoリストが表示されること', async () => {
                    await radios.at(2).trigger('change');
                    expect(wrapper.findAll('.todo-index').length).toEqual(1);
                });
            });
        });

        describe('TodoDisplayテスト', () => {
            let wipBtn;
            let doneBtn;
            let delBtn;

            beforeEach(() => {
                const todoSample = [
                    { comment: 'テストtodo1', state: 'wip' },
                    { comment: 'テストtodo2', state: 'wip' },
                    { comment: 'テストtodo3', state: 'done' },
                ];

                wrapper = mount(App, {
                    data() {
                        return {
                            showState: 'all',
                            todos: todoSample
                        }
                    }
                });

                const todoDisplay = wrapper.findComponent(TodoDisplay);
                wipBtn = todoDisplay.findAll('.wip-btn');
                doneBtn = todoDisplay.findAll('.done-btn');
                delBtn = todoDisplay.findAll('.delete-btn');
            });

            afterEach(() => {
                wrapper.destroy();
            });

            describe('状態ボタンの変更テスト', () => {
                it('作業中ボタンをクリックすると完了に変更されること', async () => {
                    await wipBtn.at(0).trigger('click');
                    expect(wrapper.findAll('.wip-btn').length).toEqual(1);
                    expect(wrapper.findAll('.done-btn').length).toEqual(2);
                });

                it('完了ボタンをクリックすると作業中に変更されること', async () => {
                    await doneBtn.at(0).trigger('click');
                    expect(wrapper.findAll('.wip-btn').length).toEqual(3);
                    expect(wrapper.findAll('.done-btn').length).toEqual(0);
                });

                it('削除ボタンをクリックするとtodoが削除されること', async () => {
                    await delBtn.at(0).trigger('click');
                    expect(wrapper.findAll('.todo-index').length).toEqual(2);
                    expect(wrapper.findAll('.wip-btn').length).toEqual(1);
                    expect(wrapper.findAll('.done-btn').length).toEqual(1);
                });
            });
        });

        describe('TodoInputテスト', () => {
            let inputField;
            let addBtn;
            beforeEach(() => {
                const todoSample = [
                    { comment: 'テストtodo1', state: 'wip' },
                    { comment: 'テストtodo2', state: 'wip' },
                    { comment: 'テストtodo3', state: 'done' },
                ];
                wrapper = mount(App, {
                    data() {
                        return {
                            showState: 'all',
                            todos: todoSample
                        }
                    }
                });
                const todoInput = wrapper.findComponent(TodoInput);
                inputField = todoInput.find('input[type="text"]');
                addBtn = todoInput.find('button');
            });
            it('Todoが追加されること', async () => {
                await inputField.setValue('new todo');
                await addBtn.trigger('click');
                expect(wrapper.findAll('.todo-index').length).toBe(4);
                expect(wrapper.findAll('.todo-comment').at(3).text()).toBe('new todo');
            });
        });
    });
});
