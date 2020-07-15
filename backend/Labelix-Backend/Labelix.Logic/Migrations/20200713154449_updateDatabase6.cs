using Microsoft.EntityFrameworkCore.Migrations;

namespace Labelix.Logic.Migrations
{
    public partial class updateDatabase6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_images_projects_ProjectId",
                table: "images");

            migrationBuilder.DropColumn(
                name: "ProjectImageId",
                table: "images");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "images",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_images_projects_ProjectId",
                table: "images",
                column: "ProjectId",
                principalTable: "projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_images_projects_ProjectId",
                table: "images");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "images",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "ProjectImageId",
                table: "images",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_images_projects_ProjectId",
                table: "images",
                column: "ProjectId",
                principalTable: "projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
