using Microsoft.EntityFrameworkCore.Migrations;

namespace Labelix.Logic.Migrations
{
    public partial class updateDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_images_ProjectSet_ProjectImageId",
                table: "images");

            migrationBuilder.DropIndex(
                name: "IX_images_ProjectImageId",
                table: "images");

            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "images",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_images_ProjectId",
                table: "images",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_images_ProjectSet_ProjectId",
                table: "images",
                column: "ProjectId",
                principalTable: "ProjectSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_images_ProjectSet_ProjectId",
                table: "images");

            migrationBuilder.DropIndex(
                name: "IX_images_ProjectId",
                table: "images");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "images");

            migrationBuilder.CreateIndex(
                name: "IX_images_ProjectImageId",
                table: "images",
                column: "ProjectImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_images_ProjectSet_ProjectImageId",
                table: "images",
                column: "ProjectImageId",
                principalTable: "ProjectSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
