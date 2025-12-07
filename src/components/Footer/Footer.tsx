import styles from './Footer.module.css'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<a className={styles.footerLink} href='https://www.github.com/Rob-Manders/currency-calculator'>Github</a>
			<a className={styles.footerLink} href='https://currencybeacon.com/api-documentation'>Currency Beacon API</a>
		</footer>
	)
}