import { WwPage } from './app.po';

describe('ww App', () => {
  let page: WwPage;

  beforeEach(() => {
    page = new WwPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
