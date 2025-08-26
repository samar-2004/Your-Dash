import { useTheme } from '../context/themeContext.js';

export default function Settings() {
	const { theme, toggleTheme } = useTheme();
	return (
		<div className="flex flex-col gap-6 max-w-2xl">
			<h1 className="text-xl font-semibold">Settings</h1>
			<section className="card flex flex-col gap-4">
				<h2 className="text-sm font-semibold">Appearance</h2>
				<div className="flex items-center gap-4">
					<span className="text-sm">Theme:</span>
					<button onClick={toggleTheme} className="text-xs font-medium px-3 py-2 rounded-md bg-muted hover:bg-muted/70">
						Toggle to {theme === 'light' ? 'Dark' : 'Light'}
					</button>
				</div>
			</section>
			<section className="card flex flex-col gap-4">
				<h2 className="text-sm font-semibold">Account</h2>
				<p className="text-sm text-muted-foreground">Profile management coming soon.</p>
			</section>
		</div>
	);
}
