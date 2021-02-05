import React from 'react';
import { cachePromise } from '../service/CacheService';
import { DataService } from '../service/DataService';
import { debounce } from '../utils';

const enhance = (WrappedComp) => (props) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [keySearch, setKeySeach] = React.useState('');
  const handleFetchData = async (key) => {
    let results = [];
    try {
      setLoading(true);
      if (!!key && typeof key === 'string' && key.length >= 3) {
        results = await cachePromise(`question-one-${key}`, () =>
          DataService.getJobsWithSearchTerm(key)
        );
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
      setData([...results]);
    }
  };
  const handleChangeText = async (e) => {
    const value = e.target.value;
    await setKeySeach(value);
    if (!value) {
      return setData([]);
    }
  };
  //debounce function
  const _handleFetchData = React.useRef(debounce(handleFetchData, 500), []);
  React.useEffect(() => {
    _handleFetchData.current(keySearch);
  }, [keySearch]);
  return <WrappedComp {...{ ...props, handleChangeText, data, loading }} />;
};

export default enhance;
