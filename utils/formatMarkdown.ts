import { Spec, SpecOutput } from '@/types/spec';

export function formatSpecAsMarkdown(spec: Spec): string {
  const output = spec.output;
  
  let markdown = `# ${spec.title}\n\n`;
  markdown += `**Template Type:** ${spec.templateType}\n\n`;
  markdown += `**Goal:** ${spec.goal}\n\n`;
  markdown += `**Target Users:** ${spec.users}\n\n`;
  markdown += `**Constraints:** ${spec.constraints}\n\n`;
  markdown += `**Created:** ${new Date(spec.createdAt).toLocaleString()}\n\n`;
  markdown += `---\n\n`;

  // Overview
  markdown += `## Overview\n\n${output.overview}\n\n`;

  // User Stories
  markdown += `## User Stories\n\n`;
  output.user_stories.forEach((story, index) => {
    markdown += `### ${index + 1}. ${story.title}\n\n`;
    markdown += `${story.description}\n\n`;
  });

  // Engineering Tasks
  markdown += `## Engineering Tasks\n\n`;
  const tasksByGroup = output.engineering_tasks.reduce((acc, task) => {
    if (!acc[task.group]) {
      acc[task.group] = [];
    }
    acc[task.group].push(task.task);
    return acc;
  }, {} as Record<string, string[]>);

  Object.entries(tasksByGroup).forEach(([group, tasks]) => {
    markdown += `### ${group}\n\n`;
    tasks.forEach((task, index) => {
      markdown += `${index + 1}. ${task}\n`;
    });
    markdown += `\n`;
  });

  // Risks
  if (output.risks && output.risks.length > 0) {
    markdown += `## Risks\n\n`;
    output.risks.forEach((risk, index) => {
      markdown += `${index + 1}. ${risk}\n`;
    });
    markdown += `\n`;
  }

  // Unknowns
  if (output.unknowns && output.unknowns.length > 0) {
    markdown += `## Unknowns\n\n`;
    output.unknowns.forEach((unknown, index) => {
      markdown += `${index + 1}. ${unknown}\n`;
    });
    markdown += `\n`;
  }

  return markdown;
}
