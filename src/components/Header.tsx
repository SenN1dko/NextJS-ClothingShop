import { ThemeSwitcher } from './ThemeSwitcher';

export function Header() {
  return (
    <>
      <div className="flex items-center">
        <ThemeSwitcher />
        <div>Header</div>
      </div>
    </>
  );
}
