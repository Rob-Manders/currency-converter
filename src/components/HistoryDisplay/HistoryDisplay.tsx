import { useContext } from 'react'
import { HistoryContext } from '../../context/HistoryContext.tsx';

export default function HistoryDisplay() {
	const { getHistory } = useContext(HistoryContext)

	return (
		<div className="history">
			{
				getHistory().map(item => {
					return <div>
						<p>{item.from.Currency.getShortcode}</p>
						<p>{item.to.Currency.getShortcode}</p>
						<p>{item.value}</p>
						<p>{item.result}</p>
					</div>
				})
			}
		</div>
	)
}
