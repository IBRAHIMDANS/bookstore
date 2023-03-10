import { Button, Input } from 'ui';

export default function Web( props: any) {
  return (
    <div>
      <h1>Web</h1>
      <p> {props.id}</p>
      <Input type="text" />
      <Button> Plop</Button>
    </div>
  );
}
export async function getStaticProps(){
  return {
    props: {
      id: 4
    },
  };
}
