import styles from './Footer.module.css'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<a className={styles.footerLink} href='https://github.com/Rob-Manders/currency-converter'>Github</a>
			<a className={styles.footerLink} href='https://currencybeacon.com/api-documentation'>Currency Beacon API</a>
		</footer>
	)
}