import { useId } from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "USD",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
    const amountInputId = useId()

    return (
        <div
            className={`bg-gradient-to-tr from-blue-100 via-white to-purple-100 shadow-xl p-5 rounded-2xl text-base flex gap-6 items-center transition-all duration-300 hover:scale-105 hover:shadow-2xl ${className}`}
        >
            <div className="w-1/2 flex flex-col justify-center">
                <label
                    htmlFor={amountInputId}
                    className="text-blue-700 font-semibold mb-2 inline-block tracking-wide animate-fade-in"
                >
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-white/80 py-2 px-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-200 shadow-sm text-blue-900 font-medium placeholder:text-blue-300 animate-slide-in"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount === "" ? "" : amount}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || (!isNaN(value) && value >= 0)) {
                            onAmountChange && onAmountChange(value === "" ? "" : Number(value));
                        }
                    }}
                    min="0"
                    step="any"
                />
            </div>
            <div className="w-1/2 flex flex-col items-end text-right">
                <p className="text-purple-700 font-semibold mb-2 w-full tracking-wide animate-fade-in">
                    Currency Type
                </p>
                <select
                    className="rounded-lg px-3 py-2 bg-white/80 border border-purple-200 text-purple-900 font-medium shadow-sm cursor-pointer outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 animate-slide-in"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
            {/* Animations using Tailwind CSS plugin (optional) */}
            <style>
                {`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease;
                }
                @keyframes slide-in {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-in {
                    animation: slide-in 0.7s cubic-bezier(.4,0,.2,1);
                }
                `}
            </style>
        </div>
    );
}

export default InputBox;