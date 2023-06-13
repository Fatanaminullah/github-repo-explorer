import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { SyntheticEvent, useState } from 'react';
import { Accordion, Button, Form, Spinner } from 'react-bootstrap';
import { fetchRepositoriesByUser, searchUsers } from './lib/function';
import { ToastContainer, toast } from 'react-toastify';

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
      <ToastContainer />
      <div className='container w-100 w-md-75 w-lg-50 py-5'>
        <h1>Github Repository Explorer</h1>
        <section className='section-form'>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Control type="text" placeholder="Enter username" required />
            </Form.Group>
            <Button variant="primary" type="submit" className='w-100' disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {" "}
                  Searching...
                </>
              ) : "Search"}
            </Button>
          </Form>
        </section>
        <section className='section-result mt-3'>
          {!listUser?.length ? null : (
            <>
              <h6 className='text-muted'>Showing users for "{user}"</h6>
              <Accordion onSelect={(eventKey) => eventKey && onFetchRepo(+eventKey)} className='accordion-user'>
                {listUser?.map((item, i) => (
                  <Accordion.Item eventKey={`${i}`} className='accordion-user__item'>
                    <Accordion.Header>{item.login}</Accordion.Header>
                    <Accordion.Body>
                      {isLoadingRepo ? (
                        <span className='d-flex align-items-center justify-content-center'>
                          <Spinner animation="border" role="status" />
                          &nbsp; Fetching {item.login} repos
                        </span>
                      ) : (
                        <>
                          {listRepo?.map((item, i) => (
                            <div className='card-user-repo' key={`card-user-repo-${i}`}>
                              <div className='card-user-repo__stars'>
                                {item.stargazers_count}&nbsp;
                                <img src="/ic-star.svg" className="card-user-repo__stars-icon" alt="ic-star" />
                              </div>
                              <h5 className='card-user-repo__title'>{item.name}</h5>
                              <p className='card-user-repo__description'>{item.description}</p>
                            </div>
                          ))}
                        </>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
