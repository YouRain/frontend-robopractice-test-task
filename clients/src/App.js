import { useEffect, useState } from 'react';
import FullTable from './components/FullTable/FullTable';
import usePagination from './components/hooks/usePagination';
import { transformUsers } from './components/supportfunc/transformData';
import InputSearch from './components/UI/InputSearch';
import Pagination from './components/UI/pagination/Pagination';
import "./styles/App.css";

function App() {
  const [users, setUresr] = useState([]);
  const [transformatedUsers, setTransformatedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedUsers, setSearchedUsers] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { totalPages, firstRow, lastRow, page, nextPage, prevPage, resetPage } = usePagination({ totalRows: searchedUsers.length, rowsPerPage });
  // console.log(nextPage)
  useEffect(() => {
    fetchUsers();
  }, [])

  useEffect(() => {
    setTransformatedUsers(transformUsers(users));
  }, [users])

  useEffect(() => {
    setSearchedUsers(transformatedUsers.filter(item => item.fullName.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [searchQuery, transformatedUsers])

  function sorting(sortedOption, index) {
    let sortedUsers = [];
    switch (sortedOption) {
      case "string":
        if (transformatedUsers.reduce((acc, it) => acc + it.fullName) === [...transformatedUsers].sort((a, b) => a.fullName.localeCompare(b.fullName)).reduce((acc, it) => acc + it.fullName)) {
          sortedUsers = [...transformatedUsers].reverse();
          setTransformatedUsers(sortedUsers);
        } else {
          sortedUsers = [...transformatedUsers].sort((a, b) => a.fullName.localeCompare(b.fullName));
          setTransformatedUsers(sortedUsers);
        }
        break;
      case "number":
        if (transformatedUsers.every((item, indx, arr) => (item.duration[index - 1] <= (arr[indx + 1] ? arr[indx + 1].duration[index - 1] : undefined)) || (indx === arr.length - 1))) {
          sortedUsers = [...transformatedUsers].reverse();
          setTransformatedUsers(sortedUsers);
        } else {
          sortedUsers = [...transformatedUsers].sort((a, b) => a.duration[index - 1] - b.duration[index - 1]);
          setTransformatedUsers(sortedUsers);
        }
        break;
      case "total":
        if (transformatedUsers.every((item, indx, arr) => (item.totalDuration <= (arr[indx + 1] ? arr[indx + 1].totalDuration : undefined)) || (indx === arr.length - 1))) {
          sortedUsers = [...transformatedUsers].reverse();
          setTransformatedUsers(sortedUsers);
        } else {
          sortedUsers = [...transformatedUsers].sort((a, b) => a.totalDuration - b.totalDuration);
          setTransformatedUsers(sortedUsers);
        }
        break;
    }
  }

  // const searchedUsers = useMemo(() => {
  //   return transformatedUsers.filter(item => item.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
  // }, [searchQuery, transformatedUsers])

  async function fetchUsers() {
    let fetchData = await fetch("http://localhost:8080/api/users");
    let response = await fetchData.json();
    setUresr(response);
    // console.log(response)
  }

  return (
    <div className="">
      <div  style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <InputSearch
          type="text"
          placeholder="Search User"
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value = e.target.value.replace(/[^A-z \s]/g, ""));
            resetPage()
            setRowsPerPage(10)
          }}
        />
        <Pagination rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          firstRow={firstRow}
          lastRow={lastRow}
          resetPage={resetPage}
          prevPage={prevPage}
          nextPage={nextPage}
          totalRows={searchedUsers.length}
          page={page}
          totalPages={totalPages}
        />
      </div>
      {!searchedUsers.length
        ? <h1 style={{ textAlign: "center", marginTop: 250 }}>Users not found !</h1>
        : <>
          <FullTable
            users={searchedUsers}
            sort={sorting}
            firstRow={firstRow}
            lastRow={lastRow}
          />
        </>
      }

    </div>

  );
}

export default App;
