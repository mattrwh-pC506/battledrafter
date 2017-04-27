import { BattlemapperPage } from './app.po';

describe('battlemapper App', function() {
  let page: BattlemapperPage;

  beforeEach(() => {
    page = new BattlemapperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
