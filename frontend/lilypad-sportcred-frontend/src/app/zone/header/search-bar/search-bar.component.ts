import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { SearchResultsComponent } from '../../search-results/search-results.component';
import { searchForResults } from '../../store/actions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  search = '';

  constructor(private store: Store<AppState>, private matDialog: MatDialog) {}

  searchForResults(): void {
    this.store.dispatch(searchForResults({ search: this.search }));
    this.matDialog.open(SearchResultsComponent, {
      height: '30rem',
      width: '25rem',
    });
  }
}
