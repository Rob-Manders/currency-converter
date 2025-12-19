import styles from './History.module.css'
import { useContext } from 'react'
import { ResultsContext } from '../../context/ResultsContext.tsx';

export default function History() {
	const { conversions } = useContext(ResultsContext)!

	return (
		<div className={styles.history}>
			{
				conversions.map((conversion, index) => (
					<div className={styles.conversion} key={index}>
						<div className={styles.currency}>
							<p className={styles.name}>{conversion.from.getName()}</p>
							<p className={styles.value}>{conversion.from.formatString(conversion.amount)}</p>
						</div>

						<div className={styles.currency}>
							<p className={styles.name}>{conversion.to.getName()}</p>
							<p className={styles.value}>{conversion.result}</p>
						</div>
					</div>
				))
			}
		</div>
	)
}
