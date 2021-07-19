import { shallowMount } from '@vue/test-utils';
import TodoFilter from '@/components/TodoFilter';

describe('Testing TodoFilter component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(TodoFilter)
    });

    afterEach(() => {
    wrapper.destroy();
    });

    describe('コンポーネント全体の確認', () => {
        it('コンポーネントが表示されている', () => {
            // wrapper = shallowMount(TodoFilter);
            expect(wrapper.isVueInstance).toBeTruthy();
            expect(wrapper.findComponent(TodoFilter).exists()).toBe(true);
        });

        it('コンポーネントの各要素の表示されている', () => {
            // wrapper = shallowMount(TodoFilter);
            const labels = wrapper.findAll('label');
            expect(labels.at(0).text()).toBe('すべて');
            expect(labels.at(1).text()).toBe('作業中');
            expect(labels.at(2).text()).toBe('完了');
        });
    });

    describe('ラジオボタンの選択状態確認', () => {
        let radioInput;
        beforeEach(() => {
            radioInput = wrapper.findAll('input[type="radio"]');
            expect(radioInput.length).toBe(3);
        })

        it('「すべて」が選択されている', async () => {
            await radioInput.at(0).setChecked();
            expect(radioInput.at(0).element.checked).toBe(true);
            expect(radioInput.at(1).element.checked).toBe(false);
            expect(radioInput.at(2).element.checked).toBe(false);
            expect(radioInput.at(0).element.value).toBe('all');
        });

        it('「作業中」が選択されている', async () => {
            await radioInput.at(1).setChecked();
            expect(radioInput.at(0).element.checked).toBe(false);
            expect(radioInput.at(1).element.checked).toBe(true);
            expect(radioInput.at(2).element.checked).toBe(false);
            expect(radioInput.at(1).element.value).toBe('wip');

        });

        it('「完了」が選択されている', async () => {
            await radioInput.at(2).setChecked();
            expect(radioInput.at(0).element.checked).toBe(false);
            expect(radioInput.at(1).element.checked).toBe(false);
            expect(radioInput.at(2).element.checked).toBe(true);
            expect(radioInput.at(2).element.value).toBe('done');

        });

        it('各状態選択時にイベントが発火する', async () => {
            for (let i = 0; i < radioInput.length; i++) {
                await radioInput.at(i).setChecked();
                await radioInput.at(i).trigger('change');
                expect(wrapper.emitted('selectState')).toBeTruthy();
            }
        });
    });
});
