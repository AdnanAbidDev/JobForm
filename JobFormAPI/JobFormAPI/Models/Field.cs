namespace JobFormAPI.Models
{
    public class Field
    {
        public int FieldId { get; set; }
        public string FieldName { get; set; }
        public string FieldValue { get; set; }

        // Foreign key for Section
        public int SectionId { get; set; }
        public Section Section { get; set; } // Navigation property back to Section
    }
}
