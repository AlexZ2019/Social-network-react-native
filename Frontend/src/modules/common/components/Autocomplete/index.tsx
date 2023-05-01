import { SearchBar } from '@ant-design/react-native';
import { useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import constants from '../../constants';

type Props = {
  placeholder?: string;
  onSearch: (value: string) => void;
  debounceTime?: number;
  searchText: string;
  setSearchText: (value: string) => void
}
const Autocomplete = ({
  placeholder,
  onSearch,
  debounceTime,
  searchText,
  setSearchText,
}: Props) => {
  const { debouncedValue, debounceLoading } = useDebounce(searchText,
    debounceTime || constants.DEBOUNCE_TIME);
  useEffect(() => {
    if (onSearch) {
      (async () => {
        await onSearch(debouncedValue);
      })();
    }
  }, [debouncedValue]);
  return <SearchBar
    placeholder={placeholder}
    onChange={setSearchText}
  />;
};

export default Autocomplete;
