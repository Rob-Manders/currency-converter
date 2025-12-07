import styles from './NumberInput.module.css'

interface Props {
	value: number
	onChange: (value: number) => void
}

export default function NumberInput({ value, onChange }: Props) {
	function updateValue(event: React.ChangeEvent<HTMLInputElement>) {
		const v = Number(event.target.value)

		if (!isNaN(v)) {
			onChange(v)
		}
	}

	return (
		<div className={styles.numberInput}>
			<label className={styles.label} htmlFor='numberInput'>AMOUNT</label>
			<input name='numberInput' className={styles.input} value={value} onChange={(e) => updateValue(e)}/>
		</div>
	)
}
