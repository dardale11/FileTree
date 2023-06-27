import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  searchTerm: string = '';
  private searchSubject = new Subject<string>();
  private debounceTimeMs = 300;

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs), distinctUntilChanged())
      .subscribe((term) => {
        this.onSearch.emit(term);
      });
  }

  onSearchInputChange() {
    this.searchSubject.next(this.searchTerm);
  }
}
