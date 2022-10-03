using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChallengeTwoApi.Migrations
{
    public partial class Refactor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "File",
                table: "Journals",
                newName: "PathFile");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PathFile",
                table: "Journals",
                newName: "File");
        }
    }
}
