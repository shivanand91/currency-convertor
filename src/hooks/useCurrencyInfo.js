import {useEffect, useState} from "react"


function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`https://api.currencyapi.com/v3/latest?apikey=cur_live_v1f99FQZL8Uer74z9CGsPv8MhbrVPsoIACcuypOC&base_currency=${currency}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.data) {
                    // Convert the data object to a format our app expects
                    const rates = {};
                    Object.keys(res.data).forEach(key => {
                        rates[key] = res.data[key].value;
                    });
                    setData(rates);
                } else {
                    setData({});
                }
            })
            .catch((err) => {
                console.error("Error fetching currency rates:", err);
                setData({});
            });
    }, [currency])
    return data;
}

export default useCurrencyInfo;