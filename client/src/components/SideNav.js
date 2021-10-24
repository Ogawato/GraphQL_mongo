import React from 'react';
import { Button, Card, CardBody, CardHeader, FormGroup, Form } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/client';
import { DIRECTOR_LIST, ADD_MOVIE, MOVIE_LIST, ADD_DIRECTOR } from '../querires/queries';
import { useForm } from 'react-hook-form';

function SideNav() {
  const { data } = useQuery(DIRECTOR_LIST);

  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: MOVIE_LIST }],
    awaitRefetchQueries: true,
  });
  const [addDirector] = useMutation(ADD_DIRECTOR, {
    refetchQueries: [{ query: DIRECTOR_LIST }],
    awaitRefetchQueries: true,
  });
  const { register, handleSubmit } = useForm();

  const { register: registerDirector, handleSubmit: handleSubmitDirector } = useForm();

  const onSubmit = ({ movieName, movieGenre, directorId }, e) => {
    addMovie({ variables: { name: movieName, genre: movieGenre, directorId } });
    e.target.reset();
  };

  const onSubmitDirector = ({ directorName, directorAge }, e) => {
    const IntAge = parseInt(directorAge);
    addDirector({ variables: { name: directorName, age: IntAge } });
    e.target.reset();
  };

  return (
    <div>
      <Card>
        <CardHeader> 映画監督 </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmitDirector(onSubmitDirector)}>
            <FormGroup>
              <input
                className="form-control"
                type="text"
                name="directorName"
                placeholder="監督名"
                {...registerDirector('directorName')}
              ></input>
            </FormGroup>
            <FormGroup>
              <input
                className="form-control"
                type="number"
                name="directorAge"
                placeholder="年齢"
                {...registerDirector('directorAge')}
              ></input>
            </FormGroup>
            <Button color="primary" type="submit">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardHeader>映画作品</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <input
                className="form-control"
                type="text"
                placeholder="タイトル"
                {...register('movieName')}
              />
            </FormGroup>
            <FormGroup>
              <input
                className="form-control"
                type="text"
                placeholder="ジャンル"
                {...register('movieGenre')}
              />
            </FormGroup>
            <FormGroup>
              <select className="form-control" {...register('directorId')}>
                {data &&
                  data.directors.map(({ id, name }) => {
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
              </select>
            </FormGroup>
            <Button color="primary" type="submit">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default SideNav;
