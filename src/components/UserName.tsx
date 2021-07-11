export type Props = {
  name?: string;
};

export function UserName({ name }: Props): JSX.Element {
  return <div>{name ? <p>{name}</p> : <p>loading...</p>}</div>;
}
