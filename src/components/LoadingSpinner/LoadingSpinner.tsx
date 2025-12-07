import styles from './LoadingSpinner.module.css'

export default function LoadingSpinner() {
	return <div className={styles.loadingSpinner}>
		<p className={styles.spinner}>£</p>
		<p className={styles.loadingText}>Loading...</p>
	</div>
}