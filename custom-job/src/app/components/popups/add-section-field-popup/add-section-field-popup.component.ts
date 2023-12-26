import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddEditSectionForm } from 'src/app/Interfaces/add-edit-section-form.interface';

@Component({
  selector: 'app-add-section-field-popup',
  templateUrl: './add-section-field-popup.component.html',
  styleUrls: ['./add-section-field-popup.component.scss'],
})
export class AddSectionFieldPopupComponent {
  public popupForm: FormGroup;
  @Input() isPopUpVisible = false;
  @Input() isSection = true;
  @Output() isPopUpVisibleChange = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<{
    isSection: boolean;
    formValue?: AddEditSectionForm;
    name?: string;
  }>();

  constructor(private formBuilder: FormBuilder) {
    this.popupForm = this.formBuilder.group({
      name: [null, Validators.required],
      defaultField: [null, Validators.required],
    });
  }

  close(): void {
    this.isPopUpVisible = false;
    this.isPopUpVisibleChange.emit(this.isPopUpVisible);
  }

  onSubmit(): void {
    if (this.popupForm.valid) {
      const formValue: AddEditSectionForm = this.popupForm.value;

      if (this.isSection) {
        this.submitEvent.emit({
          isSection: this.isSection,
          formValue: formValue,
        });
      } else {
        this.submitEvent.emit({
          isSection: this.isSection,
          name: formValue.name,
        });
      }

      this.close();
    }
  }
}
