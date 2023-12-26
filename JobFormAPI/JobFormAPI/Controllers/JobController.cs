using Microsoft.AspNetCore.Mvc;
using JobFormAPI.dtos;

[Route("api/[controller]")]
[ApiController]
public class JobController : ControllerBase
{
    private readonly IJobService _jobService;

    public JobController(IJobService jobService)
    {
        _jobService = jobService;
    }

    // POST: api/Job
    [HttpPost]
    public async Task<ActionResult> CreateJob([FromBody] JobDto jobDto)
    {
        try
        {
            await _jobService.AddJob(jobDto);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    // GET: api/Job
    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobDto>>> GetAllJobs()
    {
        try
        {
            var jobs = await _jobService.GetAllJobs(); // Method to be implemented in JobService
            return Ok(jobs);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    // GET: api/Job/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<JobDto>> GetJob(int id)
    {
        try
        {
            var job = await _jobService.GetJobById(id);
            if (job == null)
            {
                return NotFound();
            }
            return Ok(job);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    // PUT: api/Job/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateJob(int id, [FromBody] JobDto jobDto)
    {
        try
        {
            if (id != jobDto.JobId)
            {
                return BadRequest("Job ID mismatch");
            }

            var jobToUpdate = await _jobService.GetJobById(id);
            if (jobToUpdate == null)
            {
                return NotFound();
            }

            await _jobService.UpdateJob(jobDto);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    // Other actions (e.g., DELETE) can be added here...
}
