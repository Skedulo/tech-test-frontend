import {useState, useEffect} from 'react'
export default ($input) => {
    let [val, setVal] = useState('');

    useEffect(() => {
        let subscription = $input.subscribe(setVal)

        return () => {
            subscription.unsubscribe();
        }
    }, [$input, setVal])

    return val
}