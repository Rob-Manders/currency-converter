import styles from '../ConverterForm/ConverterForm.module.css'

export default function ErrorMessage({ message }: { message: string }) {
	return <p className={styles.error}>{message}</p>
}
