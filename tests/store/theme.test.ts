import store from "../../src/store";
import { ThemeConfig } from "../../src/configs";

test('before resolving', () => {
  expect(store.getters['theme/get']).toBeNull();
});

test('after resolving', () => {
  store.dispatch('theme/resolve');

  const theme = store.getters['theme/get'];
  expect(theme).toEqual(ThemeConfig.default());
});