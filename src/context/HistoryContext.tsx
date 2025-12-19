import { createContext, useState } from 'react'
import { type Conversion, History } from '../history/history.ts'

export const HistoryContext = createContext<any>({})

const history = new History(5)

export default function HistoryContextProvider({ children }) {
	const [ conversions, setConversions ] = useState<Conversion[]>([])

	function add(conversion: Conversion) {
		history.addConversion(conversion)

		setConversions(history.getHistory())
	}

	return (
		<HistoryContext.Provider value={{ add, conversions }}>
			{ children }
		</HistoryContext.Provider>
	)
}
