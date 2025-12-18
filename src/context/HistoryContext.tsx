import { createContext } from 'react'
import { Conversion, History } from '../history/history.ts'

export const HistoryContext = createContext<any>({})

export default function HistoryContextProvider() {
	const history = new History(5)

	function add(Conversion) {
		history.addConversion(Conversion)
	}

	function getHistory(): Conversion[] {
		return history.getHistory()
	}

	return (
		<HistoryContext.Provider value={{ add, getHistory }}></HistoryContext.Provider>
	)
}
