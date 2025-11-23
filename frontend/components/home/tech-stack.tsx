const technologies = [
  'NestJS',
  'Next.js 16',
  'React 19',
  'PostgreSQL',
  'TypeORM',
  'Tailwind CSS',
  'TypeScript'
];

export function TechStack() {
  return (
    <div className="pt-4 border-t">
      <h3 className="text-sm font-semibold text-center mb-3 text-muted-foreground">
        BUILT WITH
      </h3>
      <div className="flex flex-wrap justify-center gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs font-medium bg-secondary rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
