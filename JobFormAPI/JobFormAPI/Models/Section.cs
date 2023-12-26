namespace JobFormAPI.Models
{
    public class Section
    {
        public int SectionId { get; set; }
        public string SectionName { get; set; }

        // Foreign key for Job
        public int JobId { get; set; }
        public Job Job { get; set; } // Navigation property back to Job

        // Navigation property for related fields
        public List<Field> Fields { get; set; }
    }
}
