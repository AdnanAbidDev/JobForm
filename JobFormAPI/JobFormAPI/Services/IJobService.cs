using JobFormAPI.dtos;

public interface IJobService
{
    Task AddJob(JobDto jobDto);
    Task<List<JobDto>> GetAllJobs();
    Task<JobDto> GetJobById(int jobId);
    Task UpdateJob(JobDto jobDto);
}