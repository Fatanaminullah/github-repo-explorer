import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { SyntheticEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FormSections } from './components/form-section';
import { ResultSection } from './components/result-section';
import { fetchRepositoriesByUser, searchUsers } from './lib/function';
import { Helmet } from "react-helmet";

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
      setIsLoading(false)
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
      setIsLoadingRepo(false)
      return toast.error(errors?.response?.data?.message || errors?.message)
    }
    setListRepo(data);
    setIsLoadingRepo(false)
  }
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Github Repository Explorer</title>
        <meta name="description" content="GitHub Repository Explorer is a React application that allows users to search for GitHub users and view their repositories." />
        <link rel="canonical" href="https://githubrepo-explorer.netlify.app/" />
      </Helmet>
      <ToastContainer theme='colored' />
      <div className='wrapper container-md py-5'>
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
