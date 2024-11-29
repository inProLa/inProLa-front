import {Component, inject, OnDestroy, signal} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SearchService} from "./search.service";
import {Subject, takeUntil} from "rxjs";
import {SearchResponse} from "./models/searchResponse";
import {MatCardModule} from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {UploadModalComponent} from "./components/upload-modal/upload-modal.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoadingInterceptor} from "../common/loading/loading.interceptor";

@Component({
  selector: 'search',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatIcon,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [SearchService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnDestroy{
  searchService = inject(SearchService);
  dialog = inject(MatDialog)

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

  onDownloadPdfButtonClick(file: SearchResponse) {
    this.searchService.downloadPDFAcademicWork(file.fileId)
      .pipe(takeUntil(this.subs))
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file.title}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }

  onDownloadZipButtonClick(file: SearchResponse) {
    this.searchService.downloadZIPAcademicWork(file.fileId)
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

  openUploadModal(): void {
    const dialogRef = this.dialog.open(UploadModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Modal closed with result:', result);
      }
    });
  }

  ngOnDestroy() {
    this.subs.next({});
    this.subs.complete();
  }
}
