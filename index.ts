// 畫面上的 DOM 物件操作程式
import * as domUtils from './dom-utils';

// 存取 API 資料的程式碼
import * as dataUtils from './data-utils';
import { fromEvent } from 'rxjs';
import {
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';

const keyword$ = fromEvent(document.querySelector('#keyword'), 'input').pipe(
  map((event) => (event.target as HTMLInputElement).value)
);

keyword$
  .pipe(
    debounceTime(700),
    distinctUntilChanged(),
    filter((keyword) => keyword.length >= 3),
    switchMap((keyword) => {
      return dataUtils.getSuggestions(keyword);
    })
  )
  .subscribe((suggestions) => {
    domUtils.fillAutoSuggestions(suggestions);
  });

// 不會動
fromEvent(document.querySelector('#search'), 'click')
  .pipe(
    switchMap(() => keyword$),
    switchMap((keyword) => {
      return dataUtils.getSearchResult(keyword);
    })
  )
  .subscribe((result) => {
    domUtils.fillSearchResult(result);
  });
