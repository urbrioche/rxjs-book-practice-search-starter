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
} from 'rxjs/operators';

const keyword$ = fromEvent(document.querySelector('#keyword'), 'input').pipe(
  map((event) => (event.target as HTMLInputElement).value)
);

keyword$
  .pipe(
    debounceTime(700),
    distinctUntilChanged(),
    switchMap((keyword) => {
      return dataUtils.getSuggestions(keyword);
    })
  )
  .subscribe((suggestions) => {
    domUtils.fillAutoSuggestions(suggestions);
  });
