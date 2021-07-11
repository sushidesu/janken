export type Player = "me" | "opponent";

export type Props = {
  player: Player;
};

const WINNER_MAP = (player: Player): string => {
  switch (player) {
    case "me":
      return "自分";
    case "opponent":
      return "相手";
    default:
      return "あいこ";
  }
};

export function WinnerList({ player }: Props): JSX.Element {
  return <li>{WINNER_MAP(player)}</li>;
}
