import { BattledrafterPage } from './app.po';

describe('battledrafter App', function() {
  let page: BattledrafterPage;

  beforeEach(() => {
    page = new BattledrafterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
