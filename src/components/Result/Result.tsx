import styles from '../ConverterForm/ConverterForm.module.css'
import { useContext } from 'react'
import { ResultsContext } from '../../context/ResultsContext.tsx'

export default function Result() {
	const { conversions } = useContext(ResultsContext)!

	return (
		<>
			{
				conversions.length > 0 && <p className={styles.result}>{conversions[0].result}</p>
			}
		</>
	)
}
