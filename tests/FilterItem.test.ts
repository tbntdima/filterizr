/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import test utils
import * as $ from 'jquery';
import { fakeDom } from './testSetup';
// import items to be tested
import FilterItem from '../src/FilterItem';
import FilterizrOptions from '../src/FilterizrOptions/FilterizrOptions';

// General setup
(window as any).$ = $;

/**
 * Test suite for FilterItem
 */
describe('FilterItem', () => {
  beforeEach(() => {
    $('body').html(fakeDom);
  });

  describe('#constructor', () => {
    it('should return a new instance of the FilterItem class', () => {
      const filterItem = new FilterItem(
        $('.filtr-item:first').get(0),
        0,
        new FilterizrOptions({})
      );
      expect(filterItem instanceof FilterItem).toBe(true);
    });

    it('should set inline styles on the .filtr-item element', () => {
      const filtrItem = $('.filtr-item:first');
      const beforeInlineStyles = filtrItem.attr('style');
      new FilterItem(filtrItem.get(0), 0, new FilterizrOptions({}));
      const afterInlineStyles = filtrItem.attr('style');
      expect(beforeInlineStyles).not.toEqual(afterInlineStyles);
    });
  });

  describe('#filterIn', () => {
    it('should update the inner lastPosition property to equal the position argument', () => {
      const filterItem = new FilterItem(
        $('.filtr-item:first').get(0),
        0,
        new FilterizrOptions({})
      );
      const position = { left: 15, top: 100 };
      filterItem.filterIn(position, {});
      expect(filterItem['lastPosition'].left).toEqual(15);
      expect(filterItem['lastPosition'].top).toEqual(100);
    });

    it('should set the filteredOut property to false', () => {
      const filterItem = new FilterItem(
        $('.filtr-item:first').get(0),
        0,
        new FilterizrOptions({})
      );
      const position = { left: 15, top: 100 };
      filterItem.filterIn(position, {});
      expect(filterItem['filteredOut']).toEqual(false);
    });
  });

  describe('#filterOut', () => {
    it('should set the filteredOut property to true', () => {
      const filterItem = new FilterItem(
        $('.filtr-item:first').get(0),
        0,
        new FilterizrOptions({})
      );
      const position = { left: 15, top: 100 };
      filterItem.filterOut(position);
      expect(filterItem['filteredOut']).toEqual(true);
    });
  });

  describe('#calcDelay', () => {
    let filterItem1: FilterItem,
      filterItem2: FilterItem,
      filterItem3: FilterItem;
    beforeEach(() => {
      filterItem1 = new FilterItem(
        $('.filtr-item:first').get(0),
        0,
        new FilterizrOptions({})
      );
      filterItem2 = new FilterItem(
        $('.filtr-item:first').get(0),
        1,
        new FilterizrOptions({})
      );
      filterItem3 = new FilterItem(
        $('.filtr-item:first').get(0),
        2,
        new FilterizrOptions({})
      );
    });

    it('should return delay multiplied by index for "progressive" mode', () => {
      const delay = 150;
      const mode = 'progressive';
      expect(filterItem1.getTransitionDelay(delay, mode)).toEqual(0);
      expect(filterItem2.getTransitionDelay(delay, mode)).toEqual(150);
      expect(filterItem3.getTransitionDelay(delay, mode)).toEqual(300);
    });

    it('should return delay for even items and 0 for odd items for "alternate" mode', () => {
      const delay = 150;
      const mode = 'alternate';
      expect(filterItem1.getTransitionDelay(delay, mode)).toEqual(150);
      expect(filterItem2.getTransitionDelay(delay, mode)).toEqual(0);
      expect(filterItem3.getTransitionDelay(delay, mode)).toEqual(150);
    });
  });

  describe('#contentsMatchSearch', () => {
    it('should return true when the innerText of the FilterItem matches the search term', () => {
      const filterItem = new FilterItem(
        $('.filtr-item:first').get(0),
        0,
        new FilterizrOptions({})
      );
      expect(filterItem.contentsMatchSearch('streets')).toEqual(true);
    });

    it('should return false when the innerText of the FilterItem does not match the search term', () => {
      const filterItem = new FilterItem(
        $('.filtr-item:first').get(0),
        0,
        new FilterizrOptions({})
      );
      expect(filterItem.contentsMatchSearch('iamnotthere')).toEqual(false);
    });
  });

  describe('#getCategories', () => {
    it('should return an array with the value of the data-category attribute on the .filtr-item delimited by ","', () => {
      const filterItem = new FilterItem(
        $('.filtr-item:first').get(0),
        0,
        new FilterizrOptions({})
      );
      expect(filterItem.getCategories()).toEqual(['1', '5']);
      filterItem.node.setAttribute('data-category', '1, 5, pizza');
      expect(filterItem.getCategories()).toEqual(['1', '5', 'pizza']);
    });
  });
});
