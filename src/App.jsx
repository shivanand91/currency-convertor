import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState("")
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("INR")
  const [convertedAmount, setConvertedAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount")
      return
    }
    if (!currencyInfo[to]) {
      setError("Unable to fetch conversion rates. Please try again.")
      return
    }
    setError("")
    setIsLoading(true)
    try {
      const result = amount * currencyInfo[to]
      setConvertedAmount(result.toFixed(2))
    } catch (err) {
      setError("Error converting currency. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-800/40 to-pink-600/30 animate-gradient-move z-0"></div>

      <div className="w-full z-10">
        <div className="w-full max-w-md mx-auto border border-gray-200 rounded-2xl p-8 shadow-2xl backdrop-blur-lg bg-white/40 transition-all duration-500 hover:scale-105 hover:shadow-blue-300/40">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 drop-shadow animate-fade-in">
            Currency Converter
          </h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fade-in">
              {error}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}
          >
            <div className="w-full mb-3 animate-slide-in-down">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency.toUpperCase())}
                selectCurrency={from}
                onAmountChange={(amount) => {
                  setAmount(amount)
                  setError("")
                }}
                />
              </div>
              <div className="relative w-full h-0.5 my-4 flex justify-center items-center">
                <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-180 animate-bounce"
                onClick={swap}
                aria-label="Swap currencies"
                >
                {/* Swap icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17v2a2 2 0 002 2h12m0 0l-4-4m4 4l-4 4M20 7V5a2 2 0 00-2-2H6m0 0l4 4m-4-4l4-4" />
                </svg>
                </button>
              </div>
              <div className="w-full mt-3 mb-6 animate-slide-in-up">
                <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency.toUpperCase())}
                selectCurrency={to}
                amountDisable
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Converting...' : `Convert ${from} to ${to}`}
              </button>
              </form>
            </div>
            </div>

            {/* Tailwind custom animations */}
      <style>
        {`
          @keyframes gradient-move {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-move {
            background-size: 200% 200%;
            animation: gradient-move 8s ease-in-out infinite;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          @keyframes slide-in-down {
            from { opacity: 0; transform: translateY(-30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-slide-in-down {
            animation: slide-in-down 0.8s cubic-bezier(.4,0,.2,1);
          }
          @keyframes slide-in-up {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-slide-in-up {
            animation: slide-in-up 0.8s cubic-bezier(.4,0,.2,1);
          }
        `}
      </style>
    </div>
  );
}

export default App