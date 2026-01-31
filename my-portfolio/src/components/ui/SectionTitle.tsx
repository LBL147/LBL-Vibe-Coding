interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export const SectionTitle = ({ title, subtitle }: SectionTitleProps) => (
  <div className="text-center">
    <h2 className="text-3xl font-bold text-text-main">{title}</h2>
    <p className="mt-2 text-base text-text-muted">{subtitle}</p>
  </div>
);
