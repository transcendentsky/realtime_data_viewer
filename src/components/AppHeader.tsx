import type { FC } from 'react';

interface AppHeaderProps {
  title: string;
}

const AppHeader: FC<AppHeaderProps> = ({ title }) => {
  return (
    <header className="py-6 px-4 md:px-8 shadow-md bg-card">
      <h1 className="text-3xl font-bold text-primary">{title}</h1>
    </header>
  );
};

export default AppHeader;
