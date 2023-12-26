import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/Interfaces/job.interface';
import { ROUTE_PATHS } from 'src/app/constants/route-paths.constants';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
})
export class EditJobComponent {
  job: Job | null = null;
  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const jobId = params['id'];
      if (jobId) {
        this.jobService.getJobById(jobId).subscribe((job) => (this.job = job));
      }
    });
  }

  onFormSubmit(jobData: Job) {
    if (this.job) {
      const updatedJobData = this.mergeIdsIntoJobData(jobData, this.job);
      updatedJobData.jobId = this.job.jobId;

      this.jobService.updateJob(this.job.jobId, updatedJobData).subscribe({
        next: (res) => {
          console.log('Should show a toastr here: successfull');
          this.router.navigate([ROUTE_PATHS.VIEW]);
        },
        error: (error) => {
          console.log('Should show a toastr here: successfull');
          this.router.navigate([ROUTE_PATHS.VIEW]);
        },
      });
    }
  }

  private mergeIdsIntoJobData(newJobData: Job, originalJob: Job): Job {
    // Clone the new job data to avoid mutating the original object
    const mergedJobData = JSON.parse(JSON.stringify(newJobData));

    // Iterate through sections to merge sectionId
    mergedJobData.sections.forEach((newSection: any, index: number) => {
      const originalSection = originalJob.sections.find(
        (section) => section.sectionName === newSection.sectionName
      );
      if (originalSection) {
        // Merge sectionId
        newSection.sectionId = originalSection.sectionId;

        // Iterate through fields to merge fieldId
        newSection.fields.forEach((newField: any) => {
          const originalField = originalSection.fields.find(
            (field) => field.fieldName === newField.fieldName
          );
          if (originalField) {
            // Merge fieldId
            newField.fieldId = originalField.fieldId;
          }
        });
      }
    });

    return mergedJobData;
  }
}
