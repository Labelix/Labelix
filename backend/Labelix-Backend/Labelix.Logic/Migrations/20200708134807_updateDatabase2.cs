using Microsoft.EntityFrameworkCore.Migrations;

namespace Labelix.Logic.Migrations
{
    public partial class updateDatabase2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_images_ProjectSet_ProjectId",
                table: "images");

            migrationBuilder.DropForeignKey(
                name: "FK_LabelSet_ProjectSet_ProjectLabelId",
                table: "LabelSet");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectSet",
                table: "ProjectSet");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LabelSet",
                table: "LabelSet");

            migrationBuilder.RenameTable(
                name: "ProjectSet",
                newName: "projects");

            migrationBuilder.RenameTable(
                name: "LabelSet",
                newName: "labels");

            migrationBuilder.RenameIndex(
                name: "IX_LabelSet_ProjectLabelId",
                table: "labels",
                newName: "IX_labels_ProjectLabelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_projects",
                table: "projects",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_labels",
                table: "labels",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_images_projects_ProjectId",
                table: "images",
                column: "ProjectId",
                principalTable: "projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_labels_projects_ProjectLabelId",
                table: "labels",
                column: "ProjectLabelId",
                principalTable: "projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_images_projects_ProjectId",
                table: "images");

            migrationBuilder.DropForeignKey(
                name: "FK_labels_projects_ProjectLabelId",
                table: "labels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_projects",
                table: "projects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_labels",
                table: "labels");

            migrationBuilder.RenameTable(
                name: "projects",
                newName: "ProjectSet");

            migrationBuilder.RenameTable(
                name: "labels",
                newName: "LabelSet");

            migrationBuilder.RenameIndex(
                name: "IX_labels_ProjectLabelId",
                table: "LabelSet",
                newName: "IX_LabelSet_ProjectLabelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectSet",
                table: "ProjectSet",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LabelSet",
                table: "LabelSet",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_images_ProjectSet_ProjectId",
                table: "images",
                column: "ProjectId",
                principalTable: "ProjectSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LabelSet_ProjectSet_ProjectLabelId",
                table: "LabelSet",
                column: "ProjectLabelId",
                principalTable: "ProjectSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
