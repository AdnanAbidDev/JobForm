namespace JobFormAPI.dtos
{
    public class SectionDto
    {
        public int SectionId { get; set; }
        public string SectionName { get; set; }

        public List<FieldDto> Fields { get; set; }
    }
}
