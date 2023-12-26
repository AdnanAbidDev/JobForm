import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/Interfaces/job.interface';
import { ROUTE_PATHS } from 'src/app/constants/route-paths.constants';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
})
export class AddJobComponent {
  constructor(private jobService: JobService, private router: Router) {}

  onFormSubmit(jobData: Job) {
    this.jobService.addJob(jobData).subscribe({
      next: (res) => {
        console.log('Should show a toastr here: successfull');
        this.router.navigate([ROUTE_PATHS.VIEW]);
      },
      error: (error) => {
        console.log('Should show a toastr here: error');
        this.router.navigate([ROUTE_PATHS.VIEW]);
      },
    });
  }
}
