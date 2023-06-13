import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { SyntheticEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FormSections } from './components/form-section';
import { ResultSection } from './components/result-section';
import { fetchRepositoriesByUser, searchUsers } from './lib/function';

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingRepo, setIsLoadingRepo] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  const [listUser, setListUser] = useState<any[] | null>([]);
  const [listRepo, setListRepo] = useState<any[] | null>([])

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.target as HTMLFormElement).username.value;
    setUser(username)
    setIsLoading(true);
    const { data, errors } = await searchUsers(username);
    if (errors) {
      return toast.error(errors?.response?.data?.message || errors?.message)
    }
    setListUser(data);
    setIsLoading(false)
  };
  const onFetchRepo = async (index: number) => {
    setIsLoadingRepo(true);
    const user = listUser && listUser[index]?.login;
    const { data, errors } = await fetchRepositoriesByUser(user || '');
    if (errors) {
      return toast.error(errors?.response?.data?.message || errors?.message)
    }
    setListRepo(data);
    setIsLoadingRepo(false)
  }
  return (
    <div className="App">
      <ToastContainer theme='colored' />
      <div className='container w-100 w-md-75 w-lg-50 py-5'>
        <h1 className='mb-5'>Github Repository Explorer</h1>
        <FormSections onSubmit={onSubmit} isLoading={isLoading} />
        <ResultSection
          listUser={listUser}
          user={user}
          onFetchRepo={onFetchRepo}
          isLoadingRepo={isLoadingRepo}
          listRepo={listRepo}
        />
      </div>
    </div>
  );
}

export default App;
