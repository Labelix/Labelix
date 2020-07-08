using Microsoft.EntityFrameworkCore.Migrations;

namespace Labelix.Logic.Migrations
{
    public partial class updateDatabase3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_labels_projects_ProjectLabelId",
                table: "labels");

            migrationBuilder.DropIndex(
                name: "IX_labels_ProjectLabelId",
                table: "labels");

            migrationBuilder.DropColumn(
                name: "ProjectLabelId",
                table: "labels");

            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "labels",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_labels_ProjectId",
                table: "labels",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_labels_projects_ProjectId",
                table: "labels",
                column: "ProjectId",
                principalTable: "projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_labels_projects_ProjectId",
                table: "labels");

            migrationBuilder.DropIndex(
                name: "IX_labels_ProjectId",
                table: "labels");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "labels");

            migrationBuilder.AddColumn<int>(
                name: "ProjectLabelId",
                table: "labels",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_labels_ProjectLabelId",
                table: "labels",
                column: "ProjectLabelId");

            migrationBuilder.AddForeignKey(
                name: "FK_labels_projects_ProjectLabelId",
                table: "labels",
                column: "ProjectLabelId",
                principalTable: "projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
