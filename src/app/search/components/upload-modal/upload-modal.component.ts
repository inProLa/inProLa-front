import {Component, inject} from '@angular/core';
import {MatLabel} from "@angular/material/form-field";
import { MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SearchService} from "../../search.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [
    MatLabel,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SearchService],
  templateUrl: './upload-modal.component.html',
  styleUrl: './upload-modal.component.scss'
})
export class UploadModalComponent {
  searchService = inject(SearchService);
  dialogRef = inject(MatDialogRef);
  fb = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);

  uploadForm: FormGroup = this.fb.group({
    title: ['', Validators.required]
  });
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.uploadForm.valid && this.selectedFile) {
      const title = this.uploadForm.get('title')?.value;
      this.searchService.uploadNovoTrabalho(title, this.selectedFile).subscribe(() => {
          this._snackBar.open('Arquivo enviado com sucesso', 'Fechar', {duration: 2000})
        this.dialogRef.close(true);
      },
        (err) => {
        console.log(err)
          this._snackBar.open('Erro ao fazer upload do arquivo', 'Fechar', {duration: 2000});
        }
      );
    }
  }
}
