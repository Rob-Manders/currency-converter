import { createContext, useState } from 'react'
import { Conversion, History } from '../history/history.ts'

export const HistoryContext = createContext<any>({})

export default function HistoryContextProvider({ children }) {
	const [ conversions, setConversions ] = useState<Conversion[]>([])
	const history = new History(5)

	function add(Conversion) {
		history.addConversion(Conversion)
		setConversions(history.getHistory())
	}

	return (
		<HistoryContext.Provider value={{ add, conversions }}>
			{ children }
		</HistoryContext.Provider>
	)
}
