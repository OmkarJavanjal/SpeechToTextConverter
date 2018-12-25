import { ChatappPage } from './app.po';

describe('chatapp App', () => {
  let page: ChatappPage;

  beforeEach(() => {
    page = new ChatappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
