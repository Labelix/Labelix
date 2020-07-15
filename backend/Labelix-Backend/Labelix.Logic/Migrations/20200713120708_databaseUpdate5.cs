using Microsoft.EntityFrameworkCore.Migrations;

namespace Labelix.Logic.Migrations
{
    public partial class databaseUpdate5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LabeledPath",
                table: "images");

            migrationBuilder.AddColumn<string>(
                name: "LabeledPath",
                table: "projects",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LabeledPath",
                table: "projects");

            migrationBuilder.AddColumn<string>(
                name: "LabeledPath",
                table: "images",
                type: "text",
                nullable: true);
        }
    }
}
