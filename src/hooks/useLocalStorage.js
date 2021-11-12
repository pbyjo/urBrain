import {useState, useEffect} from 'react';

function useLocalStorage(itemName, initialValue) {
    /* Eventos */
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    /* Estado de los datos */
    const [item, setItem] = useState(/* parsedItem */ initialValue)

    /* ------  ------ *\
        useEffect
    \* ------  ------ */
    useEffect(
        () => {
            setTimeout(
                () => {
                    /* ------  ------ *\
                        Local storage
                    \* ------  ------ */
                    try {
                        const localStorageItem = localStorage.getItem(itemName);

                        if(!localStorageItem) {
                            localStorage.setItem(itemName, JSON.stringify(initialValue));
                            parsedItem = [];
                        } else {
                            parsedItem = JSON.parse(localStorageItem)
                        }

                        let parsedItem;
                        setItem(parsedItem)
                        setLoading(false)
                    } catch(error) {
                        setError(error)
                    }
                }, 1200
            )
        },
        []
    )

    /* Persistir datos */
    const saveItem = (newItem) => {
        try {
            const stringifiedItem = JSON.stringify(newItem);
            localStorage.setItem(itemName, stringifiedItem);
            setItem(newItem);
        } catch(error) {
            setError(error);
        }
    }

    return {
        item,
        saveItem,
        loading,
        error
    }
}

export default useLocalStorage;