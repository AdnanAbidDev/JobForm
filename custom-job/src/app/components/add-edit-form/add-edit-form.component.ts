import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddEditSectionForm } from 'src/app/Interfaces/add-edit-section-form.interface';
import { Job } from 'src/app/Interfaces/job.interface';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.scss'],
})
export class AddEditFormComponent implements OnInit {
  @Input() job: Job | null = null; // For edit
  @Output() formSubmit = new EventEmitter<Job>();

  public jobForm!: FormGroup;
  public isPopUpVisible = false;
  public currentAction: { type: 'section' | 'field'; index?: string } = {
    type: 'section',
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['job'] && changes['job'].currentValue) {
      this.fillFormWithData(changes['job'].currentValue);
    }
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.jobForm = this.formBuilder.group({
      basicInfo: this.formBuilder.group({
        title: [null, Validators.required],
        startTime: [null, Validators.required],
        expiryTime: [null, Validators.required],
        duration: [null, Validators.required],
      }),
    });
  }

  private fillFormWithData(jobData: Job) {
    this.jobForm.patchValue({
      basicInfo: {
        title: jobData.jobTitle,
        startTime: jobData.startDate,
        expiryTime: jobData.expiryDate,
        duration: jobData.duration,
      },
    });

    jobData.sections.forEach((section) => {
      const sectionGroup = this.formBuilder.group({});
      section.fields.forEach((field) => {
        sectionGroup.addControl(
          field.fieldName,
          this.formBuilder.control(field.fieldValue, Validators.required)
        );
      });
      this.jobForm.addControl(section.sectionName, sectionGroup);
    });
  }

  addSection(): void {
    this.currentAction = { type: 'section' };
    this.isPopUpVisible = true;
  }

  addFieldToSection(sectionKey: string): void {
    this.currentAction = { type: 'field', index: sectionKey };
    this.isPopUpVisible = true;
  }

  handlePopupSubmit(event: {
    isSection: boolean;
    formValue?: AddEditSectionForm;
    name?: string;
  }): void {
    if (event.isSection && event.formValue) {
      const sectionName = event.formValue.name;
      const defaultFieldName = event.formValue.defaultField;
      const newSection = this.formBuilder.group({
        [defaultFieldName as string]: [null, Validators.required],
      });
      this.jobForm.addControl(sectionName, newSection);
    } else if (!event.isSection && this.currentAction.index && event.name) {
      const section = this.jobForm.get(this.currentAction.index) as FormGroup;
      section.addControl(
        event.name,
        this.formBuilder.control(null, Validators.required)
      );
    }

    this.isPopUpVisible = false;
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      const formValue = this.jobForm.value;

      const jobData = {
        jobId: formValue.basicInfo.id,
        jobTitle: formValue.basicInfo.title,
        startDate: formValue.basicInfo.startTime,
        expiryDate: formValue.basicInfo.expiryTime,
        duration: formValue.basicInfo.duration,
        sections: this.transformSectionsToApiFormat(formValue),
      };
      this.formSubmit.emit(jobData);
    }
  }

  transformSectionsToApiFormat(formValue: any): any[] {
    // Exclude 'basicInfo' and transform each section
    return Object.keys(formValue)
      .filter((key) => key !== 'basicInfo')
      .map((sectionKey) => {
        return {
          sectionName: sectionKey,
          fields: Object.keys(formValue[sectionKey]).map((fieldKey) => {
            return {
              fieldName: fieldKey,
              fieldValue: formValue[sectionKey][fieldKey],
            };
          }),
        };
      });
  }

  getDynamicSectionKeys(): string[] {
    return Object.keys(this.jobForm.controls).filter(
      (key) => key !== 'basicInfo'
    );
  }

  getFieldKeys(sectionKey: string): string[] {
    const section = this.jobForm.get(sectionKey) as FormGroup;
    return Object.keys(section.controls);
  }
}
