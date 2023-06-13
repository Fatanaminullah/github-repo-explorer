import { Button, Form, Spinner } from "react-bootstrap";

interface FormSectionsProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function FormSections({ onSubmit, isLoading }: FormSectionsProps) {
  return (
    <section className='section-form'>
      <Form onSubmit={onSubmit} data-testid="form-search">
        <Form.Group className="mb-3" controlId="username">
          <Form.Control type="text" placeholder="Enter username" required data-testid="username" />
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
  );
}
