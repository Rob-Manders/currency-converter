import './App.css'
import type { Currencies } from './currency/Currencies.ts'
import { getCurrencies } from './currency-beacon/getCurrencies.ts'
import { useEffect, useState } from 'react'
import Header from './components/Header/Header.tsx'
import Footer from './components/Footer/Footer.tsx'
import ConverterForm from './components/ConverterForm/ConverterForm.tsx'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.tsx'

function App() {
	const [currencies, setCurrencies] = useState<Currencies>()
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (currencies) {
			return
		}

		getCurrencies()
		.then((c) => setCurrencies(c))
		.catch(() => {
			setError('Unable to fetch data from Currency Beacon')
		})
	}, [])

	return (
		<>
			<Header/>

			<main>
				{error && <p>{error}</p>}
				{
					currencies
						? <ConverterForm currencies={currencies}/>
						: !error && <LoadingSpinner/>
				}
			</main>

			<Footer/>
		</>
	)
}

export default App
