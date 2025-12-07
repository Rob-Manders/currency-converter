import styles from './Select.module.css'
import type { SelectOption } from '../../types.ts'

interface Props {
	value: string
	options: SelectOption[];
	onChange: (value: string) => void;
}

export default function Select({ value, options, onChange }: Props) {
	return (
		<select className={styles.select} value={value} onChange={e => onChange(e.target.value)}>
			{
				options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
			}
		</select>
	)
}
