import { gql, useQuery } from '@apollo/client';

interface DogPhoto {
  id: string;
  displayImage: string;
}

interface DogPhotoData {
  dog: DogPhoto;
}

interface DogPhotoVars {
  breed: string;
}

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

interface Props {
  breed: string;
}

const DogPhoto = (props: Props) => {
  const { breed } = props;

  const { loading, error, data, refetch } = useQuery<
    DogPhotoData,
    DogPhotoVars
  >(GET_DOG_PHOTO, {
    variables: { breed },
    // pollInterval: 500,
  });

  if (loading) return null;
  if (error) return <p>{`Error! ${error}`}</p>;

  return (
    <div>
      <img width="100px" height="100px" src={data?.dog.displayImage} />
      <button onClick={() => refetch({ breed: 'dalmatian' })}>
        Refetch new breed!
      </button>
    </div>
  );
};

export default DogPhoto;
