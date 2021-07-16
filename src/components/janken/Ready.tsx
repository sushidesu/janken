export type Props = {
  ready: boolean | undefined;
};

export function Ready({ ready }: Props): JSX.Element | null {
  if (ready === undefined) {
    return null;
  }
  if (ready) {
    return <div>OK</div>;
  } else {
    return <div>準備中...</div>;
  }
}
