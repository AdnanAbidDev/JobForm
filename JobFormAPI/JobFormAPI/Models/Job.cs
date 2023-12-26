namespace JobFormAPI.Models
{
    public class Job
    {
        public int JobId { get; set; }
        public string JobTitle { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int Duration { get; set; }

        // Navigation property for related sections
        public List<Section> Sections { get; set; }
    }

}
