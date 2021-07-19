import { mount } from '@vue/test-utils';
import App from '@/App';

describe('Testing TodoFilter component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(App)
    });

    afterEach(() => {
        wrapper.destroy();
    });

    describe('アプリケーション全体の確認', () => {
        it('アプリケーションが表示されている', () => {
            expect(wrapper.isVueInstance).toBeTruthy();
            expect(wrapper.findComponent(App).exists()).toBe(true);
        });
    });
});
