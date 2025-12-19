import './App.css'
import type { Currencies } from './currency/Currencies.ts'
import { getCurrencies } from './currency-beacon/getCurrencies.ts'
import { useEffect, useState } from 'react'
import Header from './components/Header/Header.tsx'
import Footer from './components/Footer/Footer.tsx'
import ConverterForm from './components/ConverterForm/ConverterForm.tsx'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.tsx'
import ResultsContextProvider from './context/ResultsContext.tsx';
import History from './components/History/History.tsx';
import Result from './components/Result/Result.tsx'
import ErrorMessage from './components/Error/ErrorMessage.tsx'

export default function App() {
	const [currencies, setCurrencies] = useState<Currencies>()
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (currencies) {
			return
		}

		getCurrencies()
		.then((c) => setCurrencies(c))
		.catch((error) => {
			setError('Unable to fetch data from Currency Beacon')
			console.error(error)
		})
	}, [])

	return (
		<ResultsContextProvider>
			<Header/>

			<main>
				{error && <ErrorMessage message={error} />}
				{
					currencies
						? <ConverterForm currencies={currencies}/>
						: !error && <LoadingSpinner/>
				}

				<Result />
				<History />
			</main>

			<Footer/>
		</ResultsContextProvider>
	)
}
