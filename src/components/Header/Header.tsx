import styles from './Header.module.css'

export default function Header() {
	return (
		<header className={styles.header}>
			<h1 className={styles.headerText}>Currency Converter</h1>
		</header>
	)
}