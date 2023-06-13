import { Accordion, Spinner } from "react-bootstrap";

interface ResultSectionProps {
  listUser: any[] | null;
  user: string;
  onFetchRepo: (eventKey: number) => void;
  isLoadingRepo: boolean;
  listRepo: any[] | null;
}

export function ResultSection({ listUser, user, onFetchRepo, isLoadingRepo, listRepo }: ResultSectionProps) {
  return (
    <section className='section-result mt-3'>
      {!listUser?.length ? null : (
        <>
          <h6 className='text-muted'>Showing users for "{user}"</h6>
          <Accordion onSelect={(eventKey) => eventKey && onFetchRepo(+eventKey)} className='accordion-user'>
            {listUser?.map((item, i) => (
              <Accordion.Item eventKey={`${i}`} className='accordion-user__item' key={`accordion-item-${i}`}>
                <Accordion.Header>{item.login}</Accordion.Header>
                <Accordion.Body>
                  {isLoadingRepo ? (
                    <span className='d-flex align-items-center justify-content-center'>
                      <Spinner animation="border" role="status" />
                      &nbsp; Fetching {item.login} repos
                    </span>
                  ) : (
                    <>
                      {listRepo?.map((repoItem, j) => (
                        <div className='card-user-repo' key={`card-user-repo-${j}`}>
                          <div className='card-user-repo__stars'>
                            {repoItem.stargazers_count}&nbsp;
                            <img src="/ic-star.svg" className="card-user-repo__stars-icon" alt="ic-star" />
                          </div>
                          <h5 className='card-user-repo__title'>{repoItem.name}</h5>
                          <p className='card-user-repo__description'>{repoItem.description}</p>
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
  );
}
