using JobFormAPI.Data;
using JobFormAPI.dtos;
using JobFormAPI.Models;
using Microsoft.EntityFrameworkCore;

public class JobService : IJobService
{
    private readonly DataContext _context;

    public JobService(DataContext context)
    {
        _context = context;
    }

    // Add a new job
    public async Task AddJob(JobDto jobDto)
    {
        var job = new Job
        {
            JobTitle = jobDto.JobTitle,
            StartDate = jobDto.StartDate,
            ExpiryDate = jobDto.ExpiryDate,
            Duration = jobDto.Duration,
            Sections = jobDto.Sections?.Select(s => new Section
            {
                SectionName = s.SectionName,
                Fields = s.Fields?.Select(f => new Field
                {
                    FieldName = f.FieldName,
                    FieldValue = f.FieldValue
                }).ToList()
            }).ToList()
        };

        _context.Jobs.Add(job);
        await _context.SaveChangesAsync();
    }


    // Get a job by ID
    public async Task<JobDto> GetJobById(int jobId)
    {
        var job = await _context.Jobs
            .Include(j => j.Sections)
            .ThenInclude(s => s.Fields)
            .FirstOrDefaultAsync(j => j.JobId == jobId);

        if (job == null) return null;

        // Convert to DTO, including Sections and Fields
        var jobDto = new JobDto
        {
            JobId = job.JobId,
            JobTitle = job.JobTitle,
            StartDate = job.StartDate,
            ExpiryDate = job.ExpiryDate,
            Duration = job.Duration,
            Sections = job.Sections.Select(s => new SectionDto
            {
                SectionId = s.SectionId,
                SectionName = s.SectionName,
                Fields = s.Fields.Select(f => new FieldDto
                {
                    FieldId = f.FieldId,
                    FieldName = f.FieldName,
                    FieldValue = f.FieldValue
                }).ToList()
            }).ToList()
        };

        return jobDto;
    }


    // Get all jobs
    public async Task<List<JobDto>> GetAllJobs()
    {
        var jobs = await _context.Jobs
            .Include(j => j.Sections)
            .ThenInclude(s => s.Fields)
            .ToListAsync();

        var jobDtos = jobs.Select(job => new JobDto
        {
            JobId = job.JobId,
            JobTitle = job.JobTitle,
            StartDate = job.StartDate,
            ExpiryDate = job.ExpiryDate,
            Duration = job.Duration,
            Sections = job.Sections.Select(s => new SectionDto
            {
                SectionId = s.SectionId,
                SectionName = s.SectionName,
                Fields = s.Fields.Select(f => new FieldDto
                {
                    FieldId = f.FieldId,
                    FieldName = f.FieldName,
                    FieldValue = f.FieldValue
                }).ToList()
            }).ToList()
        }).ToList();

        return jobDtos;
    }


    // Update a job
    public async Task UpdateJob(JobDto jobDto)
    {
        var job = await _context.Jobs
                                .Include(j => j.Sections)
                                .ThenInclude(s => s.Fields)
                                .FirstOrDefaultAsync(j => j.JobId == jobDto.JobId);

        if (job == null)
        {
            throw new KeyNotFoundException("Job not found");
        }

        // Update job details
        job.JobTitle = jobDto.JobTitle;
        job.StartDate = jobDto.StartDate;
        job.ExpiryDate = jobDto.ExpiryDate;
        job.Duration = jobDto.Duration;

        // Handle updates or addition of sections
        foreach (var sectionDto in jobDto.Sections)
        {
            var section = job.Sections.FirstOrDefault(s => s.SectionId == sectionDto.SectionId);
            if (section == null)
            {
                section = new Section { SectionName = sectionDto.SectionName };
                job.Sections.Add(section);
            }
            else
            {
                section.SectionName = sectionDto.SectionName;
            }

            // Update or add fields
            foreach (var fieldDto in sectionDto.Fields)
            {
                var field = section.Fields.FirstOrDefault(f => f.FieldId == fieldDto.FieldId);
                if (field == null)
                {
                    field = new Field { FieldName = fieldDto.FieldName, FieldValue = fieldDto.FieldValue };
                    section.Fields.Add(field);
                }
                else
                {
                    field.FieldName = fieldDto.FieldName;
                    field.FieldValue = fieldDto.FieldValue;
                }
            }

            // Remove fields not in update
            section.Fields.RemoveAll(f => !sectionDto.Fields.Any(fdto => fdto.FieldId == f.FieldId));
        }

        // Remove sections not in update
        job.Sections.RemoveAll(s => !jobDto.Sections.Any(sdto => sdto.SectionId == s.SectionId));

        _context.Update(job);
        await _context.SaveChangesAsync();
    }


    // Other methods (e.g., delete)...
}
