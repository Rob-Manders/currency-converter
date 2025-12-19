import { createContext, useState } from 'react'
import type { ReactNode } from 'react'
import { type Conversion, Conversions } from '../conversions/conversions.ts'

interface ResultsContextType {
	conversions: Conversion[],
	add: (conversion: Conversion) => void
}

export const ResultsContext = createContext<ResultsContextType | null>(null)

const history = new Conversions(5)

export default function ResultsContextProvider({ children }: { children: ReactNode }) {
	const [ conversions, setConversions ] = useState<Conversion[]>([])

	function add(conversion: Conversion) {
		history.addConversion(conversion)

		setConversions([...history.get()])
	}

	return (
		<ResultsContext.Provider value={{ conversions, add }}>
			{ children }
		</ResultsContext.Provider>
	)
}
