import Autocomplete from '../../../common/components/Autocomplete';

type Props = {
  searchText: string;
  setSearchText: (value: string) => void;
  refetchUsers: (value: { searchValue: string }) => void;
}

const UserSearch = ({ searchText, setSearchText, refetchUsers }: Props) => {
  const search = async (value: string) => {
    await refetchUsers({ searchValue: value.toLowerCase() });
  };
  return <Autocomplete onSearch={search} searchText={searchText}
                       setSearchText={setSearchText}/>;
};

export default UserSearch;
