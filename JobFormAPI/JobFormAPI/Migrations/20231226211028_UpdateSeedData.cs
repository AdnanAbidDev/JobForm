using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobFormAPI.Migrations
{
    public partial class UpdateSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Jobs",
                columns: new[] { "JobId", "Duration", "ExpiryDate", "JobTitle", "StartDate" },
                values: new object[] { 1, 10, new DateTime(2023, 1, 1, 18, 0, 0, 0, DateTimeKind.Unspecified), "Handyman Services", new DateTime(2023, 1, 1, 8, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "Jobs",
                columns: new[] { "JobId", "Duration", "ExpiryDate", "JobTitle", "StartDate" },
                values: new object[] { 2, 8, new DateTime(2023, 1, 2, 17, 0, 0, 0, DateTimeKind.Unspecified), "Certified Plumber", new DateTime(2023, 1, 2, 9, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "Sections",
                columns: new[] { "SectionId", "JobId", "SectionName" },
                values: new object[] { 1, 1, "Details" });

            migrationBuilder.InsertData(
                table: "Sections",
                columns: new[] { "SectionId", "JobId", "SectionName" },
                values: new object[] { 2, 1, "Additional Info" });

            migrationBuilder.InsertData(
                table: "Sections",
                columns: new[] { "SectionId", "JobId", "SectionName" },
                values: new object[] { 3, 2, "Requirements" });

            migrationBuilder.InsertData(
                table: "Fields",
                columns: new[] { "FieldId", "FieldName", "FieldValue", "SectionId" },
                values: new object[,]
                {
                    { 1, "Description", "General repair works", 1 },
                    { 2, "Time Estimate", "2 hours", 1 },
                    { 3, "Customer Notes", "Be careful with the garden", 2 },
                    { 4, "Special Requirements", "Bring extra tools", 2 },
                    { 5, "Tools Needed", "Wrench, Pliers", 3 },
                    { 6, "Materials", "PVC pipes, Sealant", 3 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Fields",
                keyColumn: "FieldId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Fields",
                keyColumn: "FieldId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Fields",
                keyColumn: "FieldId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Fields",
                keyColumn: "FieldId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Fields",
                keyColumn: "FieldId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Fields",
                keyColumn: "FieldId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "SectionId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "SectionId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "SectionId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Jobs",
                keyColumn: "JobId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Jobs",
                keyColumn: "JobId",
                keyValue: 2);
        }
    }
}
