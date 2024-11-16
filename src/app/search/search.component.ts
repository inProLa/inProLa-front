import {Component, inject, OnDestroy, Signal, signal} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SearchService} from "./search.service";
import {Subject, takeUntil, tap} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {SearchResponse} from "./models/searchResponse";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'search',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatIcon, MatButtonModule, HttpClientModule, MatCardModule],
  providers: [SearchService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnDestroy{
  searchService = inject(SearchService);
  searchValue: string = '';
  tccs = signal<SearchResponse[]>([]);
  private subs = new Subject();

  onSearchButtonClick() {
    this.searchService.searchForAcademicWorks(this.searchValue)
      .pipe(
        takeUntil(this.subs),
      )
      .subscribe(value => {
        this.tccs.set(value);
      });
  }

  onDownloadButtonClick(file: SearchResponse) {
    this.searchService.downloadAcademicWork(file.fileId)
      .pipe(takeUntil(this.subs))
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file.title}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }

  ngOnDestroy() {
    this.subs.next({});
    this.subs.complete();
  }
}
