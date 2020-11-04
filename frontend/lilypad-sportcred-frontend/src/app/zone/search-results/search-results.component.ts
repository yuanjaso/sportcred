import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ZoneService } from '../zone.service';
import { SearchResults } from '../zone.types';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  results$: Observable<SearchResults>;

  constructor(private zoneService: ZoneService) {}

  ngOnInit(): void {
    this.results$ = this.zoneService.searchResults$.pipe(tap(console.log));
  }
}
