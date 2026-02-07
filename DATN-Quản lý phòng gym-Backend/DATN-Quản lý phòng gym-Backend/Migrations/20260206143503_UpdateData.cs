using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DATN_Quản_lý_phòng_gym_Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Packages",
                columns: new[] { "Id", "DurationMonths", "IsActive", "PackageName", "Price" },
                values: new object[,]
                {
                    { 1, 1, true, "Cơ Bản", 500000m },
                    { 2, 1, true, "Cao Cấp", 1000000m },
                    { 3, 1, true, "Ưu Tú", 1700000m }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2026, 2, 6, 21, 35, 2, 226, DateTimeKind.Local).AddTicks(3440), "$2a$11$q0hxXqmWq2cygeru.qTvkuKAEvFAMJcM5Ah8OPL9bgq59BPdVgnhG" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2026, 2, 6, 21, 35, 2, 366, DateTimeKind.Local).AddTicks(1462), "$2a$11$UDP09JFFbcvMAXt0dw/oP.ahz5NixVqiHT1uRFStpU3kv77zAtUcy" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2026, 2, 6, 21, 35, 2, 500, DateTimeKind.Local).AddTicks(1794), "$2a$11$7bBsT2dmQkCfaoTnAxDtpOEHYtPQ.xWZc1Qwnf3h0/NqaNT9L1Bhm" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2026, 2, 6, 21, 35, 2, 629, DateTimeKind.Local).AddTicks(6774), "$2a$11$x5/ory/dcgbJf/82PKT0ReiR9Ojm8YY/Ph9V9TvweT1DrM7z5SZ.K" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Packages",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Packages",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Packages",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2026, 2, 6, 21, 24, 58, 420, DateTimeKind.Local).AddTicks(3012), "$2a$11$PIuELjNEKCGdOMs0nga2Ke/Z/3HJYfjI5kTEnCo3a.DXTZUlwzNlm" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2026, 2, 6, 21, 24, 58, 712, DateTimeKind.Local).AddTicks(4792), "$2a$11$tZrDOXRv6bmFHlypOf5NKOizZ11doOF6gsCNmF0owN3pqAqptfiF." });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2026, 2, 6, 21, 24, 58, 840, DateTimeKind.Local).AddTicks(601), "$2a$11$F/32eai7etZRJ4Awyp4s3uB6IdDZg3EqJny1TIaBYrKKPZoGn10jC" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2026, 2, 6, 21, 24, 58, 970, DateTimeKind.Local).AddTicks(3939), "$2a$11$vdbI9MU.KnS3yuAbddE9iuj3zyWK5Njh0WakYPhLwLVckhEUYS5yO" });
        }
    }
}
