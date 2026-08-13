/**
 * Export all study program curriculum data to markdown (for knowledge AI / RAG).
 * Usage: node scripts/export-study-programs-md.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const root = path.resolve(import.meta.dirname, "..");
const outPath = path.join(root, "docs/study-programs-knowledge.md");

function courseCount(program) {
  return program.courseGroups.reduce((n, g) => n + g.courses.length, 0);
}

function programToMarkdown(faculty, program) {
  const lines = [];
  lines.push(`## ${program.title}`);
  lines.push("");
  lines.push(`| Field | Value |`);
  lines.push(`| --- | --- |`);
  lines.push(`| **Faculty** | ${faculty.title} |`);
  lines.push(`| **Program ID** | \`${program.id}\` |`);
  lines.push(`| **Code** | ${program.code} |`);
  lines.push(`| **Degree** | ${program.degreeLevel} |`);
  lines.push(`| **Duration** | ${program.duration} |`);
  lines.push(`| **Qualification** | ${program.qualification} |`);
  lines.push(`| **Tuition fee** | ${program.tuitionFee} |`);
  if (program.applicationDeadline) {
    lines.push(`| **Application deadline** | ${program.applicationDeadline} |`);
  }
  if (program.earliestStartDate) {
    lines.push(`| **Earliest start date** | ${program.earliestStartDate} |`);
  }
  lines.push(`| **Total courses** | ${courseCount(program)} |`);
  lines.push(`| **Public URL path** | \`/admissions/study-programs/${program.id}\` |`);
  lines.push(`| **Admin edit path** | \`/admin/study-programs/${program.id}/edit\` |`);
  lines.push("");

  for (const group of program.courseGroups) {
    lines.push(`### ${group.title}`);
    lines.push("");
    lines.push("| # | Course | Credits |");
    lines.push("| --- | --- | --- |");
    group.courses.forEach((course, index) => {
      lines.push(`| ${index + 1} | ${course.name.replace(/\|/g, "\\|")} | ${course.credits ?? "—"} |`);
    });
    lines.push("");
  }

  return lines.join("\n");
}

function facultiesToMarkdown(faculties) {
  const generatedAt = new Date().toISOString();
  const totalPrograms = faculties.reduce((n, f) => n + f.programs.length, 0);
  const totalCourses = faculties.reduce(
    (n, f) => n + f.programs.reduce((m, p) => m + courseCount(p), 0),
    0,
  );

  const lines = [
    "# TUES Study Programs — Knowledge Base",
    "",
    "Structured export of all bachelor study programs shown in the CMS admin **Study Programs** page.",
    "",
    `> Generated: ${generatedAt}  `,
    `> Source: \`src/data/studyPrograms/*\` (static curriculum; CMS API may override at runtime)  `,
    `> Faculties: ${faculties.length} · Programs: ${totalPrograms} · Courses listed: ${totalCourses}`,
    "",
    "---",
    "",
    "## Table of contents",
    "",
  ];

  for (const faculty of faculties) {
    lines.push(`- [${faculty.title}](#${faculty.id}) (${faculty.programs.length} programs)`);
    for (const program of faculty.programs) {
      const anchor = `${program.id}`;
      lines.push(`  - [${program.title} (${program.code})](#${anchor})`);
    }
  }

  lines.push("");
  lines.push("---");
  lines.push("");

  for (const faculty of faculties) {
    lines.push(`# ${faculty.title} {#${faculty.id}}`);
    lines.push("");
    lines.push(`**Faculty ID:** \`${faculty.id}\``);
    lines.push("");

    for (const program of faculty.programs) {
      lines.push(`<a id="${program.id}"></a>`);
      lines.push(programToMarkdown(faculty, program));
      lines.push("---");
      lines.push("");
    }
  }

  return lines.join("\n");
}

const server = await createServer({
  root,
  logLevel: "error",
  server: { middlewareMode: true },
});

try {
  const mod = await server.ssrLoadModule("/src/data/studyProgramsCurriculum.ts");
  const faculties = mod.STUDY_PROGRAMS_CURRICULUM;
  const markdown = facultiesToMarkdown([...faculties]);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, markdown, "utf8");
  console.log(`Wrote ${outPath}`);
  console.log(
    `${faculties.length} faculties, ${faculties.reduce((n, f) => n + f.programs.length, 0)} programs`,
  );
} finally {
  await server.close();
}
