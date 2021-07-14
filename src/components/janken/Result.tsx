export type Props = {
  status: "game" | "draw" | undefined;
  winner: string | undefined;
};

export function Result({ status, winner }: Props): JSX.Element | null {
  if (!status || !winner) {
    return null;
  }
  return (
    <div>
      <p>{status === "game" ? `${winner}の勝ち！` : "あいこ"}</p>
    </div>
  );
}
