namespace JobFormAPI.dtos
{
    public class JobDto
    {
        public int JobId { get; set; }
        public string JobTitle { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int Duration { get; set; }

        public List<SectionDto> Sections { get; set; }
    }
}
